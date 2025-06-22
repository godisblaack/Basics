Link: https://leetcode.com/problems/move-zeroes/description/

**My 1st solution**

```cpp
class Solution {
public:
    void moveZeroes(vector<int>& nums) {
        int* ptrZero = &nums[0];

        while (*ptrZero != 0 && ptrZero < &nums.back()) {
            *ptrZero++;
        }

        int* ptrSwap = ptrZero + 1;

        while (ptrSwap <= &nums.back()) {
            if(*ptrSwap != 0) {
                int temp = *ptrZero;
                *ptrZero = *ptrSwap;
                *ptrSwap = temp;

                while (*ptrZero != 0 && ptrZero < &nums.back()) {
                    ptrZero++;
                }
            }

            ptrSwap++;
        }
    }
};
```

**Time complexity:** O(N)  

**Space complexity:** O(1)

**My 2nd solution**

```cpp
class Solution {
public:
    void moveZeroes(vector<int>& nums) {
        if (nums.size() == 0 || nums.size() == 1) {
            return;
        }

        int i = 0;
        int j = 0;

        while (i < nums.size() && j < nums.size()) {
            while (nums[i] != 0 && i < nums.size()) {
                i++;

                if (i == nums.size()) {
                    break;
                }
            }

            while (nums[j] == 0 && j < nums.size()) {
                j++;

                if (j == nums.size()) {
                    break;
                }
            }

            if (i < j && i < nums.size() && j < nums.size() && nums[i] == 0 && nums[j] != 0) {
                nums[i] = nums[j];
                nums[j] = 0;
            } else {
                j++;
            }
        }
    }
};
```

**Time complexity:** O(N)

**Space complexity:** O(1)

Both the solutions are the **optimized** solution. There is another way to do it, which is as follows:

**Other solution by Gemini**

```cpp
class Solution {
public:
    void moveZeroes(vector<int>& nums) {
        int nonZeroIndex = 0;

        // Iterate through the array
        for (int i = 0; i < nums.size(); ++i) {
            if (nums[i] != 0) {
                // If the current element is not zero, move it to the front
                nums[nonZeroIndex] = nums[i];
                nonZeroIndex++;
            }
        }

        // Fill the remaining positions with zeros
        for (int i = nonZeroIndex; i < nums.size(); ++i) {
            nums[i] = 0;
        }
    }
};
```

**Time complexity:** O(N)

**Space complexity:** O(1)