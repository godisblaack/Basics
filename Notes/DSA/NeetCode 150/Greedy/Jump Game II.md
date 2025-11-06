Link: https://leetcode.com/problems/jump-game-ii/description/

I was not able to solve it.

**Recursion**

```cpp
class Solution {
public:
    int jump(vector<int>& nums) {
        return dfs(nums, 0);
    }

private:
    int dfs(vector<int>& nums, int i) {
        if (i == nums.size() - 1) {
            return 0;
        }
        if (nums[i] == 0) {
            return 1000000;
        }

        int res = 1000000;
        int end = min((int)nums.size() - 1, i + nums[i]);
        for (int j = i + 1; j <= end; ++j) {
            res = min(res, 1 + dfs(nums, j));
        }

        return res;
    }
};
```

**Time complexity:** O(n!)

**Space complexity:** O(n)

**Dynamic Programming (Top-Down)**

```cpp
class Solution {
public:
    int jump(vector<int>& nums) {
        unordered_map<int, int> memo;
        return dfs(nums, 0, memo);
    }

private:
    int dfs(vector<int>& nums, int i, unordered_map<int, int>& memo) {
        if (memo.count(i)) {
            return memo[i];
        }
        if (i == nums.size() - 1) {
            return 0;
        }
        if (nums[i] == 0) {
            return 1000000;
        }

        int res = 1000000;
        int end = min((int)nums.size(), i + nums[i] + 1);
        for (int j = i + 1; j < end; j++) {
            res = min(res, 1 + dfs(nums, j, memo));
        }
        memo[i] = res;
        return res;
    }
};
```

**Time complexity:** $O(n^{2})$

**Space complexity:** O(n)

**Dynamic Programming (Bottom-Up)**

```cpp
class Solution {
public:
    int jump(vector<int>& nums) {
        int n = nums.size();
        vector<int> dp(n, 1000000);
        dp[n - 1] = 0;

        for (int i = n - 2; i >= 0; i--) {
            int end = min((int)nums.size(), i + nums[i] + 1);
            for (int j = i + 1; j < end; j++) {
                dp[i] = min(dp[i], 1 + dp[j]);
            }
        }
        return dp[0];
    }
};
```

**Time complexity:** $O(n^{2})$

**Space complexity:** O(n)

**Breadth First Search (Greedy)**

```cpp
class Solution {
public:
    int jump(vector<int>& nums) {
        int res = 0, l = 0, r = 0;

        while (r < nums.size() - 1) {
            int farthest = 0;
            for (int i = l; i <= r; i++) {
                farthest = max(farthest, i + nums[i]);
            }
            l = r + 1;
            r = farthest;
            res++;
        }
        return res;
    }
};
```

**Time complexity:** O(n)

**Space complexity:** O(1)