Link: https://leetcode.com/problems/rotting-oranges/description/

**My solution**

```cpp
class Solution {
public:
    int orangesRotting(vector<vector<int>>& grid) {
        int minute = 0;

        int flag = 1;
        while (flag == 1) {
            vector<vector<int>> tempGrid = grid;

            flag = 0;

            for (int i = 0; i < grid.size(); i++) {
                for (int j = 0; j < grid[0].size(); j++) {
                    if (grid[i][j] == 2) {
                        if (i - 1 >= 0 && grid[i - 1][j] == 1) {
                            tempGrid[i - 1][j] = 2;
                            flag = 1;
                        }

                        if (i + 1 < grid.size() && grid[i + 1][j] == 1) {
                            tempGrid[i + 1][j] = 2;
                            flag = 1;
                        }

                        if (j - 1 >= 0 && grid[i][j - 1] == 1) {
                            tempGrid[i][j - 1] = 2;
                            flag = 1;
                        }

                        if (j + 1 < grid[0].size() && grid[i][j + 1] == 1) {
                            tempGrid[i][j + 1] = 2;
                            flag = 1;
                        }
                    }
                }
            }

            grid = tempGrid;
            
            if (flag == 1) {
                minute++;
            }
        }

        for (int i = 0; i < grid.size(); i++) {
            for (int j = 0; j < grid[0].size(); j++) {
                if (grid[i][j] == 1) {
                    minute = -1;
                    break;
                }
            }
        }

        return minute;
    }
};
```

**Time complexity:** O($M^{2} N^{2}$)

**Space complexity:** O(M N)

This is **not** the optimized solution.

**Optimized solution**

```cpp
class Solution {
public:
    int orangesRotting(vector<vector<int>>& grid) {
        int m = grid.size(), n = grid[0].size();
        queue<pair<int, int>> q;
        int freshCount = 0, minutes = 0;

        // Initialize queue with rotten oranges and count fresh ones
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == 2)
                    q.push({i, j});
                if (grid[i][j] == 1)
                    freshCount++;
            }
        }

        vector<pair<int, int>> directions = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};

        while (!q.empty() && freshCount > 0) {
            int size = q.size();
            while (size--) {
                auto [x, y] = q.front();
                q.pop();

                for (auto [dx, dy] : directions) {
                    int nx = x + dx, ny = y + dy;
                    if (nx >= 0 && ny >= 0 && nx < m && ny < n &&
                        grid[nx][ny] == 1) {
                        grid[nx][ny] = 2;
                        q.push({nx, ny});
                        freshCount--;
                    }
                }
            }
            minutes++;
        }

        return freshCount == 0 ? minutes : -1;
    }
};
```

**Time complexity:** O(M N)

**Space complexity:** O(M N)