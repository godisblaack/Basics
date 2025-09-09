Link: https://neetcode.io/problems/islands-and-treasure  
https://leetcode.com/problems/walls-and-gates/description/

I was not able to solve it.

**Brute force - DFS solution**

```cpp
class Solution {
public:
    vector<vector<int>> directions = {{1, 0}, {-1, 0},
                                      {0, 1}, {0, -1}};
    int INF = 2147483647;
    vector<vector<bool>> visit;
    int ROWS, COLS;

    int dfs(vector<vector<int>>& grid, int r, int c) {
        if (r < 0 || c < 0 || r >= ROWS ||
            c >= COLS || grid[r][c] == -1 || visit[r][c]) {
            return INF;
        }
        if (grid[r][c] == 0) {
            return 0;
        }
        visit[r][c] = true;
        int res = INF;
        for (auto& dir : directions) {
            int cur = dfs(grid, r + dir[0], c + dir[1]);
            if (cur != INF) {
                res = min(res, 1 + cur);
            }
        }
        visit[r][c] = false;
        return res;
    }

    void islandsAndTreasure(vector<vector<int>>& grid) {
        ROWS = grid.size();
        COLS = grid[0].size();
        visit.assign(ROWS, vector<bool>(COLS, false));

        for (int r = 0; r < ROWS; ++r) {
            for (int c = 0; c < COLS; ++c) {
                if (grid[r][c] == INF) {
                    grid[r][c] = dfs(grid, r, c);
                }
            }
        }
    }
};
```

**Time complexity:** O(m * n * $4^{m * n}$)

**Space complexity:** O(m ∗ n)

**BFS solution** 

```cpp
class Solution {
    int rows;
    int columns;
    
    int INF = numeric_limits<int>::max();

    vector<vector<int>> directions = {{1, 0}, {-1, 0}, {0, -1}, {0, 1}};
    
public:
    int bfs(vector<vector<int>>& grid, int r, int c) {
        queue<pair<int, int>> q;
        q.push({r, c});

        vector<vector<bool>> visited(rows, vector<bool>(columns, false));
        visited[r][c] = true;

        int steps = 0;

        while (!q.empty()) {
            int size = q.size();
            
            for (int i = 0; i < size; i++) {
                auto [row, column] =  q.front();
                q.pop();

                if (grid[row][column] == 0) {
                    return steps;
                }

                for (auto& direction : directions) {
                    int nr = row + direction[0];
                    int nc = column + direction[1];

                    if (nr >= 0 && nr < rows && nc >= 0 && nc < columns && 
                        !visited[nr][nc] && grid[nr][nc] != -1) {
                        
                        visited[nr][nc] = true;

                        q.push({nr, nc});
                    }
                }
            }

            steps++;
        }

        return INF;
    }

    void islandsAndTreasure(vector<vector<int>>& grid) {
        rows = grid.size();
        columns = grid[0].size();

        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < columns; j++) {
                if (grid[i][j] == INF) {
                    grid[i][j] = bfs(grid, i, j);
                }
            }
        }
    }
};
```

**Time complexity:** O($(m * n)^{2}$)

**Space complexity:** O(m ∗ n)

**Optimized solution - Multi source BFS**

```cpp
class Solution {
public:
    void islandsAndTreasure(vector<vector<int>>& grid) {
        int m = grid.size();
        int n = grid[0].size();

        queue<pair<int, int>> q;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == 0) {
                    q.push({i, j});
                }
            }
        }

        vector<vector<int>> dirs = {{-1, 0}, {1, 0},
                                    {0, -1}, {0, 1}};
        while (!q.empty()) {
            int row = q.front().first;
            int col = q.front().second;
            q.pop();

            for (int i = 0; i < 4; i++) {
                int r = row + dirs[i][0];
                int c = col + dirs[i][1];

                if (r < 0 || r >= m || c < 0 ||
                    c >= n || grid[r][c] != INT_MAX) {
                    continue;
                }

                grid[r][c] = grid[row][col] + 1;
                q.push({r, c});
            }
        }
    }
};
```

**Time complexity:** O(m * n)

**Space complexity:** O(m ∗ n)