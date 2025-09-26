Link: https://leetcode.com/problems/house-robber-ii/description/

**My solution**

```cpp
class Solution {
public:
    int rob(vector<int>& nums) {
        vector<int> nums1(nums.begin() + 1, nums.end());
        vector<int> nums2(nums.begin(), nums.end() - 1);

        if (nums.size() == 1) {
            return nums[0];
        }
        
        return max(helper(nums1), helper(nums2));
    }

private:
    int helper(vector<int>& nums) {
        int rob1 = 0, rob2 = 0;
        for (int num : nums) {
            int newRob = max(rob1 + num, rob2);
            rob1 = rob2;
            rob2 = newRob;
        }
        return rob2;
    }
};
```

**Time complexity:** O(n)

**Space complexity:** O(n)

This is **not** an optimized solution.

**Recursion**

```cpp
class Solution {
public:
    int rob(vector<int>& nums) {
        if (nums.size() == 1) return nums[0];
        return max(dfs(0, true, nums), dfs(1, false, nums));
    }

private:
    int dfs(int i, bool flag, vector<int>& nums) {
        if (i >= nums.size() || (flag && i == nums.size() - 1))
            return 0;

        return max(dfs(i + 1, flag, nums),
                   nums[i] + dfs(i + 2, flag || i == 0, nums));
    }
};
```

**Time complexity:** O($2^{n}$) 

**Space complexity:** O(n)

**Dynamic Programming (Top-Down)**

```cpp
class Solution {
    vector<vector<int>> memo;

public:
    int rob(vector<int>& nums) {
        if (nums.size() == 1) return nums[0];

        memo.resize(nums.size(), vector<int>(2, -1));
        return max(dfs(0, 1, nums), dfs(1, 0, nums));
    }

private:
    int dfs(int i, int flag, vector<int>& nums) {
        if (i >= nums.size() || (flag == 1 && i == nums.size() - 1))
            return 0;
        if (memo[i][flag] != -1)
            return memo[i][flag];
        memo[i][flag] = max(dfs(i + 1, flag, nums),
                        nums[i] + dfs(i + 2, flag | (i == 0 ? 1 : 0), nums));
        return memo[i][flag];
    }
};
```

**Time complexity:** O(n)

**Space complexity:** O(n)

**Dynamic Programming (Bottom-Up)**

```cpp
class Solution {
public:
    int rob(std::vector<int>& nums) {
        if (nums.size() == 1) return nums[0];

        return max(helper(vector<int>(nums.begin() + 1, nums.end())),
                        helper(vector<int>(nums.begin(), nums.end() - 1)));
    }

    int helper(vector<int> nums) {
        if (nums.empty()) return 0;
        if (nums.size() == 1) return nums[0];

        vector<int> dp(nums.size());
        dp[0] = nums[0];
        dp[1] = max(nums[0], nums[1]);

        for (int i = 2; i < nums.size(); i++) {
            dp[i] = max(dp[i - 1], nums[i] + dp[i - 2]);
        }

        return dp.back();
    }
};
```

**Time complexity:** O(n)

**Space complexity:** O(n)

**Dynamic Programming (Space Optimized)**

```cpp
class Solution {
public:
    int rob(vector<int>& nums) {
        vector<int> nums1(nums.begin() + 1, nums.end());
        vector<int> nums2(nums.begin(), nums.end() - 1);
        return max(nums[0],
               max(helper(nums1), helper(nums2)));
    }

private:
    int helper(vector<int>& nums) {
        int rob1 = 0, rob2 = 0;
        for (int num : nums) {
            int newRob = max(rob1 + num, rob2);
            rob1 = rob2;
            rob2 = newRob;
        }
        return rob2;
    }
};
```

**Time complexity:** O(n)

**Space complexity:** O(1)