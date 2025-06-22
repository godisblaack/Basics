Link: https://leetcode.com/problems/equal-row-and-column-pairs/description/

**My solution**

```cpp
class Solution {
public:
    int equalPairs(vector<vector<int>>& grid) {
        int count = 0;

        for (int i = 0; i < grid.size(); i++) {
            for (int j = 0; j < grid.size(); j++) {
                for (int k = 0; k < grid.size(); k++) {
                    if (grid[i][k] != grid[k][j]) {
                        break;
                    }

                    if (k == grid.size() - 1) {
                        count++;
                    }
                }
            }
        }

        return count;     
    }
};
```

**Time complexity:** O($N^{3}$)

**Space complexity:** O(1)

This is **not** the optimized solution.

**Best average case solution**

```cpp
struct VectorHasher {
    size_t operator()(const std::vector<int>& v) const {
        size_t hash = v.size();
        for (int i : v) {
            hash ^= i + 0x9e3779b9 + (hash << 6) + (hash >> 2); // A simple combined hash
        }
        return hash;
    }
};

class Solution {
public:
    int equalPairs(vector<vector<int>>& grid) {
        int n = grid.size();
        int count = 0;
        // Use unordered_map with a custom hash for vector<int>
        std::unordered_map<std::vector<int>, int, VectorHasher> rowCounts;

        // Populate rowCounts map
        for (const auto& row : grid) {
            rowCounts[row]++; // Average O(N) for hashing and insertion
        }

        // Process columns and count equal pairs
        for (int j = 0; j < n; ++j) {
            std::vector<int> col;
            for (int i = 0; i < n; ++i) {
                col.push_back(grid[i][j]); // O(N) to build column
            }
            count += rowCounts[col]; // Average O(N) for hashing and lookup
        }

        return count;
    }
};
```

**Time complexity:** O($N^{2}$) on average, O($N^{3}$) in worst case.

**Space complexity:** O($N^{2}$)

**Optimized solution**

```cpp
class Solution {
public:
    int equalPairs(vector<vector<int>>& grid) {
        int n = grid.size();
        int count = 0;
        map<vector<int>, int> rowCounts;

        for (const auto& row : grid) {
            rowCounts[row]++;
        }

        for (int j = 0; j < n; ++j) {
            vector<int> col;
            for (int i = 0; i < n; ++i) {
                col.push_back(grid[i][j]);
            }
            count += rowCounts[col];
        }

        return count;
    }
};

/*
When you try to access a key in a std::map using the [] operator (like rowCounts[col]) and that key (col in this case) does not exist in the map:

    The map will insert a new key-value pair.
    The new key will be col (the value you tried to access).
    The associated value for this new key will be the default-constructed value of the map's value type. In your case, the value type of rowCounts is int, so the default-constructed value is 0.

Therefore, rowCounts[col] will not throw an error or return some special "not found" indicator. Instead, it will:

    If col already exists as a key, return the current integer value associated with it.
    If col does not exist, insert a new entry with col as the key and 0 as the value, and then return 0.

If you pass the same col again to rowCounts[col] after it has already been inserted (either because that column was also a row, or because you accessed it when it wasn't a row), the map will not automatically increment the value.

The [] operator in std::map either:

    Returns a reference to the existing value associated with the key if the key is already present.
    Inserts a new key-value pair (with the default-constructed value) and returns a reference to this newly inserted value if the key is not present.
*/
```

**Time complexity:** O($N^{2}$ log N)

**Space complexity:** O($N^{2}$)