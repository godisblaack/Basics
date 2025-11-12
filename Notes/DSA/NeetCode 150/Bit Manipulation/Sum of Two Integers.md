Link: https://leetcode.com/problems/sum-of-two-integers/description/

**My solution**

```cpp
class Solution {
public:
    int getSum(int a, int b) {
        return a + b;
    }
};
```

**Time complexity:** O(1)

**Space complexity:** O(1)

This is **not** optimized.

**Bit Manipulation**

```cpp
class Solution {
public:
    int getSum(int a, int b) {
        while (b != 0) {
            int carry = (a & b) << 1;
            a ^= b;
            b = carry;
        }
        return a;
    }
};
```

**Time complexity:** O(1)

**Space complexity:** O(1)