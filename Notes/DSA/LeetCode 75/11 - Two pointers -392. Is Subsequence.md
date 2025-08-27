Link: https://leetcode.com/problems/is-subsequence/description/

**My 1st solution**

```cpp
class Solution {
public:
    bool isSubsequence(string s, string t) {
        char* ptrTrack = &t[0];
        char* ptrMatch = &s[0];
        int count = s.length();

        if (s.length() == 0) {
            return true;
        }

        if (t.length() == 0) {
            return false;
        }

        while(ptrTrack <= &t.back() && ptrMatch <= &s.back()) {
            if (*ptrMatch == *ptrTrack) {
                count--;
                
                if (count == 0) {
                    return true;
                }

                ptrMatch++;
                ptrTrack++;
            } else {
                ptrTrack++;
            }
        }

        return false;

    }
};
```

**Time complexity:** O(N)

**Space complexity:** O(1)

**My 2nd solution**

```cpp
class Solution {
public:
    bool isSubsequence(string s, string t) {
        if (s.length() == 0) {
            return true;
        }

        int i = 0;
        int j = 0;

        while (i < s.length() && j < t.length()) {
            if (s[i] == t[j]) {
                i++;
                j++;
            } else if (s[i] != t[j]) {
                j++;
            }

            if (i == s.length()) {
                return true;
            }
        }

        return false;
    }
};
```

**Time complexity:** O(N)

**Space complexity:** O(1)

Both the solutions are the optimized solution. There is another way to do it, which is as follows:

**Other solution by Gemini**

```cpp
class Solution {
public:
    bool isSubsequence(string s, string t) {
        int i = 0; // Pointer for string s
        int j = 0; // Pointer for string t

        while (i < s.length() && j < t.length()) {
            if (s[i] == t[j]) {
                i++; // Move to the next character in s if a match is found
            }
            j++; // Always move to the next character in t
        }

        // If we have reached the end of s, it means all characters of s were
        // found in t in order.
        return i == s.length();
    }
};
```

**Time complexity:** O(N)

**Space complexity:** O(1)