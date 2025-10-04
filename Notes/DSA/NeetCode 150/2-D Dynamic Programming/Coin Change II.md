Link: https://leetcode.com/problems/coin-change-ii/description/

I was not able to solve it.

**Recursion**

```cpp
class Solution {
public:
    int change(int amount, vector<int>& coins) {
        sort(coins.begin(), coins.end());
        return dfs(coins, 0, amount);
    }

private:
    int dfs(const vector<int>& coins, int i, int a) {
        if (a == 0) {
            return 1;
        }
        if (i >= coins.size()) {
            return 0;
        }

        int res = 0;
        if (a >= coins[i]) {
            res = dfs(coins, i + 1, a);
            res += dfs(coins, i, a - coins[i]);
        }
        return res;
    }
};
```

**Time complexity:** $O(2^{max(n, \tfrac{a}{m})})$, where n is the number of coins, a is the given amount and m is the minimum value among all the coins.

**Space complexity:** $O(max(n, \tfrac{a}{m}))$

**Dynamic Programming (Top-Down)**

```cpp
class Solution {
public:
    int change(int amount, vector<int>& coins) {
        sort(coins.begin(), coins.end());
        vector<vector<int>> memo(coins.size() + 1,
                            vector<int>(amount + 1, -1));

        return dfs(0, amount, coins, memo);
    }

    int dfs(int i, int a, vector<int>& coins, vector<vector<int>>& memo) {
        if (a == 0) return 1;
        if (i >= coins.size()) return 0;
        if (memo[i][a] != -1) return memo[i][a];

        int res = 0;
        if (a >= coins[i]) {
            res = dfs(i + 1, a, coins, memo);
            res += dfs(i, a - coins[i], coins, memo);
        }
        memo[i][a] = res;
        return res;
    }
};
```

**Time complexity:** O(n ∗ a), where n is the number of coins and a is the given amount.

**Space complexity:** O(n ∗ a)

**Dynamic Programming (Bottom-Up)**

```cpp
class Solution {
public:
    int change(int amount, vector<int>& coins) {
        int n = coins.size();
        sort(coins.begin(), coins.end());
        vector<vector<uint>> dp(n + 1, vector<uint>(amount + 1, 0));

        for (int i = 0; i <= n; i++) {
            dp[i][0] = 1;
        }

        for (int i = n - 1; i >= 0; i--) {
            for (int a = 0; a <= amount; a++) {
                if (a >= coins[i]) {
                    dp[i][a] = dp[i + 1][a];
                    dp[i][a] += dp[i][a - coins[i]];
                }
            }
        }

        return dp[0][amount];
    }
};
```

**Time complexity:** O(n ∗ a), where n is the number of coins and a is the given amount.

**Space complexity:** O(n ∗ a)

**Dynamic Programming (Space Optimized)**

```cpp
class Solution {
public:
    int change(int amount, vector<int>& coins) {
        vector<uint> dp(amount + 1, 0);
        dp[0] = 1;
        for (int i = coins.size() - 1; i >= 0; i--) {
            vector<uint> nextDP(amount + 1, 0);
            nextDP[0] = 1;

            for (int a = 1; a <= amount; a++) {
                nextDP[a] = dp[a];
                if (a - coins[i] >= 0) {
                    nextDP[a] += nextDP[a - coins[i]];
                }
            }
            dp = nextDP;
        }
        return dp[amount];
    }
};
```

**Time complexity:** O(n ∗ a), where n is the number of coins and a is the given amount.

**Space complexity:** O(a)

**Dynamic Programming (Optimal)**

```cpp
class Solution {
public:
    int change(int amount, vector<int>& coins) {
        vector<uint> dp(amount + 1, 0);
        dp[0] = 1;
        for (int i = coins.size() - 1; i >= 0; i--) {
            for (int a = 1; a <= amount; a++) {
                dp[a] = dp[a] + (coins[i] <= a ? dp[a - coins[i]] : 0);
            }
        }
        return dp[amount];
    }
};
```

**Time complexity:** O(n ∗ a), where n is the number of coins and a is the given amount.

**Space complexity:** O(a)