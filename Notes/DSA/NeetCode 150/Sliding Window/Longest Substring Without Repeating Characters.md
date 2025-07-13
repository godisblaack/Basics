Link: https://leetcode.com/problems/longest-substring-without-repeating-characters/description/

**My solution**

```cpp
class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        int maxLength = 0;

        for (int i = 0; i < s.length(); i++) {
            unordered_map<char, int> seen;

            string subString;

            for (int j = i; j < s.length(); j++) {
                subString.push_back(s[j]);

                if (seen.find(s[j]) == seen.end()){
                    seen[s[j]]++;

                    if (maxLength <= subString.length()) {
                        maxLength = subString.length();
                    }
                } else {
                    break;
                }
            }
        }

        return maxLength;
    }
};
```

**Time complexity:** O($N^{2}$)

**Space complexity:** O(K), where K is the maximum number of unique characters in any valid substring.

This is **not** the optimized solution.

**Brute force - Using unordered_set**

```cpp
class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        int maxLen = 0;

        for (int i = 0; i < s.size(); ++i) {
            unordered_set<char> seen;
            for (int j = i; j < s.size(); ++j) {
                if (seen.count(s[j]))
                    break;
                seen.insert(s[j]);
                maxLen = max(maxLen, j - i + 1);
            }
        }

        return maxLen;
    }
};
```

**Time complexity:** O($N^{2}$)

**Space complexity:** O(K), where K is the maximum number of unique characters in any valid substring.

**Better solution - Using sliding window with set**

```cpp
class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        unordered_set<char> window;

        int left = 0;
        int maxLength = 0;

        for (int right = 0; right < s.size(); ++right) {
            while (window.count(s[right])) {
                window.erase(s[left]);
           
                ++left;
            }

            window.insert(s[right]);
            
            maxLength = max(maxLength, right - left + 1);
        }

        return maxLength;
    }
};
```

**Time complexity:** O(N)

**Space complexity:** O(K), where K is the maximum number of unique characters in any valid substring.

**Optimal solution - Using sliding window with index map**

```cpp
class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        vector<int> lastSeen(128, -1); // Assuming ASCII

        int maxLength = 0;

        int left = 0;

        for (int right = 0; right < s.size(); ++right) {
            char ch = s[right];

            if (lastSeen[ch] >= left) { // lastSeen[ch] is exactly the same as using lastSeen[(int)ch]. ch is a char, but when used as an index in lastSeen, it is implicitly converted to its ASCII integer value.
                left = lastSeen[ch] + 1;
            }

            lastSeen[ch] = right;

            maxLength = max(maxLength, right - left + 1);
        }

        return maxLength;
    }
};
```

**Time complexity:** O(N)

**Space complexity:** O(1)