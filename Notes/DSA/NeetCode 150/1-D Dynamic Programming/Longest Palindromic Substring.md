Link: https://leetcode.com/problems/longest-palindromic-substring/description/

**My 1st solution**

```cpp
class Solution {
public:
    string longestPalindrome(string s) {
        string palindrome;
        int maximumPalindromeLength = 0;

        for (int i = 0; i < s.length(); i++) {
            for (int j = i; j < s.length(); j++) {
                if (isPalindrome(s, i, j)) {
                    if (j - i + 1 > maximumPalindromeLength) {
                        maximumPalindromeLength = s.substr(i, j - i + 1).length();
                        palindrome = s.substr(i, j - i + 1);
                    }
                }
            }
        }

        return palindrome;
    }

    bool isPalindrome(string& s, int left, int right) {
        while (left < right) {
            if (s[left] != s[right]) {
                return false;
            }

            left++;
            right--;
        }

        return true;
    }
};
```

**Time complexity:** O($n^{3}$)

**Space complexity:** O(n)

**My 2nd solution**

```cpp
class Solution {
public:
    string longestPalindrome(string s) {
        string palindrome;
        int maximumPalindromeLength = 0;

        for (int i = 0; i < s.length(); i++) {
            expand(s, i, i, maximumPalindromeLength, palindrome);
            expand(s, i, i + 1, maximumPalindromeLength, palindrome);
        }

        return palindrome;
    }

    void expand(string& s, int left, int right, int& maximumPalindromeLength, string& palindrome) {
        while (left >= 0 && right < s.length()) {
            if (s[left] == s[right]) {
                if (right - left + 1 > maximumPalindromeLength) {
                    maximumPalindromeLength = right - left + 1;
                    palindrome = s.substr(left, right - left + 1);
                }

                left--;
                right++;
            } else {
                break;
            }
        }
    }
};
```

**Time complexity:** O($n^{2}$)

**Space complexity:** O(1)


There is a cleaner way to write this code. See below:

```cpp
class Solution {
public:
    string longestPalindrome(string s) {
        int startintPosition = 0;
        int maximumLength = 0;

        for (int i = 0; i < s.length(); ++i) {
            expandAroundCenter(s, i, i, startintPosition, maximumLength);     // Odd-length
            expandAroundCenter(s, i, i + 1, startintPosition, maximumLength); // Even-length
        }

        return s.substr(startintPosition, maximumLength);
    }

private:
    void expandAroundCenter(const string& s, int left, int right, int& startintPosition, int& maximumLength) {
        while (left >= 0 && right < s.length() && s[left] == s[right]) {
            int length = right - left + 1;
            if (length > maximumLength) {
                startintPosition = left;
                maximumLength = length;
            }
            --left;
            ++right;
        }
    }
};
```

**Time complexity:** O($n^{2}$)

**Space complexity:** O(1)

Both of this is **not** an optimized solution.

**Manacher’s Algorithm - Optimized solution**

```cpp
class Solution {
public:
    string longestPalindrome(string s) {
        if (s.empty()) return "";

        // Step 1: Transform the string to handle even-length palindromes
        string t = "#";
        for (char c : s) {
            t += c;
            t += "#";
        }

        int n = t.size();
        vector<int> p(n, 0); // p[i] = radius of palindrome centered at i
        int center = 0, right = 0;
        int maxLen = 0, maxCenter = 0;

        for (int i = 0; i < n; ++i) {
            int mirror = 2 * center - i;

            if (i < right)
                p[i] = min(right - i, p[mirror]);

            // Expand around center i
            while (i + p[i] + 1 < n && i - p[i] - 1 >= 0 && t[i + p[i] + 1] == t[i - p[i] - 1])
                ++p[i];

            // Update center and right boundary
            if (i + p[i] > right) {
                center = i;
                right = i + p[i];
            }

            // Track longest palindrome
            if (p[i] > maxLen) {
                maxLen = p[i];
                maxCenter = i;
            }
        }

        // Step 2: Extract the longest palindrome from original string
        int start = (maxCenter - maxLen) / 2;
        return s.substr(start, maxLen);
    }
};
```

**Time complexity:** O(n)

**Space complexity:** O(n)