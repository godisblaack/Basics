Link: https://leetcode.com/problems/valid-parenthesis-string/description/

I was not able to solve it.

**Recursion**

```cpp
class Solution {
public:
    bool checkValidString(string s) {
        return dfs(0, 0, s);
    }

private:
    bool dfs(int i, int open, const string& s) {
        if (open < 0) return false;
        if (i == s.size()) return open == 0;

        if (s[i] == '(') {
            return dfs(i + 1, open + 1, s);
        } else if (s[i] == ')') {
            return dfs(i + 1, open - 1, s);
        } else {
            return dfs(i + 1, open, s) ||
                   dfs(i + 1, open + 1, s) ||
                   dfs(i + 1, open - 1, s);
        }
    }
};
```

**Time complexity:** $O(3^{n})$

**Space complexity:** O(n)

**Dynamic Programming (Top-Down)**

```cpp
class Solution {
public:
    bool checkValidString(string s) {
        int n = s.size();
        memo = vector<vector<int>>(n + 1, vector<int>(n + 1, -1));
        return dfs(0, 0, s);
    }

private:
    vector<vector<int>> memo;

    bool dfs(int i, int open, const string& s) {
        if (open < 0) return false;
        if (i == s.size()) return open == 0;

        if (memo[i][open] != -1) return memo[i][open] == 1;

        bool result;
        if (s[i] == '(') {
            result = dfs(i + 1, open + 1, s);
        } else if (s[i] == ')') {
            result = dfs(i + 1, open - 1, s);
        } else {
            result = (dfs(i + 1, open, s) ||
                      dfs(i + 1, open + 1, s) ||
                      dfs(i + 1, open - 1, s));
        }

        memo[i][open] = result ? 1 : 0;
        return result;
    }
};
```

**Time complexity:** $O(n^{2})$

**Space complexity:** $O(n^{2})$

**Dynamic Programming (Bottom-Up)**

```cpp
class Solution {
public:
    bool checkValidString(string s) {
        int n = s.size();
        vector<vector<bool>> dp(n + 1, vector<bool>(n + 1, false));
        dp[n][0] = true;

        for (int i = n - 1; i >= 0; --i) {
            for (int open = 0; open < n; ++open) {
                bool res = false;
                if (s[i] == '*') {
                    res |= dp[i + 1][open + 1];
                    if (open > 0) res |= dp[i + 1][open - 1];
                    res |= dp[i + 1][open];
                } else {
                    if (s[i] == '(') {
                        res |= dp[i + 1][open + 1];
                    } else if (open > 0) {
                        res |= dp[i + 1][open - 1];
                    }
                }
                dp[i][open] = res;
            }
        }
        return dp[0][0];
    }
};
```

**Time complexity:** $O(n^{2})$

**Space complexity:** $O(n^{2})$

**Dynamic Programming (Space Optimized)**

```cpp
class Solution {
public:
    bool checkValidString(string s) {
        int n = s.size();
        vector<bool> dp(n + 1, false);
        dp[0] = true;

        for (int i = n - 1; i >= 0; --i) {
            vector<bool> newDp(n + 1, false);
            for (int open = 0; open < n; ++open) {
                if (s[i] == '*') {
                    newDp[open] = dp[open + 1] ||
                                  (open > 0 && dp[open - 1]) || dp[open];
                } else if (s[i] == '(') {
                    newDp[open] = dp[open + 1];
                } else if (open > 0) {
                    newDp[open] = dp[open - 1];
                }
            }
            dp = newDp;
        }
        return dp[0];
    }
};
```

**Time complexity:** $O(n^{2})$ 

**Space complexity:** O(n)

**Stack**

```cpp
class Solution {
public:
    bool checkValidString(string s) {
        stack<int> left, star;
        for (int i = 0; i < s.size(); ++i) {
            if (s[i] == '(') {
                left.push(i);
            } else if (s[i] == '*') {
                star.push(i);
            } else {
                if (left.empty() && star.empty()) return false;
                if (!left.empty()) {
                    left.pop();
                } else {
                    star.pop();
                }
            }
        }

        while (!left.empty() && !star.empty()) {
            if (left.top() > star.top()) return false;
            left.pop();
            star.pop();
        }
        return left.empty();
    }
};
```

**Time complexity:** O(n)

**Space complexity:** O(n)

**Greedy**

```cpp
class Solution {
public:
    bool checkValidString(string s) {
        int leftMin = 0, leftMax = 0;

        for (char c : s) {
            if (c == '(') {
                leftMin++;
                leftMax++;
            } else if (c == ')') {
                leftMin--;
                leftMax--;
            } else {
                leftMin--;
                leftMax++;
            }
            if (leftMax < 0) {
                return false;
            }
            if (leftMin < 0) {
                leftMin = 0;
            }
        }
        return leftMin == 0;
    }
};
```

**Time complexity:** O(n)

**Space complexity:** O(1)