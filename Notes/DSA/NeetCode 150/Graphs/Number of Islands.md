Link: https://leetcode.com/problems/number-of-islands/submissions/1752260715/

I was not able to solve it.

**Brute force**

```cpp
class Solution {
public:
    int m, n;
    int dx[4] = {1, -1, 0, 0};
    int dy[4] = {0, 0, 1, -1};

    void dfs(vector<vector<char>>& grid, int x, int y) {
        if (x < 0 || x >= m || y < 0 || y >= n || grid[x][y] == '0')
            return;
        grid[x][y] = '0'; // mark visited
        for (int dir = 0; dir < 4; dir++)
            dfs(grid, x + dx[dir], y + dy[dir]);
    }

    int numIslands(vector<vector<char>>& grid) {
        m = grid.size();
        n = grid[0].size();
        int count = 0;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == '1') {
                    count++;
                    dfs(grid, i, j);
                }
            }
        }
        return count;
    }
};
```

**Time complexity:** O($(mn)^{2}$)

**Space complexity:** O(mn) for visited + recursion stack up to O(mn) in worst case.

**Better solution - DFS/BFS with visited tracking**

```cpp
class Solution {
public:
    int m, n;
    vector<vector<bool>> vis;
    int dx[4] = {1, -1, 0, 0};
    int dy[4] = {0, 0, 1, -1};

    void dfs(vector<vector<char>>& grid, int x, int y) {
        vis[x][y] = true;
        for (int dir = 0; dir < 4; dir++) {
            int nx = x + dx[dir], ny = y + dy[dir];
            if (nx >= 0 && nx < m && ny >= 0 && ny < n && !vis[nx][ny] &&
                grid[nx][ny] == '1') {
                dfs(grid, nx, ny);
            }
        }
    }

    int numIslands(vector<vector<char>>& grid) {
        m = grid.size();
        n = grid[0].size();
        vis.assign(m, vector<bool>(n, false));
        int count = 0;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (!vis[i][j] && grid[i][j] == '1') {
                    count++;
                    dfs(grid, i, j);
                }
            }
        }
        return count;
    }
};
```

**Time complexity:** O(mn)

**Space complexity:** O(mn)

**Optimized Approach — In‑place DFS or BFS**

```cpp
class Solution {
public:
    int numIslands(vector<vector<char>>& grid) {
        int m = grid.size(), n = grid[0].size();
        int count = 0;
        int dx[4] = {1, -1, 0, 0};
        int dy[4] = {0, 0, 1, -1};

        auto bfs = [&](int sx, int sy) {
            queue<pair<int, int>> q;
            q.push({sx, sy});
            grid[sx][sy] = '0';
            while (!q.empty()) {
                auto [x, y] = q.front();
                q.pop();
                for (int dir = 0; dir < 4; dir++) {
                    int nx = x + dx[dir], ny = y + dy[dir];
                    if (nx >= 0 && nx < m && ny >= 0 && ny < n &&
                        grid[nx][ny] == '1') {
                        grid[nx][ny] = '0';
                        q.push({nx, ny});
                    }
                }
            }
        };

        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == '1') {
                    count++;
                    bfs(i, j);
                }
            }
        }
        return count;
    }
};
```

**Time complexity:** O(mn)

**Space complexity:** O(min(mn))