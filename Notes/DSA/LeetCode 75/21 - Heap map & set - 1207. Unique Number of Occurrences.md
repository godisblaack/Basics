Link: https://leetcode.com/problems/unique-number-of-occurrences/description/

**My solution**

```cpp
class Solution {
public:
    bool uniqueOccurrences(vector<int>& arr) {
        map<int, int> arrMap;

        for (int i = 0; i < arr.size(); i++) {
            arrMap[arr[i]]++;
        }

        for (auto& [key1, value1]: arrMap) {
            for (auto& [key2, value2]: arrMap) {
                if (key1 != key2) {
                    if (value1 == value2) {
                        return false;
                    }
                }
            }
        }

        return true;
    }
};
```

**Time complexity:** O($N_{2}$)

**Space complexity:** O(N)

This is **not** the optimized solution.

**Better solution**

```cpp
class Solution {
public:
    bool uniqueOccurrences(vector<int>& arr) {
        map<int, int> arrMap;

        for (auto it : arr) {
            arrMap[it]++;
        }

        set<int> s;
        
        for (auto it : arrMap) {
            s.insert(it.second);
        }

        if (s.size() == arrMap.size()) {
            return true;
        }

        return false;
    }
};
```

**Time Complexity**: O(N log N)

**Space Complexity**: O(N)

**Optimized solution**

```cpp
class Solution {
public:
    bool uniqueOccurrences(vector<int>& arr) {
        unordered_map<int, int> counts;

        for (int num : arr) {
            counts[num]++;
        }

        unordered_set<int> occurrences;

        for (const auto& pair : counts) {
            if (occurrences.count(pair.second)) {
                return false;
            }
            occurrences.insert(pair.second);
        }

        return true;
    }
};
```

**Time complexity:** O(N) on average, O($N_{2}$) in the worst case.

**Space complexity:** O(N)