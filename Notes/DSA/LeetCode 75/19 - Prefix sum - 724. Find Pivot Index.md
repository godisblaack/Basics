Link: https://leetcode.com/problems/find-pivot-index/description/

**My solution**

```cpp
class Solution {
public:
    int pivotIndex(vector<int>& nums) {
        if (nums.size() == 0) {
            return -1;
        } else if (nums.size() == 1) {
            return 0;
        }

        vector<int> sumLeft(nums.size() + 1, 0);

        for (int i = 1; i <= nums.size(); i++) {
            sumLeft[i] = sumLeft[i - 1] + nums[i - 1];
        }

        vector<int> sumRight = nums;
        
        sumRight.push_back(0);

        for (int i = nums.size() - 1; i >= 0; i--) {
            sumRight[i] = sumRight[i + 1] + nums[i];
        }

        for (int i = 0; i < sumLeft.size() - 1; i++) {
            if (sumLeft[i] == sumRight[i + 1]) {
                return i;
            }
        }

        return -1;
    }
};
```

**Time complexity:** O(N)

**Space complexity:** O(N)

This is **not** the optimized solution.

**Optimized solution**

```cpp
class Solution {
public:
    int pivotIndex(vector<int>& nums) {
        int totalSum = accumulate(nums.begin(), nums.end(), 0);
        int leftSum = 0;

        for (int i = 0; i < nums.size(); ++i) {
            int rightSum = totalSum - leftSum - nums[i];
            if (leftSum == rightSum) {
                return i;
            }
            leftSum += nums[i];
        }

        return -1;
    }
};
```

**Time complexity:** O(N)

**Space complexity:** O(1)