Link: https://leetcode.com/problems/decode-ways/description/

I was not able to solve it.

**Recursion**

```cpp
class Solution {
public:
    int dfs(int i, string& s) {
        if (i == s.size()) return 1;
        if (s[i] == '0') return 0;

        int res = dfs(i + 1, s);
        if (i < s.size() - 1) {
            if (s[i] == '1' ||
               (s[i] == '2' && s[i + 1] < '7')) {
                res += dfs(i + 2, s);
            }
        }
        return res;
    }

    int numDecodings(string s) {
        return dfs(0, s);
    }
};
```

**Time complexity:** O($2^{n}$)

**Space complexity:** O(n)

**Dynamic Programming (Top-Down)**

```cpp
class Solution {
public:
    int numDecodings(string s) {
        unordered_map<int, int> dp;
        dp[s.size()] = 1;
        return dfs(s, 0, dp);
    }

private:
    int dfs(string s, int i, unordered_map<int, int>& dp) {
        if (dp.count(i)) {
            return dp[i];
        }
        if (s[i] == '0') {
            return 0;
        }

        int res = dfs(s, i + 1, dp);
        if (i + 1 < s.size() && (s[i] == '1' ||
            s[i] == '2' && s[i + 1] < '7')) {
            res += dfs(s, i + 2, dp);
        }
        dp[i] = res;
        return res;
    }
};
```

**Time complexity:** O(n)

**Space complexity:** O(n)

**Dynamic Programming (Bottom-Up)**

```cpp
class Solution {
public:
    int numDecodings(string s) {
        vector<int> dp(s.size() + 1);
        dp[s.size()] = 1;
        for (int i = s.size() - 1; i >= 0; i--) {
            if (s[i] == '0') {
                dp[i] = 0;
            } else {
                dp[i] = dp[i + 1];
                if (i + 1 < s.size() && (s[i] == '1' ||
                    s[i] == '2' && s[i + 1] < '7')) {
                    dp[i] += dp[i + 2];
                }
            }
        }
        return dp[0];
    }
};
```

**Time complexity:** O(n)

**Space complexity:** O(n)

**Dynamic Programming (Space Optimized)**

```cpp
class Solution {
public:
    int numDecodings(string s) {
        int dp = 0, dp2 = 0;
        int dp1 = 1;
        for (int i = s.size() - 1; i >= 0; i--) {
            if (s[i] == '0') {
                dp = 0;
            } else {
                dp = dp1;
                if (i + 1 < s.size() && (s[i] == '1' ||
                    s[i] == '2' && s[i + 1] < '7')) {
                    dp += dp2;
                }
            }
            dp2 = dp1;
            dp1 = dp;
            dp = 0;
        }
        return dp1;
    }
};
```

**Time complexity:** O(n)

**Space complexity:** O(1)