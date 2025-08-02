Link: https://leetcode.com/problems/find-the-duplicate-number/description/

**My 1st solution**

```cpp
class Solution {
public:
    int findDuplicate(vector<int>& nums) {
        for (int i = 0; i < nums.size(); ++i) {
            for (int j = 0; j < nums.size(); ++j) {
                if (i != j && nums[i] == nums[j]) {
                    return nums[i];
                }
            }
        }

        return 0;
    }
};
```

**Time complexity:** O($N^{2}$)

**Space complexity:** O(1)

I got TLE for this solution.

**My 2nd solution**

```cpp
class Solution {
public:
    int findDuplicate(vector<int>& nums) {
        sort(nums.begin(), nums.end());

        for (int i = 0; i < nums.size() - 1; i++) {
            if (nums[i] == nums[i + 1]) {
                return nums[i];
            }
        }

        return -1;
    }
};
```

**Time complexity:** O(N log N)

**Space complexity:** O(1)

**Optimized solution - Floyd’s Tortoise and Hare (Cycle Detection)**

```cpp
class Solution {
public:
    int findDuplicate(vector<int>& nums) {
        int slow = nums[0];
        int fast = nums[0];

        do {
            slow = nums[slow];
            fast = nums[nums[fast]];
        } while (slow != fast);

        slow = nums[0];

        while (slow != fast) {
            slow = nums[slow];
            fast = nums[fast];
        }

        return slow;
    }
};
```

**Time complexity:** O(N)

**Space complexity:** O(1)