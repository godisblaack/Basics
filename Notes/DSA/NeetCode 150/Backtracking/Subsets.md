Link: https://leetcode.com/problems/subsets/description/

**My solution**

```cpp
class Solution {
public:
    vector<vector<int>> subsets(vector<int>& nums) {
      vector<vector<int>> answer;
      vector<int> current;

      return subset(nums, answer, current, 0);  
    }

    vector<vector<int>> subset(vector<int>& nums, vector<vector<int>>& answer, vector<int>& current, int index) {
        if (index == nums.size()) {
            answer.push_back({current});

            return answer;
        }

        current.push_back(nums[index]);
        subset(nums, answer, current, index + 1);

        current.pop_back();
        subset(nums, answer, current, index + 1);

        return answer;
    }
};
```

**Time complexity:** O(N $2^{N}$)

**Space complexity:** O(N $2^{N}$)

This is the **optimized** solution.