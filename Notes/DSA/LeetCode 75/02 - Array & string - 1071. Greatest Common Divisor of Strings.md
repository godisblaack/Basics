Link: https://leetcode.com/problems/greatest-common-divisor-of-strings/description/

**My 1st solution**

```cpp
class Solution {
public:
    string gcdOfStrings(string str1, string str2) {
        string longestSubstring = "";
        for (int i = 0; i < str1.length(); i++) {
            string currentSubstring = str1.substr(0, i + 1);
            string stringDivisor = currentSubstring;
            
            while (stringDivisor.length() < str1.length()) {
                stringDivisor += currentSubstring;
            }

            
            if (stringDivisor == str1) {
                stringDivisor = currentSubstring;

                while (stringDivisor.length() < str2.length()) {
                    stringDivisor += currentSubstring;
                }

                if (stringDivisor == str2) {
                    longestSubstring = currentSubstring;
                }
            }
        }

        return longestSubstring;
    }
};
```

**Time complexity:** O(min(L1, L2) * (L1 + L2)) = O(L1 * (L1 + L2))

**Space Complexity:** O(L1 + L2)

**My 2nd solution**

```cpp
class Solution {
public:
    string gcdOfStrings(string str1, string str2) {
        string largestDivisor;

        for (int i = 1; i <= str2.length(); i++) {
            string divisor = str2.substr(0, i);
            string currentDivisor = divisor;

            int str1IsDivided = 0;
            int str2IsDivided = 0;

            while (str1.length() >= currentDivisor.length()) {
                if (str1 == currentDivisor) {
                    str1IsDivided = 1;
                    break;
                }

                currentDivisor = currentDivisor + divisor;
            }

            currentDivisor = divisor;

            while (str2.length() >= currentDivisor.length()) {
                if (str2 == currentDivisor) {
                    str2IsDivided = 1;
                    break;
                }

                currentDivisor = currentDivisor + divisor;
            }

            if (str1IsDivided == 1 && str2IsDivided == 1) {
                if (largestDivisor < divisor) {
                    largestDivisor = divisor;
                }
            }
        }

        return largestDivisor;
    }
};
```

**Time complexity:** O(L1 * (L1 + L2))

**Space Complexity:** O(L1 + L2)

**Optimized solution**

```cpp
class Solution {
public:
    std::string gcdOfStrings(std::string str1, std::string str2) {
        if (str1 + str2 != str2 + str1) {
            return "";
        }

        int len1 = str1.length();
        int len2 = str2.length();
        int gcd_len = std::gcd(len1, len2);

        return str1.substr(0, gcd_len);
    }
};
```

**Time complexity:** O(L1 + L2 + log(min(L1, L2))) = O(L1 + L2)

**Space Complexity:** O(L1 + L2)