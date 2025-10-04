Link: https://leetcode.com/problems/target-sum/description/

I was not able to solve it.

**Recursion**

```cpp
class Solution {
public:
    int findTargetSumWays(vector<int>& nums, int target) {
        return backtrack(0, 0, nums, target);
    }

    int backtrack(int i, int total, vector<int>& nums, int target) {
        if (i == nums.size()) {
            return total == target;
        }
        return backtrack(i + 1, total + nums[i], nums, target) +
               backtrack(i + 1, total - nums[i], nums, target);
    }
};
```

**Time complexity:** $O(2^{n})$

**Space complexity:** O(n)

**Dynamic Programming (Top-Down)**

```cpp
class Solution {
    vector<vector<int>> dp;
    int totalSum;

public:
    int findTargetSumWays(vector<int>& nums, int target) {
        totalSum = accumulate(nums.begin(), nums.end(), 0);
        dp = vector<vector<int>>(nums.size(), vector<int>(2 * totalSum + 1, INT_MIN));
        return backtrack(0, 0, nums, target);
    }

    int backtrack(int i, int total, vector<int>& nums, int target) {
        if (i == nums.size()) {
            return total == target;
        }
        if (dp[i][total + totalSum] != INT_MIN) {
            return dp[i][total + totalSum];
        }
        dp[i][total + totalSum] = backtrack(i + 1, total + nums[i], nums, target) +
                                  backtrack(i + 1, total - nums[i], nums, target);
        return dp[i][total + totalSum];
    }
};
```

**Time complexity:** O(n∗m), where n is the length of the array nums and m is the sum of all the elements in the array.

**Space complexity:** O(n∗m)

**Dynamic Programming (Bottom-Up)**

```cpp
class Solution {
public:
    int findTargetSumWays(vector<int>& nums, int target) {
        int n = nums.size();
        vector<unordered_map<int, int>> dp(n + 1);
        dp[0][0] = 1;

        for (int i = 0; i < n; i++) {
            for (auto &p : dp[i]) {
                dp[i + 1][p.first + nums[i]] += p.second;
                dp[i + 1][p.first - nums[i]] += p.second;
            }
        }
        return dp[n][target];
    }
};
```

**Time complexity:** O(n∗m), where n is the length of the array nums and m is the sum of all the elements in the array.

**Space complexity:** O(n∗m)

**Dynamic Programming (Space Optimized)**

```cpp
class Solution {
public:
    int findTargetSumWays(vector<int>& nums, int target) {
        unordered_map<int, int> dp;
        dp[0] = 1;

        for (int num : nums) {
            unordered_map<int, int> nextDp;
            for (auto& entry : dp) {
                int total = entry.first;
                int count = entry.second;
                nextDp[total + num] += count;
                nextDp[total - num] += count;
            }
            dp = nextDp;
        }
        return dp[target];
    }
};
```

**Time complexity:** O(n∗m), where n is the length of the array nums and m is the sum of all the elements in the array.

**Space complexity:** O(m)