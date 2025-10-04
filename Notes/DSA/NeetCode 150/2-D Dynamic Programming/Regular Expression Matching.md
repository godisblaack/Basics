Link: https://leetcode.com/problems/regular-expression-matching/description/

I was not able to solve it.

**Recursion**

```cpp
class Solution {
public:
    bool isMatch(string s, string p) {
        int m = s.size(), n = p.size();
        return dfs(0, 0, s, p, m, n);
    }

    bool dfs(int i, int j, const string& s, const string& p, int m, int n) {
        if (j == n) return i == m;

        bool match = (i < m && (s[i] == p[j] || p[j] == '.'));
        if (j + 1 < n && p[j + 1] == '*') {
            return dfs(i, j + 2, s, p, m, n) ||
                   (match && dfs(i + 1, j, s, p, m, n));
        }

        if (match) {
            return dfs(i + 1, j + 1, s, p, m, n);
        }

        return false;
    }
};
```

**Time complexity:** $O(2^{m + n})$, where m is the length of the string s and n is the length of the string p.

**Space complexity:** O(m + n)

**Dynamic Programming (Top-Down)**

```cpp
class Solution {
    vector<vector<int>> dp;

public:
    bool isMatch(string s, string p) {
        int m = s.length(), n = p.length();
        dp.assign(m + 1, vector<int>(n + 1, -1));
        return dfs(0, 0, s, p, m, n);
    }

private:
    bool dfs(int i, int j, string& s, string& p, int m, int n) {
        if (j == n) {
            return i == m;
        }
        if (dp[i][j] != -1) {
            return dp[i][j];
        }
        bool match = i < m && (s[i] == p[j] || p[j] == '.');
        if (j + 1 < n && p[j + 1] == '*') {
            dp[i][j] = dfs(i, j + 2, s, p, m, n) ||
                       (match && dfs(i + 1, j, s, p, m, n));
        } else {
            dp[i][j] = match && dfs(i + 1, j + 1, s, p, m, n);
        }
        return dp[i][j];
    }
};
```

**Time complexity:** O(m∗n), where m is the length of the string s and n is the length of the string p.

**Space complexity:** O(m∗n)

**Dynamic Programming (Bottom-Up)**

```cpp
class Solution {
public:
    bool isMatch(string s, string p) {
        int m = s.length(), n = p.length();
        vector<vector<bool>> dp(m + 1, vector<bool>(n + 1, false));
        dp[m][n] = true;

        for (int i = m; i >= 0; i--) {
            for (int j = n - 1; j >= 0; j--) {
                bool match = i < m && (s[i] == p[j] || p[j] == '.');

                if ((j + 1) < n && p[j + 1] == '*') {
                    dp[i][j] = dp[i][j + 2];
                    if (match) {
                        dp[i][j] = dp[i + 1][j] || dp[i][j];
                    }
                } else if (match) {
                    dp[i][j] = dp[i + 1][j + 1];
                }
            }
        }

        return dp[0][0];
    }
};
```

**Time complexity:** O(m∗n), where m is the length of the string s and n is the length of the string p.

**Space complexity:** O(m∗n)

**Dynamic Programming (Space Optimized)**

```cpp
class Solution {
public:
    bool isMatch(string s, string p) {
        vector<bool> dp(p.length() + 1, false);
        dp[p.length()] = true;

        for (int i = s.length(); i >= 0; i--) {
            vector<bool> nextDp(p.length() + 1, false);
            nextDp[p.length()] = (i == s.length());

            for (int j = p.length() - 1; j >= 0; j--) {
                bool match = i < s.length() &&
                             (s[i] == p[j] || p[j] == '.');

                if (j + 1 < p.length() && p[j + 1] == '*') {
                    nextDp[j] = nextDp[j + 2];
                    if (match) {
                        nextDp[j] = nextDp[j] || dp[j];
                    }
                } else if (match) {
                    nextDp[j] = dp[j + 1];
                }
            }

            dp = nextDp;
        }

        return dp[0];
    }
};
```

**Time complexity:** O(m∗n), where m is the length of the string s and n is the length of the string p.

**Space complexity:** O(n)

**Dynamic Programming (Optimal)**

```cpp
class Solution {
public:
    bool isMatch(string s, string p) {
        vector<bool> dp(p.length() + 1, false);
        dp[p.length()] = true;

        for (int i = s.length(); i >= 0; i--) {
            bool dp1 = dp[p.length()];
            dp[p.length()] = (i == s.length());

            for (int j = p.length() - 1; j >= 0; j--) {
                bool match = i < s.length() &&
                             (s[i] == p[j] || p[j] == '.');
                bool res = false;
                if (j + 1 < p.length() && p[j + 1] == '*') {
                    res = dp[j + 2];
                    if (match) {
                        res = res || dp[j];
                    }
                } else if (match) {
                    res = dp1;
                }
                dp1 = dp[j];
                dp[j] = res;
            }
        }

        return dp[0];
    }
};
```

**Time complexity:** O(m∗n), where m is the length of the string s and n is the length of the string p.

**Space complexity:** O(n)