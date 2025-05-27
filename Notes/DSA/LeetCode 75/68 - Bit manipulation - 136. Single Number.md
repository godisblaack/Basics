Link: https://leetcode.com/problems/single-number/description/

**My solution**

```cpp
class Solution {
public:
    int singleNumber(vector<int>& nums) {
        int singleNumber = 0;
        for (int value : nums) {
            singleNumber ^= value;
        }

        return singleNumber;
    }
};
```

**Time complexity:** O(N)

**Space complexity:** O(1)

This is the **optimized** solution. Take a look at two other approaches.

**Brute force**

```cpp
class Solution {
public:
    int singleNumber(std::vector<int>& nums) {
        for (int i = 0; i < nums.size(); ++i) {
            int count = 0;
            for (int j = 0; j < nums.size(); ++j) {
                if (nums[i] == nums[j]) {
                    count++;
                }
            }
            if (count == 1) {
                return nums[i];
            }
        }
        // Should not reach here based on the problem constraints
        return -1;
    }
};
```

**Time complexity:** O($N^{2}$)

**Space complexity:** O(1)

**Better approach**

```cpp
#include <unordered_map>

class Solution {
public:
    int singleNumber(std::vector<int>& nums) {
        std::unordered_map<int, int> counts;
        for (int num : nums) {
            counts[num]++;
        }
        for (auto const& [num, count] : counts) {
            if (count == 1) {
                return num;
            }
        }
        // Should not reach here
        return -1;
    }
};
```

**Time complexity:** O(N)

**Space complexity:** O(N)