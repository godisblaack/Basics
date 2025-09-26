Link: https://leetcode.com/problems/palindromic-substrings/description/

**My solution**

```cpp
class Solution {
public:
    int countSubstrings(string s) {
        int count = 0;

        for (int i = 0; i < s.length(); i++) {
            for (int j = i; j < s.length(); j++) {
                if (isPalindrome(s, i, j)) {
                    count++;
                }
            }
        }

        return count;
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
    int countSubstrings(string s) {
        int count = 0;

        for (int i = 0; i < s.length(); i++) {
            expand(s, i, i, count);
            expand(s, i, i + 1, count);
        }

        return count;
    }

    void expand(string& s, int left, int right, int& count) {
        while (left >= 0 && right < s.length() && s[left] == s[right]) {
            count++;

            left--;
            right++;
        }
    }
};
```

**Time complexity:** O($n^{2}$)

**Space complexity:** O(1)

Both the solutions are **not** the optimized solution.

**Manacher’s Algorithm - Optimized solution**

```cpp
class Solution {
public:
    vector<int> manacher(string& s) {
        if (!s.size())
            return {};
        string t = "#" + string(1, s[0]);
        for (int i = 1; i < s.size(); ++i)
            t += "#" + string(1, s[i]);
        t += "#";
        int n = t.size();
        vector<int> p(n, 0);
        int l = 0, r = 0;
        for (int i = 0; i < n; i++) {
            p[i] = (i < r) ? min(r - i, p[l + (r - i)]) : 0;
            while (i + p[i] + 1 < n && i - p[i] - 1 >= 0 &&
                   t[i + p[i] + 1] == t[i - p[i] - 1])
                p[i]++;
            if (i + p[i] > r)
                l = i - p[i], r = i + p[i];
        }
        return p;
    }

    int countSubstrings(string s) {
        vector<int> p = manacher(s);
        int res = 0;
        for (int i : p) {
            res += (i + 1) / 2;
        }
        return res;
    }
};
```

**Time complexity:** O(n)

**Space complexity:** O(n)