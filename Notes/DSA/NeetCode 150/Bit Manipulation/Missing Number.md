Link: https://leetcode.com/problems/missing-number/description/

I was not able to solve it.

**Bitwise XOR**

```cpp
class Solution {
public:
    int missingNumber(vector<int>& nums) {
        int n = nums.size();
        int xorr = n;
        for (int i = 0; i < n; i++) {
            xorr ^= i ^ nums[i];
        }
        return xorr;
    }
};
```

**Time complexity:** O(n)

**Space complexity:** O(1)