Link: https://leetcode.com/problems/number-of-1-bits/description/

**My solution**

```cpp
class Solution {
public:
    int hammingWeight(int n) {
        int count = 0;

        while (n != 0) {
            int temp = n & 1;

            n >>= 1;

            if (temp) {
                count++;
            }
        }

        return count;
    }
};
```

**Time complexity:** O(1), fixed width integer.

**Space complexity:** O(1)