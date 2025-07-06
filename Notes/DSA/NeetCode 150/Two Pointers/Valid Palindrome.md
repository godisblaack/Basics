Link: https://leetcode.com/problems/valid-palindrome/description/

**My solution**

```cpp
class Solution {
public:
    bool isPalindrome(string s) {
        transform(
            s.begin(), s.end(), s.begin(),
            [](unsigned char c){ 
                return tolower(c); 
            }
        );

        string phrase;

        for (char c : s) {
            if ((c >= '0' && c <= '9') || (c >= 'a' && c <= 'z')) {
                phrase.push_back(c); // More efficient than 'phrase = phrase + c' which creates a new string on every loop iteration and caused a Memory Limit Exceeded error
            }
        }

        int left = 0;
        int right = phrase.length() - 1;

        while (left < right) {
            if (phrase[left] != phrase[right]) {
                return false;
            }

            left++;
            right--;
        }

        return true;
    }
};
```

**Time complexity:** O(N)

**Space complexity:** O(N)

This is **not** the optimized solution.

**Optimized solution**

```cpp
class Solution {
public:
    bool isPalindrome(string s) {
        int left = 0;
        int right = s.length() - 1;

        while (left < right) {
            // Skip non-alphanumeric
            while (left < right && !isalnum(s[left])) left++;
            while (left < right && !isalnum(s[right])) right--;

            // Compare lowercased characters
            if (tolower(s[left]) != tolower(s[right])) {
                return false;
            }

            left++;
            right--;
        }

        return true;
    }
};
```

**Time complexity:** O(N)

**Space complexity:** O(1)