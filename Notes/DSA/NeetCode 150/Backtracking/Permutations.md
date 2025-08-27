Link: https://leetcode.com/problems/permutations/description/

**My solution**

```cpp
class Solution {
public:
    vector<vector<int>> permute(vector<int>& nums) {
        sort(nums.begin(), nums.end());

        vector<vector<int>> permutations;

        int factorial = calculateFactorial(nums.size());

        for (int i = 0; i < factorial; i++) {
            permutations.push_back({nums});

            next_permutation(nums.begin(), nums.end());
        }

        return permutations;
    }

    int calculateFactorial(int size) {
        if (size == 0 || size == 1) {
            return 1;
        }

        return size * calculateFactorial(size - 1);
    }
};
```

**Time complexity:** O(n! * n * n log n) = O(n!)

**Space complexity:** O(n! * n) = O(n!)

This is **not** the optimized solution.

**Optimized solution**

```cpp
class Solution {
public:
    vector<vector<int>> permute(vector<int>& nums) {
        vector<vector<int>> result;
        backtrack(nums, 0, result);
        return result;
    }

private:
    void backtrack(vector<int>& nums, int start, vector<vector<int>>& result) {
        if (start == nums.size()) {
            result.push_back(nums);
            return;
        }

        for (int i = start; i < nums.size(); ++i) {
            swap(nums[start], nums[i]);
            backtrack(nums, start + 1, result);
            swap(nums[start], nums[i]);  // backtrack
        }
    }
};
```

**Time complexity:** O(n! * n) = O(n!)

**Space complexity:** O(n! * n) = O(n!)