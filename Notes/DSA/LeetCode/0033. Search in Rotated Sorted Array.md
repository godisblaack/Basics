Link: https://leetcode.com/problems/search-in-rotated-sorted-array/description/

**My solution**

```cpp
class Solution {
public:
    int search(vector<int>& nums, int target) {
        int peakIndex = findPeak(nums);

        int start = 0;
        int end = nums.size() - 1;

        if (target == nums[peakIndex]) {
            return peakIndex;
        } else if (peakIndex + 1 < nums.size() && target >= nums[peakIndex + 1] &&
                   target <= nums[end]) {
            start = peakIndex + 1;
        } else {
            end = peakIndex;
        }

        while (start <= end) {
            int mid = start + (end - start) / 2;

            if (target == nums[mid]) {
                return mid;
            } else if (target < nums[mid]) {
                end = mid - 1;
            } else {
                start = mid + 1;
            }
        }

        return -1;
    }

    int findPeak(vector<int> nums) {
        int peakIndex = -1;

        int peak = INT_MIN;

        for (int i = 0; i < nums.size(); i++) {
            if (nums[i] > peak) {
                peak = nums[i];

                peakIndex = i;
            }
        }

        return peakIndex;
    }
};
```
**Time complexity:** O(N + log N) = O (N)

**Space complexity:** O(1)

**My solution** (Gemini fixed my findPeak function)

```cpp
class Solution {
public:
    int search(vector<int>& nums, int target) {
        int peak = findPivot(nums);

        int start = 0;
        int end = nums.size() - 1;

        if (target == nums[peak]) {
            return peak;
        } else if (peak + 1 < nums.size() && target >= nums[peak + 1] &&
                   target <= nums[end]) {
            start = peak + 1;
        } else {
            end = peak;
        }

        while (start <= end) {
            int mid = start + (end - start) / 2;

            if (target == nums[mid]) {
                return mid;
            } else if (target < nums[mid]) {
                end = mid - 1;
            } else {
                start = mid + 1;
            }
        }

        return -1;
    }

    int findPivot(vector<int> nums) {
        if (nums.size() == 1) {
            return 0;
        }

        int left = 0;
        int right = nums.size() - 1;

        while (left < right) {
            int mid = left + (right - left) / 2;

            if (nums[right] < nums[mid]) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        
        return left;
    }
};
```

**Time complexity:** O(log N)

**Space complexity:** O(1)

This solution is **not** optimized. The learning is that I was trying to find the peak, but gemini fixed the code by finding the pivot. My logic is correct, which was find the peak element and then search, but I was not able to implement it. After understanding, I wrote the code for find the peak and solved the problem. The brute force approach that came to my mind was

**My solution (with find a peak)**

```cpp
class Solution {
public:
    int search(vector<int>& nums, int target) {
        int peak = findPeak(nums);

        int start = 0;
        int end = nums.size() - 1;

        if (target == nums[peak]) {
            return peak;
        } else if (peak + 1 < nums.size() && target >= nums[peak + 1] &&
                   target <= nums[end]) {
            start = peak + 1;
        } else {
            end = peak;
        }

        while (start <= end) {
            int mid = start + (end - start) / 2;

            if (target == nums[mid]) {
                return mid;
            } else if (target < nums[mid]) {
                end = mid - 1;
            } else {
                start = mid + 1;
            }
        }

        return -1;
    }

    int findPeak(vector<int> nums) {
        if (nums.size() == 1) {
            return 0;
        }

        int left = 0;
        int right = nums.size() - 1;

        while (left < right) {
            int mid = left + (right - left) / 2;

            if (nums[mid] > nums[left]) {
                left = mid;
            } else if (nums[mid] == nums[left]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        return right;
    }
};
```

**Time complexity:** O(log N)

**Space complexity:** O(1)

**Optimized solution**

```cpp
class Solution {
public:
    int search(vector<int>& nums, int target) {
        int left = 0;
        int right = nums.size() - 1;

        while (left <= right) {
            int mid = left + (right - left) / 2;

            if (nums[mid] == target) {
                return mid;
            }

            // Determine which half is sorted
            // Case 1: Left half is sorted (nums[left] to nums[mid])
            if (nums[left] <= nums[mid]) {
                // Check if target is in the sorted left half
                if (target >= nums[left] && target < nums[mid]) {
                    right =
                        mid - 1; // Target is in the left half, so discard right
                } else {
                    left = mid + 1; // Target is in the right (unsorted) half, so discard left
                }
            }
            // Case 2: Right half is sorted (nums[mid] to nums[right])
            else {
                // Check if target is in the sorted right half
                if (target > nums[mid] && target <= nums[right]) {
                    left =
                        mid + 1; // Target is in the right half, so discard left
                } else {
                    right = mid - 1; // Target is in the left (unsorted) half,
                                     // so discard right
                }
            }
        }

        return -1; // Target not found
    }
};
```

**Time complexity:** O(log N)

**Space complexity:** O(1)