Link: https://leetcode.com/problems/happy-number/description/

**My solution**

```cpp
class Solution {
public:
    bool isHappy(int n) {
        if (n == 1) {
            return true;
        }

        set<int> seen;


        while (true) {
            if (seen.find(n) != seen.end()) {
                return false;
            }

            seen.insert(n);

            int sum = 0;

            while (n != 0) {
                int digit = n % 10;

                sum += digit * digit;

                n /= 10;
            }

            n = sum;

            if (n == 1) {
                return true;
            }
        }


        return false;
    }
};
```

**Time complexity:** O(k log n) $\approx$ O(log n)

**Space complexity:** O(k) $\approx$ O(1), as the largest value of k is 243.
