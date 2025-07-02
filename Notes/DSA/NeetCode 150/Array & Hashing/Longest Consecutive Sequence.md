Link: https://leetcode.com/problems/longest-consecutive-sequence/description/

**My solution** 

```cpp
class Solution {
public:
    int longestConsecutive(vector<int>& nums) {
        if (nums.size() == 0) {
            return 0;
        }

        sort(nums.begin(), nums.end());

        int count = 1;
        int maxCount = 1;

        for (int i = 1; i < nums.size(); i++) {
            if (nums[i] == nums[i - 1]) {
                continue;
            } else if (nums[i - 1] + 1 == nums[i]) {
                count++;
            } else {
                if (maxCount < count) {
                    maxCount = count;
                }

                count = 1;
            }
        }

        if (maxCount < count) {
            maxCount = count;
        }

        return maxCount;
    }
};
```

**Time complexity:** O(N log N) 

**Space complexity:** O(1)

This is **not** the optimized solution.

**Optimized solution**

```cpp
class Solution {
public:
    int longestConsecutive(vector<int>& nums) {
        if (nums.size() == 0) {
            return 0;
        }

        sort(nums.begin(), nums.end());

        int count = 1;
        int maxCount = 1;

        for (int i = 1; i < nums.size(); i++) {
            if (nums[i] == nums[i - 1]) {
                continue;
            } else if (nums[i - 1] + 1 == nums[i]) {
                count++;
            } else {
                if (maxCount < count) {
                    maxCount = count;
                }

                count = 1;
            }
        }

        if (maxCount < count) {
            maxCount = count;
        }

        return maxCount;
    }
};
```

**Time complexity:** O(N) 

**Space complexity:** O(1)