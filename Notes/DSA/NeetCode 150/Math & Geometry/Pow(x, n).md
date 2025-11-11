Link: https://leetcode.com/problems/powx-n/description/

**My solution**

```cpp
class Solution {
public:
    double myPow(double x, int n) {
        if (x == 0) {
            return 0;
        }
        
        if (n == 0 || x == 1) {
            return 1;
        }

        double result = 1;

        if (n > 0) {
            while (n != 0) {
                result *= x;

                n--;
            }
        } else {
            x = 1 / x;

            while(n != 0) {
                result *= x;

                n++; 
            }
        }

        return result;
    }
};
```

**Time complexity:** O(n)

**Space complexity:** O(1)

This is **not** the optimized solution. I got TLE for this solution.

**Optimized solution**

```cpp
class Solution {
public:
    double myPow(double x, int n) {
        long m = n; // Use long to handle INT_MIN safely

        if (m < 0) {
            x = 1 / x;
            m = -m;
        }

        double result = 1;
        while (m > 0) {
            if (m % 2 == 1) {
                result *= x;
            }
            x *= x;
            m /= 2;
        }

        return result;
    }
};
```

**Time complexity:** O(log n)

**Space complexity:** O(1)