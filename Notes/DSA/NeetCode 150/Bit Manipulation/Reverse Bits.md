Link: https://leetcode.com/problems/reverse-bits/description/

**My solution**

```cpp
class Solution {
public:
    int reverseBits(int n) {
        int array[32] = {0};

        int i = 0;

        while (n != 0) {
            int temp = n & 1;

            n >>= 1;

            if (temp) {
                array[31 - i] = 1;
            }

            i++;
        }

        int decimalNumber = 0;

        for (int i = 0; i < 32; i++) {
            decimalNumber += array[i] * pow(2, i);
        }

        return decimalNumber;
    }
};
```

**Time complexity:** O(1)

**Space complexity:** O(1)

This is the **optimized** solution.

**Bitwise solution**

```cpp
class Solution {
public:
    uint32_t reverseBits(uint32_t n) {
        uint32_t result = 0;
        for (int i = 0; i < 32; i++) {
            result <<= 1;          // Shift result left to make room
            result |= (n & 1);     // Add the least significant bit of n
            n >>= 1;               // Shift n right to process the next bit
        }
        return result;
    }
};
```

**Time complexity:** O(1)

**Space complexity:** O(1)