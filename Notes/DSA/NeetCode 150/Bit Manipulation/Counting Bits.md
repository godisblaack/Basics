Link: https://leetcode.com/problems/counting-bits/description/

**My solution**

```cpp
class Solution {
public:
    vector<int> countBits(int n) {
        vector<int> bitCount;

        for (int i = 0; i <= n; i++) {
            int count = 0;

            int tempi = i;

            while (tempi != 0) {
                int temp = tempi & 1;

                tempi >>= 1;

                if (temp) {
                    count++;
                }
            }
                
            bitCount.push_back(count);
        }

        return bitCount;
    }
};
```

**Time complexity:** O(n log n)

**Space complexity:** O(n)

This is **not** the optimized solution.

**Bit Manipulation**

```cpp
class Solution {
public:
    vector<int> countBits(int n) {
        vector<int> dp(n + 1);
        for (int i = 1; i <= n; i++) {
            dp[i] = dp[i >> 1] + (i & 1);
        }
        return dp;
    }
};
```

**Time complexity:** O(n)

**Space complexity:** O(n)