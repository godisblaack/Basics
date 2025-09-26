Link: https://leetcode.com/problems/min-cost-climbing-stairs/description/

**My 1st solution**

```cpp
class Solution {
public:
    int minCostClimbingStairs(vector<int>& cost) {
        return min(minCost(cost, 0, 0), minCost(cost, 1, 0));
    }

    int minCost(vector<int>& cost, int index, int currentCost) {
        if (index >= cost.size()) {
            return currentCost;
        }

        currentCost += cost[index];

        int left = minCost(cost, index + 1, currentCost);
        int right = minCost(cost, index + 2, currentCost);

        return min(left, right);
    }
};
```

**Time complexity:** O($2^{N}$)

**Space complexity:** O(N)

This is **not** the optimized solution and I got TLE for it.

**My 2nd solution**

```cpp
class Solution {
public:
    int minCostClimbingStairs(vector<int>& cost) {
        return minCost(cost);
    }

    int minCost(vector<int>& cost) {
        vector<int> dp(cost.size() + 1);

        dp[0] = 0;
        dp[1] = 0;

        for (int i = 2; i < dp.size(); i++) {
            dp[i] = min(dp[i - 1] + cost[i - 1], dp[i - 2] + cost[i -2]);  
        }

        return dp[dp.size() - 1];
    }
};
```

**Time complexity:** O(N)

**Space complexity:** O(N)

This also is **not** the optimized solution.

**Optimized solution**

```cpp
class Solution {
public:
    int minCostClimbingStairs(vector<int>& cost) {
        int prev2 = 0, prev1 = 0;

        for (int i = 2; i <= cost.size(); ++i) {
            int current = min(prev1 + cost[i - 1], prev2 + cost[i - 2]);
            prev2 = prev1;
            prev1 = current;
        }

        return prev1;
    }
};
```

**Time complexity:** O(N)

**Space complexity:** O(1)