Link: https://leetcode.com/problems/partition-equal-subset-sum/description/

I was not able to solve it.

**Recursion**

```cpp
class Solution {
public:
    bool canPartition(vector<int>& nums) {
        int sum = 0;
        for (int num : nums) {
            sum += num;
        }
        if (sum % 2 != 0) {
            return false;
        }

        return dfs(nums, 0, sum / 2);
    }

    bool dfs(vector<int>& nums, int i, int target) {
        if (i == nums.size()) {
            return target == 0;
        }
        if (target < 0) {
            return false;
        }

        return dfs(nums, i + 1, target) ||
               dfs(nums, i + 1, target - nums[i]);
    }
};
```

**Time complexity:** O($2^{n}$)

**Space complexity:** O(n)

**Dynamic Programming (Top-Down)**

```cpp
class Solution {
public:
    vector<vector<int>> memo;
    bool canPartition(vector<int>& nums) {
        int sum = 0;
        for (int num : nums) {
            sum += num;
        }
        if (sum % 2 != 0) {
            return false;
        }
        memo.resize(nums.size(), vector<int>(sum / 2 + 1, -1));

        return dfs(nums, 0, sum / 2);
    }

    bool dfs(vector<int>& nums, int i, int target) {
        if (i == nums.size()) {
            return target == 0;
        }
        if (target < 0) {
            return false;
        }
        if (memo[i][target] != -1) {
            return memo[i][target];
        }

        memo[i][target] =  dfs(nums, i + 1, target) ||
                           dfs(nums, i + 1, target - nums[i]);
        return memo[i][target];
    }
};
```

**Time complexity:** O(n∗target), where n is the length of the array nums and target is the sum of array elements divided by 2.

**Space complexity:** O(n∗target)

**Dynamic Programming (Bottom-Up)**

```cpp
class Solution {
public:
    bool canPartition(vector<int>& nums) {
        int sum = 0;
        for (int num : nums) {
            sum += num;
        }
        if (sum % 2 != 0) {
            return false;
        }

        int target = sum / 2;
        int n = nums.size();
        vector<vector<bool>> dp(n + 1, vector<bool>(target + 1, false));

        for (int i = 0; i <= n; i++) {
            dp[i][0] = true;
        }

        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= target; j++) {
                if (nums[i - 1] <= j) {
                    dp[i][j] = dp[i - 1][j] ||
                               dp[i - 1][j - nums[i - 1]];
                } else {
                    dp[i][j] = dp[i - 1][j];
                }
            }
        }

        return dp[n][target];
    }
};
```

**Time complexity:** O(n∗target), where n is the length of the array nums and target is the sum of array elements divided by 2.

**Space complexity:** O(n∗target)

**Dynamic Programming (Space Optimized)**

```cpp
class Solution {
public:
    bool canPartition(vector<int>& nums) {
        if (sum(nums) % 2 != 0) {
            return false;
        }

        int target = sum(nums) / 2;
        vector<bool> dp(target + 1, false);
        vector<bool> nextDp(target + 1, false);

        dp[0] = true;
        for (int i = 0; i < nums.size(); i++) {
            for (int j = 1; j <= target; j++) {
                if (j >= nums[i]) {
                    nextDp[j] = dp[j] || dp[j - nums[i]];
                } else {
                    nextDp[j] = dp[j];
                }
            }
            swap(dp, nextDp);
        }

        return dp[target];
    }

private:
    int sum(vector<int>& nums) {
        int total = 0;
        for (int num : nums) {
            total += num;
        }
        return total;
    }
};
```

**Time complexity:** O(n∗target), where n is the length of the array nums and target is the sum of array elements divided by 2.

**Space complexity:** O(target)

**Dynamic Programming (Optimal)**

```cpp
class Solution {
public:
    bool canPartition(vector<int>& nums) {
        if (sum(nums) % 2 != 0) {
            return false;
        }

        int target = sum(nums) / 2;
        vector<bool> dp(target + 1, false);

        dp[0] = true;
        for (int i = 0; i < nums.size(); i++) {
            for (int j = target; j >= nums[i]; j--) {
                dp[j] = dp[j] || dp[j - nums[i]];
            }
        }

        return dp[target];
    }

private:
    int sum(vector<int>& nums) {
        int total = 0;
        for (int num : nums) {
            total += num;
        }
        return total;
    }
};
```

**Time complexity:** O(n∗target), where n is the length of the array nums and target is the sum of array elements divided by 2.

**Space complexity:** O(n∗target)