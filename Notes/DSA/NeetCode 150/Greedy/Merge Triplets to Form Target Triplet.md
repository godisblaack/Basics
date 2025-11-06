Link: https://leetcode.com/problems/merge-triplets-to-form-target-triplet/description/

I was not able to solve it.

**Greedy**

```cpp
class Solution {
public:
    bool mergeTriplets(vector<vector<int>>& triplets, vector<int>& target) {
        unordered_set<int> good;

        for (const auto& t : triplets) {
            if (t[0] > target[0] || t[1] > target[1] || t[2] > target[2]) {
                continue;
            }
            for (int i = 0; i < t.size(); i++) {
                if (t[i] == target[i]) {
                    good.insert(i);
                }
            }
        }
        return good.size() == 3;
    }
};
```

**Time complexity:** O(n)

**Space complexity:** O(1)

**Greedy (Optimal)**

```cpp
class Solution {
public:
    bool mergeTriplets(vector<vector<int>>& triplets, vector<int>& target) {
        bool x = false, y = false, z = false;
        for (const auto& t : triplets) {
            x |= (t[0] == target[0] && t[1] <= target[1] && t[2] <= target[2]);
            y |= (t[0] <= target[0] && t[1] == target[1] && t[2] <= target[2]);
            z |= (t[0] <= target[0] && t[1] <= target[1] && t[2] == target[2]);
            if (x && y && z) return true;
        }
        return false;
    }
};
```

**Time complexity:** O(n)

**Space complexity:** O(1)