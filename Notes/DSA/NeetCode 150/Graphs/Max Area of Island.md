Link: https://leetcode.com/problems/max-area-of-island/submissions/1753397196/

**My solution**

```cpp
class Solution {
public:
    int maxArea = 0;

    int rows = 0;
    int columns = 0;

    int dx[4] = {-1, 0, 0, 1};
    int dy[4] = {0, -1, 1, 0};
    
    int maxAreaOfIsland(vector<vector<int>>& grid) {
        rows = grid.size();
        columns = grid[0].size();

        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < columns; j++) {
                if (grid[i][j] == 1) {
                    bfs(grid, i, j);
                }
            }
        }

        return maxArea;
    }

    void bfs(vector<vector<int>>& grid, int px, int py) {
        int currentArea = 0;

        queue<pair<int, int>> q;
        q.push({px, py});

        grid[px][py] = 0;

        while (!q.empty()) {
            auto[x, y] = q.front();
            q.pop();

            currentArea++;

            for(int direction = 0; direction < 4; direction++) {
                int nx = x + dx[direction];
                int ny = y + dy[direction];

                if (nx >= 0 && ny >= 0 && nx < rows && ny < columns && grid[nx][ny] == 1) {
                    grid[nx][ny] = 0;

                    q.push({nx, ny});
                }
            }
        }

        maxArea = max(maxArea, currentArea);
    }

};
```

**Time complexity:** O(m * n)

**Space complexity:** O(m * n)