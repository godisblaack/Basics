Link: https://leetcode.com/problems/search-a-2d-matrix/description/

**My 1st solution**

```cpp
class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        for (int i = 0; i < matrix.size(); i++) {
            for (int j = 0; j < matrix[0].size(); j++) {
                if (matrix[i][j] == target) {
                    return true;
                }
            }
        }

        return false;
    }
};
```

**Time complexity:** O($N^{2}$)

**Space complexity:** O(1)

This is **not** the optimized solution.

**My 2nd solution** 

```cpp
class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        for (int i = 0; i < matrix.size(); i++) {
            int* left = &matrix[i][0];
            int* right = &matrix[i][matrix[0].size() - 1];

            while (left <= right) {
                int* mid = left + ((right - left) / 2);

                if (*mid == target) {
                    return true;
                } else if (*mid > target) {
                    right = mid - 1;
                } else {
                    left = mid + 1;
                }
            }
        }

        return false;
    }
};
```

**Another way to write this solution**

```cpp
for (int i = 0; i < matrix.size(); i++) {
    int left = 0;
    int right = matrix[i].size() - 1;

    while (left <= right) {
        int mid = left + ((right - left) / 2);

        if (matrix[i][mid] == target) {
            return true;
        } else if (matrix[i][mid] > target) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
}
```

**Time complexity:** O(m log n)

**Space complexity:** O(1)

This is **not** the optimized solution.

**Optimized solution**

```cpp
class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        int rows = matrix.size();
        int columns = matrix[0].size();

        int left = 0;
        int right = rows * columns - 1;

        while (left <= right) {
            int mid = left + (right - left) / 2;
            int midValue = matrix[mid / columns][mid % columns];

            if (midValue == target)
                return true;
            else if (midValue < target)
                left = mid + 1;
            else
                right = mid - 1;
        }

        return false;
    }
};
```

**Time complexity:** O(log (m *n))

**Space complexity:** O(1)