Link: https://leetcode.com/problems/product-of-array-except-self/description/

**My 1st solution**

```cpp
class Solution {
    public:
    vector<int> productExceptSelf(vector<int>& nums) {
        vector<int> answer(nums.size(), 1);

        for (int i = 0; i < nums.size(); i++) {
            for (int j =  0; j < nums.size(); j++) {
                if (j != i) {
                    answer[i] *= nums[j];
                }
            }
        }

        return answer;
    }
};
```

**Time complexity:** O($N^{2}$)

**Space complexity:** O(N)

This is **not** the optimized solution. I got TLE for this solution.

**My 2nd solution**

```cpp
class Solution {
public:
    vector<int> productExceptSelf(vector<int>& nums) {
        vector<int> answer(nums.size(), 1);
        int totalMultiple = 1;
        int zeroPresent = 0;

        for (int i = 0; i < nums.size(); i++) {
            if (nums[i] == 0) {
                zeroPresent++;
            } else {
                totalMultiple *= nums[i];
            }
        }

        for (int i = 0; i < nums.size(); i++) {
            if (zeroPresent > 1) {
                answer[i] = 0;
            } else if (zeroPresent == 1 && nums[i] != 0) {
                answer[i] = 0;
            } else if (zeroPresent == 1 && nums[i] == 0){
                answer[i] = totalMultiple;
            } else {
                answer[i] = totalMultiple / nums[i];
            }
        }

        return answer;
    }
};
```

**Time complexity:** O(N)

**Space complexity:** O(N)

This is the **optimized** solution, but using / operator is not allowed, but I did use it just to brainstorm.

**Optimized solution**

```cpp
class Solution {
public:
    vector<int> productExceptSelf(vector<int>& nums) {
        vector<int> forwardMultiplication;
        vector<int> backwardMultiplication = nums;

        forwardMultiplication.push_back(nums[0]);

        for (int i = 1; i < nums.size(); i++) {
            forwardMultiplication.push_back(forwardMultiplication[i - 1] * nums[i]);
        }

        backwardMultiplication[nums.size() - 1] = nums[nums.size() - 1];

        for (int i = nums.size() - 2; i >= 0; i--) {
            backwardMultiplication[i] = backwardMultiplication[i + 1] * nums[i];
        }

        vector<int> answer = nums;

        answer[0] = backwardMultiplication[1];
        answer[nums.size() - 1] = forwardMultiplication[forwardMultiplication.size() - 2]; 

        for (int i = 1; i < nums.size() - 1; i++) {
            answer[i] = forwardMultiplication[i - 1] * backwardMultiplication[i + 1];
        }

        return answer;
    }
};
```

**Time complexity:** O(N)

**Space complexity:** O(N)