Link: https://leetcode.com/problems/rotate-image/description/

**My solution**

```cpp
class Solution {
public:
    void rotate(vector<vector<int>>& matrix) {
        int size = matrix.size();

        for (int i = 0; i < size; i++) {
            for (int j = i + 1; j < size; j++) {
                swap(matrix[i][j], matrix[j][i]);
            }
        }

        for (int i = 0; i < size; i++) {
        for (int i = 0; i < size; i++) {
            for (int j = 0; j < size / 2; j++) {
                swap(matrix[i][j], matrix[i][size - 1 - j]);
            }
        }
    }
};
```

**Time complexity:** $O(n^{2})$

**Space complexity:** O(1)

This is the **optimized** solution.