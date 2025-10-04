Link: https://leetcode.com/problems/coin-change/description/

**My solution**

```cpp
class Solution {
public:
    int coinChange(vector<int>& coins, int amount) {
        if (amount == 0) {
            return 0;
        }

        long long currentAmount = 0;
        int coinCount = 0;
        int minimumCoinCount = numeric_limits<int>::max();
        int index = 0;

        recurrsion(coins, amount, index, currentAmount, coinCount, minimumCoinCount);

        if (minimumCoinCount == numeric_limits<int>::max()) {
            return -1;
        } else {
            return minimumCoinCount;
        }
    }

    void recurrsion(vector<int>& coins, int amount, int index, long long currentAmount, int coinCount, int& minimumCoinCount) {
        if (currentAmount > amount || index >= coins.size()) {
            return;
        }

        if (currentAmount == amount) {
            if (coinCount < minimumCoinCount) {
                minimumCoinCount = coinCount;
            }

            return;
        }

        recurrsion(coins, amount, index, currentAmount + coins[index], coinCount + 1, minimumCoinCount);
        recurrsion(coins, amount, index + 1, currentAmount, coinCount, minimumCoinCount);
    }
};
```

**Time complexity:** O($2^{amount}$)

**Space complexity:** O(amount)

I got TLE for this solution. I was not able to optimize it.

**Recursion**

```cpp
class Solution {
public:
    int dfs(vector<int>& coins, int amount) {
        if (amount == 0) return 0;

        int res = 1e9;
        for (int coin : coins) {
            if (amount - coin >= 0) {
                res = min(res,
                      1 + dfs(coins, amount - coin));
            }
        }
        return res;
    }

    int coinChange(vector<int>& coins, int amount) {
        int minCoins = dfs(coins, amount);
        return (minCoins >= 1e9) ? -1 : minCoins;
    }
};
```

**Time complexity:** O($n^{t}$), where n is the length of the array coins and t is the given amount.

**Space complexity:** O(t)

**Dynamic Programming (Top-Down)**

```cpp
class Solution {
public:
    unordered_map<int, int> memo;
    int dfs(int amount, vector<int>& coins) {
        if (amount == 0) return 0;
        if (memo.find(amount) != memo.end())
            return memo[amount];

        int res = INT_MAX;
        for (int coin : coins) {
            if (amount - coin >= 0) {
                int result = dfs(amount - coin, coins);
                if (result != INT_MAX) {
                    res = min(res, 1 + result);
                }
            }
        }

        memo[amount] = res;
        return res;
    }

    int coinChange(vector<int>& coins, int amount) {
        int minCoins = dfs(amount, coins);
        return minCoins == INT_MAX ? -1 : minCoins;
    }
};
```

**Time complexity:** O(n∗t), where n is the length of the array coins and t is the given amount.

**Space complexity:** O(t)

**Dynamic Programming (Bottom-Up)**

```cpp
class Solution {
public:
    int coinChange(vector<int>& coins, int amount) {
        vector<int> dp(amount + 1, amount + 1);
        dp[0] = 0;
        for (int i = 1; i <= amount; i++) {
            for (int j = 0; j < coins.size(); j++) {
                if (coins[j] <= i) {
                    dp[i] = min(dp[i], dp[i - coins[j]] + 1);
                }
            }
        }
        return dp[amount] > amount ? -1 : dp[amount];
    }
};
```

**Time complexity:** O(n∗t), where n is the length of the array coins and t is the given amount.

**Space complexity:** O(t)

**Breadth First Search**

```cpp
class Solution {
public:
    int coinChange(vector<int>& coins, int amount) {
        if (amount == 0) return 0;

        queue<int> q;
        q.push(0);
        vector<bool> seen(amount + 1, false);
        seen[0] = true;
        int res = 0;

        while (!q.empty()) {
            res++;
            int size = q.size();
            for (int i = 0; i < size; i++) {
                int cur = q.front();
                q.pop();
                for (int coin : coins) {
                    int nxt = cur + coin;
                    if (nxt == amount) return res;
                    if (nxt > amount || seen[nxt]) continue;
                    seen[nxt] = true;
                    q.push(nxt);
                }
            }
        }

        return -1;
    }
};
```

**Time complexity:** O(n∗t), where n is the length of the array coins and t is the given amount.

**Space complexity:** O(t)