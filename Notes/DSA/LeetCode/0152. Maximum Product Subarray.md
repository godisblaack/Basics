Link: https://leetcode.com/problems/maximum-product-subarray/description/

**My solution**

```cpp
class Solution {
public:
    int maxProduct(vector<int>& nums) {
        if (nums.size() == 0) {
            return 0;
        } else if (nums.size() == 1) {
            return nums[0];
        }

        int negativeCount = 0;
        int zeroCount = 0;
        int positiveCount = 0;

        for (int i = 0; i < nums.size(); i++) {
            if (nums[i] < 0) {
                negativeCount++;
            } else if (nums[i] == 0) {
                zeroCount++;
            } else {
                positiveCount++;
            }
        }

        if (isOdd(negativeCount)) {
            return oddSet(nums, negativeCount, zeroCount, positiveCount);
        } else {
            return evenSet(nums, negativeCount, zeroCount, positiveCount);
        }
    }

    bool isOdd(int negativeCount) {
        if (negativeCount % 2 != 0) {
            return true;
        } else {
            return false;
        }
    }

    int oddSet(vector<int>& nums, int negativeCount, int zeroCount,
               int positiveCount) {
        int maxProduct = 1;

        if (negativeCount == 1 && zeroCount > 0 && positiveCount == 0) {
            maxProduct = 0;

            return maxProduct;
        } else if (negativeCount == 1 && zeroCount == 0 && positiveCount >= 0) {
            int product = 1;

            for (int i = 0; i < nums.size(); i++) {
                if (nums[i] < 0) {
                    product = 1;

                    continue;
                }

                product *= nums[i];

                if (product > maxProduct) {
                    maxProduct = product;
                }
            }
        } else if (negativeCount > 0 && zeroCount == 0 && positiveCount >= 0) {
            int product = 1;
            int firstNegative = 0;

            for (int i = 0; i < nums.size(); i++) {
                if (nums[i] < 0 && firstNegative == 0) {
                    firstNegative = 1;

                    product = 1;

                    continue;
                }

                if (nums[i] == 0) {
                    product = 1;

                    continue;
                }

                product *= nums[i];

                if (product > maxProduct) {
                    maxProduct = product;
                }
            }

            firstNegative = 0;
            product = 1;

            for (int i = nums.size() - 1; i >= 0; i--) {
                if (nums[i] < 0 && firstNegative == 0) {
                    firstNegative = 1;

                    product = 1;

                    continue;
                }

                if (nums[i] == 0) {
                    product = 1;

                    continue;
                }

                product *= nums[i];

                if (product > maxProduct) {
                    maxProduct = product;
                }
            }
        } else if (negativeCount > 0 && zeroCount > 0 && positiveCount >= 0) {
            int product = 1;

            for (int i = 0; i < nums.size(); i++) {
                if (nums[i] == 0) {
                    product = 1;

                    continue;
                }

                product *= nums[i];

                if (product > maxProduct) {
                    maxProduct = product;
                }
            }

            product = 1;

            for (int i = nums.size() - 1; i >= 0; i--) {
                if (nums[i] == 0) {
                    product = 1;

                    continue;
                }

                product *= nums[i];

                if (product > maxProduct) {
                    maxProduct = product;
                }
            }
        }

        return maxProduct;
    }

    int evenSet(vector<int>& nums, int negativeCount, int zeroCount,
                int positiveCount) {
        int maxProduct;

        if (zeroCount == 0) {
            maxProduct = 1;

            for (int i = 0; i < nums.size(); i++) {
                maxProduct *= nums[i];
            }
        } else if (zeroCount > 0 && positiveCount > 0) {
            maxProduct = 1;

            int product = 1;

            for (int i = 0; i < nums.size(); i++) {
                if (nums[i] == 0) {
                    product = 1;

                    continue;
                }

                product *= nums[i];

                if (product > maxProduct) {
                    maxProduct = product;
                }
            }

            product = 1;

            for (int i = nums.size() - 1; i >= 0; i--) {
                if (nums[i] == 0) {
                    product = 1;

                    continue;
                }

                product *= nums[i];

                if (product > maxProduct) {
                    maxProduct = product;
                }
            }
        } else if (zeroCount > 0) {
            maxProduct = 0;

            int product = 1;

            for (int i = 0; i < nums.size(); i++) {
                if (nums[i] == 0) {
                    product = 1;

                    continue;
                }

                product *= nums[i];

                if (product > maxProduct) {
                    maxProduct = product;
                }
            }

            maxProduct = 0;

            product = 1;

            for (int i = nums.size() - 1; i >= 0; i--) {
                if (nums[i] == 0) {
                    product = 1;

                    continue;
                }

                product *= nums[i];

                if (product > maxProduct) {
                    maxProduct = product;
                }
            }
        }
        return maxProduct;
    }
};
```

**Time complexity:** O(n)

**Space complexity:** O(1)

This is the **optimized** solution.

**Brute Force**

```cpp
class Solution {
public:
    int maxProduct(vector<int>& nums) {
        int res = nums[0];

        for (int i = 0; i < nums.size(); i++) {
            int cur = nums[i];
            res = max(res, cur);
            for (int j = i + 1; j < nums.size(); j++) {
                cur *= nums[j];
                res = max(res, cur);
            }
        }

        return res;
    }
};
```

**Time complexity:** O($2^{n}$)

**Space complexity:** O(1)

**Sliding Window**

```cpp
class Solution {
public:
    int maxProduct(vector<int>& nums) {
        vector<vector<int>> A;
        vector<int> cur;
        int res = INT_MIN;
        for (auto& num : nums) {
            res = max(res, num);
            if (num == 0) {
                if (!cur.empty()) A.push_back(cur);
                cur.clear();
            } else cur.push_back(num);
        }
        if (!cur.empty()) {
            A.push_back(cur);
        }

        for (auto& sub : A) {
            int negs = 0;
            for (auto& i : sub) {
                if (i < 0) negs++;
            }

            int prod = 1;
            int need = (negs % 2 == 0) ? negs : (negs - 1);
            negs = 0;
            for (int i = 0, j = 0; i < sub.size(); i++) {
                prod *= sub[i];
                if (sub[i] < 0) {
                    negs++;
                    while (negs > need) {
                        prod /= sub[j];
                        if (sub[j] < 0) negs--;
                        j++;
                    }
                }
                if (j <= i) res = max(res, prod);
            }
        }
        return res;
    }
};
```
**Time complexity:** O(n)

**Space complexity:** O(1)

**Kadane's Algorithm**

```cpp
class Solution {
public:
    int maxProduct(vector<int>& nums) {
        int res = nums[0];
        int curMin = 1, curMax = 1;

        for (int num : nums) {
            int tmp = curMax * num;
            curMax = max(max(num * curMax, num * curMin), num);
            curMin = min(min(tmp, num * curMin), num);
            res = max(res, curMax);
        }
        return res;
    }
};
```

**Time complexity:** O(n)

**Space complexity:** O(1)

**Prefix & Suffix**

```cpp
class Solution {
public:
    int maxProduct(vector<int>& nums) {
        int n = nums.size(), res = nums[0];
        int prefix = 0, suffix = 0;

        for (int i = 0; i < n; i++) {
            prefix = nums[i] * (prefix == 0 ? 1 : prefix);
            suffix = nums[n - 1 - i] * (suffix == 0 ? 1 : suffix);
            res = max(res, max(prefix, suffix));
        }
        return res;
    }
};
```

**Time complexity:** O(n)

**Space complexity:** O(1)