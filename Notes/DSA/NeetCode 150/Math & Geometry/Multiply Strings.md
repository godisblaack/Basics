Link: https://leetcode.com/problems/multiply-strings/description/


I was not able to solve it. I was not able to pass all the testcase, due to the limit of unsigned long long, which I was using in my solution.

**Multiplication**

```cpp
class Solution {
public:
    string multiply(string num1, string num2) {
        int len1 = num1.size(), len2 = num2.size();
        vector<int> result(len1 + len2, 0);

        for (int i = len1 - 1; i >= 0; i--) {
            for (int j = len2 - 1; j >= 0; j--) {
                int mul = (num1[i] - '0') * (num2[j] - '0');
                int sum = mul + result[i + j + 1];

                result[i + j + 1] = sum % 10;
                result[i + j] += sum / 10;
            }
        }

        string product = "";
        for (int digit : result) {
            if (!(product.empty() && digit == 0)) {
                product += to_string(digit);
            }
        }

        return product.empty() ? "0" : product;
    }
};
```

**Time complexity:** O(m * n), where m is the length of num1, and n is the length of num2.

**Space complexity:** O(m + n)

This is the **optimized** solution.