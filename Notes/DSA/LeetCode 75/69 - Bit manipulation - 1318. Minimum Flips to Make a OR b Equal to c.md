Link: https://leetcode.com/problems/minimum-flips-to-make-a-or-b-equal-to-c/description/

I was not able to solve it, I watched a solution and coded the solution my self. My solution is different from the solution I watched.

**My solution**

```cpp
class Solution {
public:
    int minFlips(int a, int b, int c) {
        int flips = 0;

        for (int i = 0; i < 31; i++) {
            int bitA = a & 1;
            a >>= 1;
            
            int bitB = b & 1;
            b >>= 1;

            int bitC = c & 1;
            c >>= 1;

            int currentOR = bitA | bitB;

            if (currentOR != bitC) {
                if (bitC == 1) {
                    flips++;
                } else {
                    if (bitA == 1) {
                        flips++;
                    }

                    if (bitB == 1) {
                        flips++;
                    }
                }
            }
        }

        return flips;
    }
};
```

**Time complexity:** O(31) = O(1)

**Space complexity:** O(1)

**Better solution by Gemini**

```cpp
class Solution {
public:
    int minFlips(int a, int b, int c) {
        int flips = 0;

        // Continue as long as there are bits remaining in any of the numbers
        while (a > 0 || b > 0 || c > 0) {
            // Get the least significant bit (LSB) of each number
            int bitA = a & 1;
            int bitB = b & 1;
            int bitC = c & 1;

            // Calculate the OR of the current bits of a and b
            int currentOR = bitA | bitB;

            // If the current OR bit does not match the target bit in c
            if (currentOR != bitC) {
                // If target bit is 1 (c_LSB = 1), but current OR is 0 (a_LSB=0, b_LSB=0)
                // We need to flip one of them to 1. Minimum 1 flip.
                if (bitC == 1) {
                    flips++;
                }
                // If target bit is 0 (c_LSB = 0), but current OR is 1
                // This means a_LSB or b_LSB (or both) are 1.
                // To make currentOR = 0, all '1' bits must become '0'.
                else { // bitC == 0
                    if (bitA == 1) {
                        flips++;
                    }
                    if (bitB == 1) {
                        flips++;
                    }
                }
            }

            // Right shift all numbers to process the next bit (move to the right)
            a >>= 1;
            b >>= 1;
            c >>= 1;
        }
        return flips;
    }
};
```

**Time complexity:** O(31) = O(1)

**Space complexity:** O(1)

**Optimized solution**

```cpp
class Solution {
public:
    int minFlips(int a, int b, int c) {
        int flips = 0;

        // Continue processing bits as long as any of the numbers have set bits
        while (a > 0 || b > 0 || c > 0) {
            // Extract the least significant bit (LSB) of each number
            int bitA = a & 1;
            int bitB = b & 1;
            int bitC = c & 1;

            // If the current OR result (bitA | bitB) does not match the target bitC
            if ((bitA | bitB) != bitC) {
                // Case 1: Target bit is 1 (bitC == 1), but current OR is 0
                // This implies bitA == 0 and bitB == 0.
                // To make the OR result 1, we need to flip exactly one of them (e.g., a_LSB to 1).
                // So, 1 flip is needed.
                if (bitC == 1) {
                    flips++;
                }
                // Case 2: Target bit is 0 (bitC == 0), but current OR is 1
                // This implies at least one of bitA or bitB is 1.
                // To make the OR result 0, both bitA and bitB must be 0.
                // We need to flip each '1' bit to '0'. The number of flips is simply the sum of bitA and bitB.
                else { // bitC == 0
                    flips += (bitA + bitB);
                }
            }

            // Move to the next bit position by right-shifting all numbers
            a >>= 1;
            b >>= 1;
            c >>= 1;
        }
        return flips;
    }
};
```

**Time complexity:** O(31) = O(1)

**Space complexity:** O(1)