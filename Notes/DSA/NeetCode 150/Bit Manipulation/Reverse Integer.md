Link: https://leetcode.com/problems/reverse-integer/description/

I was **not** able to solve it.

**Iteration**

```cpp
class Solution {
public:
    int reverse(int x) {
        int reversedInteger = 0;

        while (x != 0) {
            int digit = x % 10;

            if (reversedInteger > INT_MAX / 10 || reversedInteger < INT_MIN / 10) {
                return 0;
            }

            reversedInteger = reversedInteger * 10 + digit;

            x /= 10;
        }

        return reversedInteger;
    }
};
```

**Time complexity:** O(1)

**Space complexity:** O(1)

This is the **optimized** solution.