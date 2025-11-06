Link: https://leetcode.com/problems/maximum-subarray/description/

**My solution**

```cpp
class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        int maximumSum = 0;

        for (int start = 0; start < nums.size(); ++start) {
            int currentSum = 0;

            for (int size = start; size < nums.size(); ++size) {
                currentSum += nums[size];

                maximumSum = max(maximumSum, currentSum);
            }
        }

        return maximumSum;
    }
};
```

**Time complexity:** $O(n^{2})$

**Space complexity:** O(1)

This is **not** the optimized solution.


**Recursion**

```cpp
class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        return dfs(nums, 0, false);
    }

private:
    int dfs(vector<int>& nums, int i, bool flag) {
        if (i == nums.size()) return flag ? 0 : -1e6;
        if (flag) return max(0, nums[i] + dfs(nums, i + 1, true));
        return max(dfs(nums, i + 1, false),
                   nums[i] + dfs(nums, i + 1, true));
    }
};
```

**Time complexity:** $O(2^{n})$

**Space complexity:** O(n)

**Dynamic Programming (Top-Down)**

```cpp
class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        vector<vector<int>> memo(nums.size() + 1, vector<int>(2, INT_MIN));
        return dfs(nums, 0, false, memo);
    }

private:
    int dfs(vector<int>& nums, int i, bool flag, vector<vector<int>>& memo) {
        if (i == nums.size()) return flag ? 0 : -1e6;
        int f = flag ? 1 : 0;
        if (memo[i][f] != INT_MIN) return memo[i][f];
        if (flag)
            memo[i][f] = max(0, nums[i] + dfs(nums, i + 1, true, memo));
        else
            memo[i][f] = max(dfs(nums, i + 1, false, memo),
                             nums[i] + dfs(nums, i + 1, true, memo));
        return memo[i][f];
    }
};
```

**Time complexity:** O(n)

**Space complexity:** O(n)

**Dynamic Programming (Bottom-Up)**

```cpp
class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        int n = nums.size();
        vector<vector<int>> dp(n + 1, vector<int>(2, 0));

        dp[n - 1][1] = dp[n - 1][0] = nums[n - 1];
        for (int i = n - 2; i >= 0; i--) {
            dp[i][1] = max(nums[i], nums[i] + dp[i + 1][1]);
            dp[i][0] = max(dp[i + 1][0], dp[i][1]);
        }

        return dp[0][0];
    }
};
```

**Time complexity:** O(n)

**Space complexity:** O(n)

**Dynamic Programming (Space Optimized)**

```cpp
class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        vector<int> dp(nums);
        for (int i = 1; i < nums.size(); i++) {
            dp[i] = max(nums[i], nums[i] + dp[i - 1]);
        }
        return *max_element(dp.begin(), dp.end());
    }
};
```

**Time complexity:** O(n)

**Space complexity:** O(n)

**Kadane's Algorithm**

```cpp
class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        int maxSub = nums[0], curSum = 0;
        for (int num : nums) {
            if (curSum < 0) {
                curSum = 0;
            }
            curSum += num;
            maxSub = max(maxSub, curSum);
        }
        return maxSub;
    }
};
```

**Time complexity:** O(n)

**Space complexity:** O(1)

**Divide & Conquer**

```cpp
class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        return dfs(nums, 0, nums.size() - 1);
    }

private:
    int dfs(vector<int>& nums, int l, int r) {
        if (l > r) {
            return INT_MIN;
        }
        int m = (l + r) >> 1;
        int leftSum = 0, rightSum = 0, curSum = 0;
        for (int i = m - 1; i >= l; --i) {
            curSum += nums[i];
            leftSum = max(leftSum, curSum);
        }
        curSum = 0;
        for (int i = m + 1; i <= r; ++i) {
            curSum += nums[i];
            rightSum = max(rightSum, curSum);
        }
        return max(dfs(nums, l, m - 1),
                   max(dfs(nums, m + 1, r),
                       leftSum + nums[m] + rightSum));
    }
};
```

**Time complexity:** O(nlogn)

**Space complexity:** O(logn)