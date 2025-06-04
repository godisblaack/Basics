Link: https://leetcode.com/problems/increasing-triplet-subsequence/description/

**My solution**

```cpp
class Solution {
public:
    bool increasingTriplet(vector<int>& nums) {

        for (int i = 0; i < nums.size(); i++) {
            for (int j = 0; j < nums.size(); j++) {
                for (int k = 0; k < nums.size(); k++) {
                    if (i < j && j < k) {
                        if (nums[i] < nums[j] && nums[j] < nums[k]) {
                            return true;
                        }
                    }
                }
            }
        }

        return false;
    }
};
```

**Time complexity:** O($N^{3}$)

**Space complexity:** O(1)

This is **not** the optimized solution. I got TLE for this solution.

**Optimized solution**

```cpp
class Solution {
public:
    bool increasingTriplet(vector<int>& nums) {
        int triplet = 0;
        int maxElement = 0;

        // Finding element with maximum value
        for (int i = 0; i < nums.size(); i++) {
            if (maxElement < nums[i]) {
                maxElement = nums[i];
            }
        }

        int firstElement = maxElement;
        int secondElement = maxElement;
        int thirdElement = maxElement;

        for (int num: nums) {
            if (num <= firstElement) {
                firstElement = num;
            } else if (num <= secondElement) {
                secondElement = num;
            } else if (num <= thirdElement) {
                return true;
            }
        }
        return false;
    }
};
```

**Time complexity:** O(N)

**Space complexity:** O(1)

The given **optimized** solution will be **incorrect** if we try to print the indices and their values, but for simply checking it is **correct**.