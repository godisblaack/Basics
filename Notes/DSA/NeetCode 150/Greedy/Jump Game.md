Link: https://leetcode.com/problems/jump-game/description/

I was not able to solve it.

**Recursion**

```cpp
class Solution {
public:
    bool canJump(vector<int>& nums) {
        return dfs(nums, 0);
    }

private:
    bool dfs(vector<int>& nums, int i) {
        if (i == nums.size() - 1) {
            return true;
        }
        int end = min((int)nums.size() - 1, i + nums[i]);
        for (int j = i + 1; j <= end; ++j) {
            if (dfs(nums, j)) {
                return true;
            }
        }
        return false;
    }
};
```

**Time complexity:** O(n!)

**Space complexity:** O(n)

**Dynamic Programming (Top-Down)**

```cpp
class Solution {
public:
    bool canJump(vector<int>& nums) {
        unordered_map<int, bool> memo;
        return dfs(nums, 0, memo);
    }

private:
    bool dfs(vector<int>& nums, int i, unordered_map<int, bool>& memo) {
        if (memo.count(i)) {
            return memo[i];
        }
        if (i == nums.size() - 1) {
            return true;
        }
        if (nums[i] == 0) {
            return false;
        }

        int end = min((int)nums.size(), i + nums[i] + 1);
        for (int j = i + 1; j < end; j++) {
            if (dfs(nums, j, memo)) {
                memo[i] = true;
                return true;
            }
        }
        memo[i] = false;
        return false;
    }
};
```

**Time complexity:** $O(n^{2})$

**Space complexity:** O(n)

**Dynamic Programming (Bottom-Up)**

```cpp
class Solution {
public:
    bool canJump(vector<int>& nums) {
        int n = nums.size();
        vector<bool> dp(n, false);
        dp[n - 1] = true;

        for (int i = n - 2; i >= 0; i--) {
            int end = min((int)nums.size(), i + nums[i] + 1);
            for (int j = i + 1; j < end; j++) {
                if (dp[j]) {
                    dp[i] = true;
                    break;
                }
            }
        }
        return dp[0];
    }
};
```

**Time complexity:** $O(n^{2})$

**Space complexity:** O(n)

**Greedy**

```cpp
class Solution {
public:
    bool canJump(vector<int>& nums) {
        int goal = nums.size() - 1;

        for (int i = nums.size() - 2; i >= 0; i--) {
            if (i + nums[i] >= goal) {
                goal = i;
            }
        }

        return goal == 0;
    }
};
```

**Time complexity:** O(n)

**Space complexity:** O(1)