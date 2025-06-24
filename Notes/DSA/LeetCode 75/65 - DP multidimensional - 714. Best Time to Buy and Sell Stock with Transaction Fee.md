Link: https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/description/

**My solution**

```cpp
class Solution {
public:
    int maxProfit(vector<int>& prices, int fee) {
        vector<vector<int>> dp(prices.size(), vector<int>(2, -1));

        return calculateMaxProfit(prices, dp, fee, 0, 1);
    }

    int calculateMaxProfit(vector<int>& prices, vector<vector<int>>& dp, int fee, int index, int buy) {
        if (index == prices.size()) {
            return 0;
        }

        if (dp[index][buy] != -1) {
            return dp[index][buy];
        }

        if (buy) {
            dp[index][buy] = max(-prices[index] + calculateMaxProfit(prices, dp, fee, index + 1, 0), 
                                 0 + calculateMaxProfit(prices, dp, fee, index + 1, 1));
        } else {
            dp[index][buy] = max(prices[index] - fee + calculateMaxProfit(prices, dp, fee, index + 1, 1), 
                                 0 + calculateMaxProfit(prices, dp, fee, index + 1, 0));
        }

        return dp[index][buy];
    }
};
```

**Time complexity:** O(N)

**Space complexity:** O(N)

This is **not** the optimized solution.

**Optimal solution**

```cpp
class Solution {
public:
    int maxProfit(vector<int>& prices, int fee) {
        int n = prices.size();
        int hold = -prices[0];  // Max profit when holding a stock
        int cash = 0;           // Max profit when not holding a stock

        for (int i = 1; i < n; i++) {
            hold = max(hold, cash - prices[i]);                // Buy or hold
            cash = max(cash, hold + prices[i] - fee);          // Sell or do nothing
        }

        return cash;
    }
};
```

**Time complexity:** O(N)

**Space complexity:** O(1)