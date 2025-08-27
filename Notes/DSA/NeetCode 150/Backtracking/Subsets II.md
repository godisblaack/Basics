Link: https://leetcode.com/problems/subsets-ii/description/

**My solution**

```cpp
class Solution {
public:
    vector<vector<int>> subsetsWithDup(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        
        set<vector<int>> subSets;
        vector<int> current;

        subset(nums, subSets, current, 0);

        vector<vector<int>> answer;

        for (auto vector : subSets) {
            answer.push_back({vector});
        }

        return answer;
    }

    set<vector<int>> subset(vector<int>& nums, set<vector<int>>& subSets, vector<int>& current, int index) {
        if (index == nums.size()) {
            subSets.insert({current});

            return subSets;
        }

        current.push_back(nums[index]);
        subset(nums, subSets, current, index + 1);

        current.pop_back();
        subset(nums, subSets, current, index + 1);

        return subSets;
    }
};
```

**Time complexity:** O($2^{n}$ * n * log k)

**Space complexity:** O(k * n)

---

### Time Complexity Breakdown

| **Component**              | **Complexity**       | **Explanation**                                                                 |
|---------------------------|----------------------|---------------------------------------------------------------------------------|
| Sorting                   | O(n log n)           | To group duplicates before generating subsets                                  |
| Subset generation         | O(2ⁿ)                | Each element has two choices: include or exclude                               |
| Inserting into set        | O(n × log k)         | Each subset of size up to `n` takes O(n) to copy and O(log k) to insert        |
| Final conversion to vector| O(k × n)             | Copying `k` unique subsets of size up to `n` into the final result             |

> **Overall Time Complexity:** `O(2ⁿ × n × log k)` where `k ≤ 2ⁿ` is the number of unique subsets.

---

### Space Complexity Breakdown

| **Component**     | **Complexity**   | **Explanation**                                                              |
|------------------|------------------|------------------------------------------------------------------------------|
| Recursion stack  | O(n)             | Depth of recursion for backtracking                                         |
| `current` vector | O(n)             | Temporary subset being built during recursion                               |
| Set storage      | O(k × n)         | `k` unique subsets, each of size up to `n`                                  |
| Final result     | O(k × n)         | Copied into the `answer` vector                                             |

> **Overall Space Complexity:** `O(k × n)`

---

This is **not** the optimized solution.

**Optimized solutoin**

```cpp
class Solution {
public:
    vector<vector<int>> subsetsWithDup(vector<int>& nums) {
        sort(nums.begin(), nums.end());  // Sort to group duplicates
        vector<vector<int>> result;
        vector<int> current;
        backtrack(nums, 0, current, result);
        return result;
    }

    void backtrack(vector<int>& nums, int start, vector<int>& current, vector<vector<int>>& result) {
        result.push_back(current);

        for (int i = start; i < nums.size(); ++i) {
            // Skip duplicates
            if (i > start && nums[i] == nums[i - 1]) continue;

            current.push_back(nums[i]);
            backtrack(nums, i + 1, current, result);
            current.pop_back();
        }
    }
};
```
**Time complexity:** O(n log n + $2^{n}$)

**Space complexity:** O(n * $2^{n}$)

### Time Complexity: **O(2ⁿ)**

| Component             | Complexity | Explanation |
|----------------------|------------|-------------|
| Sorting              | O(n log n) | Required to group duplicates |
| Subset generation    | O(2ⁿ)      | Each element is either included or excluded |
| No set insertion     | —          | Avoids costly `log k` operations |

> **Total:** `O(n log n + 2ⁿ)` → Dominated by `O(2ⁿ)`

---

### Space Complexity: **O(n × 2ⁿ)**

| Component         | Complexity     | Explanation |
|------------------|----------------|-------------|
| Recursion stack  | O(n)           | Max depth of recursion |
| Result storage   | O(n × 2ⁿ)      | Up to `2ⁿ` subsets, each of size up to `n` |
| Temporary vector | O(n)           | Used during recursion |

> **Total:** `O(n × 2ⁿ)` for storing all subsets