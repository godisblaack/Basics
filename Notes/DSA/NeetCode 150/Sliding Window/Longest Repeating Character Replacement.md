Link: https://leetcode.com/problems/longest-repeating-character-replacement/description/

I was not able to solve. I was not able to pass all the test cases.

**Brute force - Trying all substrings**

```cpp
class Solution {
public:
    int characterReplacement(string s, int k) {
        int maximumLength = 0;

        for (int i = 0; i < s.size(); i++) {
            unordered_map<char, int> frequency;

            int maximumFrequency = 0;

            for (int j = i; j < s.size(); j++) {
                frequency[s[j]]++;
                
                maximumFrequency = max(maximumFrequency, frequency[s[j]]);

                int windowSize = j - i + 1;
                if (windowSize - maximumFrequency <= k) {
                    maximumLength = max(maximumLength, windowSize);
                }
            }
        }

        return maximumLength;
    }
};
```

**Time complexity:** O($N^{2}$)

**Space complexity:** O(1)

**Better solution - Sliding window with frequency map**

```cpp
class Solution {
public:
    int characterReplacement(string s, int k) {
        unordered_map<char, int> frequency;

        int left = 0;
        int maximumLength = 0;
        int maximumFrequency = 0;

        for (int right = 0; right < s.size(); right++) {
            frequency[s[right]]++;

            maximumFrequency = max(maximumFrequency, frequency[s[right]]);

            int windowSize = right - left + 1;
            
            if (windowSize - maximumFrequency > k) {
                frequency[s[left]]--;

                left++;
            }

            maximumLength = max(maximumLength, right - left + 1);
        }

        return maximumLength;
    }
};
```

**Time complexity:** O(N)

**Space complexity:** O(1) or O(K), depending on the charset size.

**Optimal solution - Sliding window with fixed size frequency array**

```cpp
class Solution {
public:
    int characterReplacement(string s, int k) {
        vector<int> frequency(26, 0);

        int left = 0;
        int maximumFrequency = 0;
        int maximumLength = 0;

        for (int right = 0; right < s.length(); ++right) {
            frequency[s[right] - 'A']++;

            maximumFrequency = max(maximumFrequency, frequency[s[right] - 'A']);

            int windowSize = right - left + 1;

            while (windowSize - maximumFrequency > k) {
                frequency[s[left] - 'A']--;

                left++;

                windowSize = right - left + 1;
            }

            maximumLength = max(maximumLength, windowSize);
        }

        return maximumLength;
    }
};
```

**Time complexity:** O(N)

**Space complexity:** O(1)