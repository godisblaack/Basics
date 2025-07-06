Link: https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/description/

**My solution**

```cpp
class Solution {
public:
    vector<int> twoSum(vector<int>& numbers, int target) {
        int left = 0;
        int right = numbers.size() - 1;

        vector<int> pair;

        while (left < right) {
            if (numbers[left] + numbers[right] == target) {
                pair.push_back(left + 1);
                pair.push_back(right + 1);

                break;
            } else if (numbers[left] + numbers[right] < target) {
                if (numbers[left] < numbers[right]) {
                    left++;
                } else {
                    right--;
                }
            } else {
                if (numbers[left] > numbers[right]) {
                    left++;
                } else {
                    right--;
                }
            }
        }

        return pair;
    }
};
```

**Time complexity:** O(N)

**Space complexity:** O(1)

This is the **optimized** solution. I have not used the fact that the given array is sorted in non-decreasing order.

**My 2nd solution**

```cpp
class Solution {
public:
    vector<int> twoSum(vector<int>& numbers, int target) {
        int left = 0;
        int right = numbers.size() - 1;

        vector<int> pair;

        while (left < right) {
            if (numbers[left] + numbers[right] == target) {
                pair.push_back(left + 1);
                pair.push_back(right + 1);

                break;
            } else if (numbers[left] + numbers[right] < target) {
                left++;
            } else {
                right--;
            }
        }

        return pair;
    }
};
```

**Time complexity:** O(N)

**Space complexity:** O(1)