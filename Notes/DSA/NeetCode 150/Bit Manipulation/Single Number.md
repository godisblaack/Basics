Link: https://leetcode.com/problems/single-number/description/

**My solution**

```cpp
class Solution {
public:
    int singleNumber(vector<int>& nums) {
        int singleNumber = 0;
        for (int value : nums) {
            singleNumber ^= value;
        }

        return singleNumber;
    }
};
```

**Time complexity:** O(n)

**Space complexity:** (1)

This is the **optimized** solution.