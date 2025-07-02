Link: https://leetcode.com/problems/contains-duplicate/description/

**My 1st solution**

```cpp
class Solution {
public:
    bool containsDuplicate(vector<int>& nums) {
        sort (nums.begin(), nums.end());

        for (int i = 0; i < nums.size() - 1; i++) {
            if (nums[i] == nums[i + 1]) {
                return true;
            }
        }

        return false;
    }
};
```

**Time complexity:** O(N log N)

**Space complexity:** O(1), extra space is O(1) assuming in-place sorting.

This is **not** the optimal solution.

**My 2nd solution**

```cpp
class Solution {
public:
    bool containsDuplicate(vector<int>& nums) {
        unordered_map<int, int> count;

        for (int num : nums) {
            count[num]++;

            if(count[num] > 1) {
                return true;
            }
        }

        return false;
    }
};
```

**Time complexity:** O(N)

**Space complexity:** O(N)

This is **not** the optimal solution.

**Optimal solution**

```cpp
class Solution {
public:
    bool containsDuplicate(vector<int>& nums) {
        unordered_set<int> seen;
        for (int num : nums) {
            if (seen.count(num)) return true;
            seen.insert(num);
        }
        return false;
    }
};
```

**Time complexity:** O(N)

**Space complexity:** O(N)