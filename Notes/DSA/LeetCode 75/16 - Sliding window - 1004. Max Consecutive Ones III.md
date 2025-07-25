Link: https://leetcode.com/problems/max-consecutive-ones-iii/description/

**My solution**

```cpp
class Solution {
public:
    int longestOnes(vector<int>& nums, int k) {
        int left = 0;
        int maxLength = 0;
        int zeroCount = 0;

        for (int right = 0; right < nums.size(); right++) {
            if (nums[right] == 0) {
                zeroCount++;
            }

            while (zeroCount > k) {
                if (nums[left] == 0) {
                    zeroCount--;
                }
            
                left++;
            }
            
            maxLength = max(maxLength, right - left + 1);
        }

        return maxLength;
    }
};
```

**Time complexity:** O(N)

**Space complexity:** O(1)

This is the **optimzied** solution.