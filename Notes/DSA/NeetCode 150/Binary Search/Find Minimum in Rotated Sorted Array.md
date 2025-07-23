Link: https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/description/

**My solution**

```cpp
class Solution {
public:
    int findMin(vector<int>& nums) {
        int minimumElement = INT_MAX;

        for (int i = 0; i < nums.size(); i++) {
            if (minimumElement > nums[i]) {
                minimumElement = nums[i];
            }
        }

        return minimumElement;
    }
};
```

**Time complexity:** O(N)

**Space complexity:** O(1) 

This is **not** the optimized solution.

**Optimized solution**

```cpp
class Solution {
public:
    int findMin(vector<int>& nums) {
        int left = 0;
        int right = nums.size() - 1;

        while (left < right) {
            int mid = left + (right - left) / 2;

            // If middle element is greater than the right, min must be to the right
            if (nums[mid] > nums[right]) {
                left = mid + 1;
            }
            // Else, min is at mid or to the left
            else {
                right = mid;
            }
        }

        return nums[left];
    }
};
```

**Time complexity:** O(log N)

**Space complexity:** O(1) 