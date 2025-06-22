Link: https://leetcode.com/problems/maximum-average-subarray-i/description/

**My solution**

```cpp
class Solution {
public:
    double findMaxAverage(vector<int>& nums, int k) {
        int maxSum = 0;
        int sum = 0;

        for (int i = 0; i < k; i++) {
            sum += nums[i];
        }

        maxSum = sum;

        for (int i = 0; i + k < nums.size(); i++) {
            sum -= nums[i];
            sum += nums[i + k];

            if (sum > maxSum) {
                maxSum = sum;
            }
        }

        double average = (double)maxSum / k;

        return average;
    }
};
```

**Time complexity:** O(N)
 
**Space complexity:** O(1)

This is the **optimized** solution.