Link: https://leetcode.com/problems/combination-sum-iii/description/

**My solution** 

```cpp
class Solution {
public:
    vector<vector<int>> combinationSum3(int k, int n) {
        vector<int> nums {1, 2, 3, 4, 5, 6, 7, 8, 9};

        vector<int> current;
        set<vector<int>> combinations;

        for (int i = 0; i < 9; i++) {
            backTracking(nums, k, n, current, combinations, i, 0);
        }

        vector<vector<int>> result;

        for (vector<int> combination : combinations) {
            result.push_back({combination});
        }

        return result;
    }

    void backTracking(vector<int>& nums, int k, int n, 
                      vector<int>& current, set<vector<int>>& combinations, 
                      int index, int sum) {
        if (current.size() == k) {
            if (sum == n) {
                combinations.insert({current});

                return;
            }
        }

        if (index >= 9) {
            return;
        }

        current.push_back(nums[index]);
        backTracking(nums, k, n, current, combinations, index + 1, sum + nums[index]);

        current.pop_back();
        backTracking(nums, k, n, current, combinations, index + 1, sum);

        return;
    }
};
```

**Time complexity:** O($2^{9} k log N$)

**Space complexity:** O($\binom{9}{k}$)

This is **not** the optimized solution.

**Optimized solution**

```cpp
class Solution {
public:
    vector<vector<int>> combinationSum3(int k, int n) {
        vector<vector<int>> result;
        vector<int> current;

        backtrack(1, k, n, current, result);

        return result;
    }

    void backtrack(int start, int k, int target, vector<int>& current, vector<vector<int>>& result) {
        if (current.size() == k) {
            if (target == 0) {
                result.push_back(current);
            }
            return;
        }

        for (int i = start; i <= 9; ++i) {
            if (i > target) break;  // Prune branch
            current.push_back(i);
            backtrack(i + 1, k, target - i, current, result);
            current.pop_back();
        }
    }
};
```

**Time complexity:** O($\binom{9}{k} k$)

**Space complexity:** O($\binom{9}{k} k$)