Link: https://leetcode.com/problems/minimum-window-substring/description/

I was not able to solve this. I was not able to pass all the test cases due to a bug in map initialization. I was able to come up with the same approach as brute force approach.

**Brute force**

```cpp
class Solution {
public:
    string minWindow(string s, string t) {
        int n = s.length();
        int m = t.length();
        if (n < m) {
            return "";
        } 

        unordered_map<char, int> targetFrequency;

        for (char character : t) {
            targetFrequency[character]++;
        }

        // Start from window size = t.length()
        for (int windowSize = m; windowSize <= n; ++windowSize) {
            for (int start = 0; start + windowSize <= n; ++start) {
                unordered_map<char, int> windowFrequency;

                // Build frequency map for current window
                for (int i = start; i < start + windowSize; ++i) {
                    windowFrequency[s[i]]++;
                }

                // Check if window is valid
                bool isValid = true;
                
                for (auto& pair : targetFrequency) {
                    char character = pair.first;
                    int required = pair.second;

                    if (windowFrequency[character] < required) {
                        isValid = false;

                        break;
                    }
                }

                if (isValid) {
                    return s.substr(start, windowSize);
                }
            }
        }

        return "";
    }
};
```

**Time complexity:** O($n^{2} * m$), where n is the length of s and m is the length of t

**Space complexity:** O(m), for frequency maps (where m is the length of t)

**Better solution - Sliding window with fixed window size**

```cpp
class Solution {
public:
    string minWindow(string s, string t) {
        int n = s.length(), m = t.length();
        if (n < m) {
            return "";
        }

        unordered_map<char, int> targetFrequency;
        unordered_map<char, int> windowFrequency;

        for (char character : t) {
            targetFrequency[character]++;
        }

        int start = 0;
        int end = 0;
        int minLen = INT_MAX;
        int minStart = -1;
        int required = targetFrequency.size();
        int formed = 0;

        while (end < n) {
            char character = s[end];

            windowFrequency[character]++;
            
            if (targetFrequency.count(character) && windowFrequency[character] == targetFrequency[character]) {
                formed++;
            }

            // Only shrink one step per valid window
            while (formed == required) {
                int windowLen = end - start + 1;

                if (windowLen < minLen) {
                    minLen = windowLen;

                    minStart = start;
                }

                char startChar = s[start];

                windowFrequency[startChar]--;

                if (targetFrequency.count(startChar) && windowFrequency[startChar] < targetFrequency[startChar]) {
                    formed--;
                }

                start++;
            }

            end++;
        }

        if (minStart == -1) {
            return "";
        } else {
            return s.substr(minStart, minLen);
        }
    }
};
```

**Time complexity:** O($n^{2} * m$), where n is the length of s and m is the length of t. This complexity is close to **O(n * 26)**, which is why this solution got accepted but not the brute force approach.

**Space complexity:** O(m), for frequency maps (where m is the length of t)

**Optimal solution - Sliding window with two pointer**

```cpp
class Solution {
public:
    string minWindow(string s, string t) {
        unordered_map<char, int> targetFrequency;

        for (char character : t) {
            targetFrequency[character]++;
        }

        unordered_map<char, int> windowFrequency;

        int have = 0;
        int need = targetFrequency.size();
        int left = 0;
        int minLength = INT_MAX;
        int startIndex = 0;

        for (int right = 0; right < s.length(); ++right) {
            char character = s[right];

            windowFrequency[character]++;

            // If the character meets the required count
            if (targetFrequency.count(character) && windowFrequency[character] == targetFrequency[character]) {
                have++;
            }

            // When all requirements are satisfied
            while (have == need) {
                int currentWindow = right - left + 1;

                if (currentWindow < minLength) {
                    minLength = currentWindow;

                    startIndex = left;
                }

                // Shrink window from the left
                windowFrequency[s[left]]--;
                
                if (targetFrequency.count(s[left]) && windowFrequency[s[left]] < targetFrequency[s[left]]) {
                    have--;
                }

                left++;
            }
        }

        if (minLength == INT_MAX) {
            return "";
        } else {
            return s.substr(startIndex, minLength);
        }
    }
};
```

**Time complexity:** O(n + m), where n is the length of s and m is the length of t

**Space complexity:** O(m), for frequency maps (where m is the length of t)