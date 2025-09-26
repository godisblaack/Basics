Link: https://leetcode.com/problems/house-robber/description/

**My solution**

```cpp
class Solution {
public:
    int rob(vector<int>& nums) {
        if (nums.size() == 0) {
            return 0;
        } else if (nums.size() == 1) {
            return nums[0];
        } else if (nums.size() == 2) {
            return max(nums[0], nums[1]);
        }

        return totalMoney(nums);
    }

    int totalMoney(vector<int>& nums) {
        vector<int> money;

        money.push_back(nums[0]);
        money.push_back(nums[1]);
        money.push_back(nums[0] + nums[2]);

        for (int i = 3; i < nums.size(); i++) {
            money.push_back(nums[i] + max(money[i - 2], money[i - 3]));
        }

        return *max_element(money.begin(), money.end());
    }
};
```

**Time complexity:** O(N)

**Space complexity:** O(N)

This is **not** the optimized solution.

**My 2nd solution** 

```cpp
class Solution {
public:
    int rob(vector<int>& nums) {
        if (nums.size() == 0) {
            return 0;
        } else if (nums.size() == 1) {
            return nums[0];
        } else if (nums.size() == 2) {
            return max(nums[0], nums[1]);
        }

        int first = nums[0];
        int second = nums[1];
        int third = nums[0] + nums[2];

        for (int i = 3; i < nums.size(); i++) {
            int current = nums[i] + max(first, second);

            first = second;
            second = third;
            third = current;
        }

        return max(second, third);
    }
};
```

**Time complexity:** O(N)

**Space complexity:** O(1)

This is the **optimized** solution.