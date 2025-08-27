Link: https://leetcode.com/problems/combination-sum/description/

**My solution**

```cpp
class Solution {
public:
    vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
        vector<int> current;
        set<vector<int>> targetSum;

        subsets(candidates, target, current, targetSum, 0, 0);

        vector<vector<int>> answer;

        for (auto vector : targetSum) {
            answer.push_back({vector});
        }

        return answer;
    }

    set<vector<int>> subsets(vector<int>& candidates, int target, vector<int>& current, set<vector<int>>& targetSum, int index, int sum) {
        if (sum == target) {
            targetSum.insert({current});

            return targetSum;
        }

        if (sum > target) {
            return targetSum;
        }

        if (index == candidates.size()) {
            return targetSum;
        }

        current.push_back(candidates[index]);
        subsets(candidates, target, current, targetSum, index, sum + candidates[index]);

        subsets(candidates, target, current, targetSum, index + 1, sum + candidates[index]);

        current.pop_back();
        subsets(candidates, target, current, targetSum, index + 1, sum);

        return targetSum;
    }
};
```

**Time complexity:** O(N $2^{N}$)

**Space complexity:** O(N $2^{N}$)

This is **not** the optimized solution. I got Memory Limit Exceeded error.

**Optimized solution**

```cpp
class Solution {
public:
    vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
        vector<vector<int>> result;
        vector<int> current;
        // Sort candidates to handle duplicates and speed up search
        sort(candidates.begin(), candidates.end());
        
        findCombinations(candidates, target, result, current, 0);
        return result;
    }

private:
    void findCombinations(const vector<int>& candidates, int target, vector<vector<int>>& result, vector<int>& current, int start) {
        // Base case: if target is 0, we found a valid combination
        if (target == 0) {
            result.push_back(current);
            return;
        }

        // Base case: if target becomes negative, this path is invalid
        if (target < 0) {
            return;
        }

        // Recursive step
        for (int i = start; i < candidates.size(); ++i) {
            // Include the current candidate in the combination
            current.push_back(candidates[i]);

            // Recursive call for the remaining target sum
            // We pass 'i' (not 'i + 1') to allow for using the same element multiple times
            findCombinations(candidates, target - candidates[i], result, current, i);

            // Backtrack: remove the last element to explore other combinations
            current.pop_back();
        }
    }
};
```
**Time complexity:** O($k⋅N^{T/min_candidate}$)

N: Number of candidates.

T: The target value.

min_candidate: The smallest value in candidates.

k: The average length of a combination.

**Space complexity:** O(k⋅M + T/min_candidate)

M: Total number of valid combinations.

k: Average length of a combination.

T: The target value.

min_candidate: The smallest value in candidates.