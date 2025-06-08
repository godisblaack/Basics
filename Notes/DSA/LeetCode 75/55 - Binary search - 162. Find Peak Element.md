Link: https://leetcode.com/problems/find-peak-element/description/

**My solution**  

```cpp
class Solution {
public:
    int findPeakElement(vector<int>& nums) {
        if (nums.size() == 1) {
            return 0;
        }

        if (nums.size() == 2) {
            if (nums[0] > nums[1] && nums[0] > INT_MIN) {
                return 0;
            } else {
                return 1;
            }
        }

        int start = 0;
        int end = nums.size() - 1;
        int mid = start + (end - start) / 2;

        while (start <= end) {
            mid = start + (end - start) / 2;

            if (mid + 1 < nums.size() && nums[mid + 1] > nums[mid]) {
                start = mid + 1;
            } else if (mid - 1 >= 0 && nums[mid - 1] > nums[mid]) {
                end = mid - 1;
            } else {
                return mid;
            }
        }

        return mid;
    }
};
```

**Time complexity:** O(log N)

**Space complexity:** O(1)

I got this solution after solving the problem **852. Peak Index in a Mountain Array**.
Link: https://leetcode.com/problems/peak-index-in-a-mountain-array/description/

This is **not** the optimized solution. The solution is optimized by fixing the following condition:

```cpp
else if (mid - 1 >= 0 && nums[mid - 1] > nums[mid]) {
    end = mid - 1;`
}
```

**Reason**  
If nums[mid] is greater than its right neighbor (nums[mid + 1]), it means we are either on the decreasing slope or at the peak itself. In this case, the peak must be at 'mid' or to its left. So, we move 'left' to 'mid'.

**Optimized solution**

```cpp
class Solution {
public:
    int findPeakElement(vector<int>& nums) {
        int n = nums.size();

        // Edge case: If there's only one element, it's always the peak.
        // This is explicitly covered by the problem statement's -infinity boundaries.
        if (n == 1) {
            return 0;
        }

        int left = 0;
        int right = n - 1;

        // The loop continues as long as 'left' is less than 'right'.
        // When 'left' becomes equal to 'right', it means we have converged to a single element,
        // which must be a peak.
        while (left < right) {
            int mid = left + (right - left) / 2;

            // Property: nums[i] != nums[i+1] for all valid i.
            // This means there are no plateaus, only strictly increasing or decreasing segments.

            // If nums[mid] is less than its right neighbor (nums[mid + 1]),
            // it means we are on the increasing slope of a mountain.
            // Therefore, the peak must be to the right of 'mid' (including mid + 1).
            // We can safely move 'left' to 'mid + 1'.
            if (nums[mid] < nums[mid + 1]) {
                left = mid + 1;
            }
            // If nums[mid] is greater than its right neighbor (nums[mid + 1]),
            // it means we are either on the decreasing slope or at the peak itself.
            // In this case, the peak must be at 'mid' or to its left.
            // So, we move 'right' to 'mid'.
            else {
                right = mid;
            }
        }

        // When the loop terminates, 'left' (which is now equal to 'right')
        // will point to an index where nums[left] is a peak.
        return left;
    }
};
```

**Time complexity:** O(log N)

**Space complexity:** O(1)

**Why the algorithm works?**  
The algorithm's strategy is **not** to find the peak, but a peak. Even if there are multiple peaks (like 2 at index 1 and 6 at index 5 in [1, 2, 1, 3, 5, 6, 4]), the algorithm's logic will correctly guide the left and right pointers to converge on one of them. Which one it finds depends on the initial mid calculation and the subsequent comparisons, but it's guaranteed to be a valid peak.