Link: https://leetcode.com/problems/longest-subarray-of-1s-after-deleting-one-element/description/

**My solution**

```cpp
class Solution {
public:
    int longestSubarray(vector<int>& nums) {
        int zeroCount = 0;
        int maxOnes = 0;
        int left = 0;

        for (int right = 0; right < nums.size(); right++) {
            while (nums[right] == 0 && zeroCount == 1) {
                if (nums[left] == 0) {
                    zeroCount--;

                    left++;
                } else {
                    left++;
                }
            }

            if (nums[right] == 0) {
                zeroCount++;
            }
            
            if (maxOnes < right - left) {
                maxOnes = right - left;
            }
        }

        return maxOnes;
    }
};
```

**Time complexity:** O(N)

**Space complexity:** O(1)

This is the **optimzied** solution.