Link: https://leetcode.com/problems/distinct-subsequences/description/

I was not able to solve it.

**Recursion**

```cpp
class Solution {
public:
    int numDistinct(string s, string t) {
        if (t.length() > s.length()) {
            return 0;
        }
        return dfs(s, t, 0, 0);
    }

private:
    int dfs(const string &s, const string &t, int i, int j) {
        if (j == t.length()) {
            return 1;
        }
        if (i == s.length()) {
            return 0;
        }

        int res = dfs(s, t, i + 1, j);
        if (s[i] == t[j]) {
            res += dfs(s, t, i + 1, j + 1);
        }
        return res;
    }
};
```

**Time complexity:** $O(2^{m})$, where m is the length of the string s.

**Space complexity:** O(m)

**Dynamic Programming (Top-Down)**

```cpp
class Solution {
    vector<vector<int>> dp;
public:
    int numDistinct(string s, string t) {
        int m = s.size(), n = t.size();
        if (n > m) return 0;
        dp.assign(m + 1, vector<int>(n + 1, -1));
        return dfs(s, t, 0, 0);
    }

private:
    int dfs(const string &s, const string &t, int i, int j) {
        if (j == t.size()) return 1;
        if (i == s.size()) return 0;
        if (dp[i][j] != -1) return dp[i][j];

        int res = dfs(s, t, i + 1, j);
        if (s[i] == t[j]) {
            res += dfs(s, t, i + 1, j + 1);
        }
        dp[i][j] = res;
        return res;
    }
};
```

**Time complexity:** O(m∗n), where m is the length of the string s and n is the length of the string t.

**Space complexity:** O(m∗n)

**Dynamic Programming (Bottom-Up)**

```cpp
class Solution {
public:
    int numDistinct(string s, string t) {
        int m = s.length(), n = t.length();
        vector<vector<uint>> dp(m + 1, vector<uint>(n + 1, 0));

        for (int i = 0; i <= m; i++) {
            dp[i][n] = 1;
        }

        for (int i = m - 1; i >= 0; i--) {
            for (int j = n - 1; j >= 0; j--) {
                dp[i][j] = dp[i + 1][j];
                if (s[i] == t[j]) {
                    dp[i][j] += dp[i + 1][j + 1];
                }
            }
        }

        return dp[0][0];
    }
};
```

**Time complexity:** O(m∗n), where m is the length of the string s and n is the length of the string t.

**Space complexity:** O(m∗n)

**Dynamic Programming (Space Optimized)**

```cpp
class Solution {
public:
    int numDistinct(string s, string t) {
        int m = s.size(), n = t.size();
        vector<uint> dp(n + 1, 0);
        vector<uint> nextDp(n + 1, 0);
        dp[n] = nextDp[n] = 1;

        for (int i = m - 1; i >= 0; i--) {
            for (int j = n - 1; j >= 0; j--) {
                nextDp[j] = dp[j];
                if (s[i] == t[j]) {
                    nextDp[j] += dp[j + 1];
                }
            }
            dp = nextDp;
        }

        return dp[0];
    }
};
```

**Time complexity:** O(m∗n), where m is the length of the string s and n is the length of the string t.

**Space complexity:** O(n)

**Dynamic Programming (Optimal)**

```cpp
class Solution {
public:
    int numDistinct(string s, string t) {
        int m = s.size(), n = t.size();
        vector<uint> dp(n + 1, 0);
        dp[n] = 1;

        for (int i = m - 1; i >= 0; i--) {
            int prev = 1;
            for (int j = n - 1; j >= 0; j--) {
                uint res = dp[j];
                if (s[i] == t[j]) {
                    res += prev;
                }

                prev = dp[j];
                dp[j] = res;
            }
        }

        return dp[0];
    }
};
```

**Time complexity:** O(m∗n), where m is the length of the string s and n is the length of the string t.

**Space complexity:** O(n)