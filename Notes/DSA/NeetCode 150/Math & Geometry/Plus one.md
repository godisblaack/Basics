Link: https://leetcode.com/problems/plus-one/description/

I was not able to solve it.

**Iteration**

```cpp
class Solution {
public:
    vector<int> plusOne(vector<int>& digits) {
        for (int i = digits.size() - 1; i >= 0; i--) {
            if (digits[i] < 9) {
                digits[i]++;

                return digits;
            }

            digits[i] = 0;
        }

        digits.insert(digits.begin(), 1);

        return digits;
    }
};
```

**Time complexity:** O(n)

**Space complexity:** O(n)