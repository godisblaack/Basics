Link: https://leetcode.com/problems/nearest-exit-from-entrance-in-maze/description/

I was not able to solve it. I was not able to pass all the test cases.

**BFS solution**

```cpp
class Solution {
public:
    int nearestExit(std::vector<std::vector<char>>& maze, std::vector<int>& entrance) {
        int m = maze.size();
        int n = maze[0].size();

        std::queue<std::tuple<int, int, int>> q; // Stores {row, col, steps}
        std::vector<std::vector<bool>> visited(m, std::vector<bool>(n, false));

        // Directions for moving (up, down, left, right)
        int dr[] = {-1, 1, 0, 0};
        int dc[] = {0, 0, -1, 1};

        // Push the entrance into the queue
        q.push(std::make_tuple(entrance[0], entrance[1], 0));
        visited[entrance[0]][entrance[1]] = true;

        while (!q.empty()) {
            auto [currentRow, currentCol, currentSteps] = q.front();
            q.pop();

            // Check if current cell is an exit (border cell) AND not the entrance itself
            if ((currentRow == 0 || currentRow == m - 1 || currentCol == 0 || currentCol == n - 1) &&
                !(currentRow == entrance[0] && currentCol == entrance[1])) {
                return currentSteps; // Found the nearest exit
            }

            // Explore neighbors
            for (int i = 0; i < 4; ++i) {
                int nextRow = currentRow + dr[i];
                int nextCol = currentCol + dc[i];

                // Check boundary conditions and if it's an empty cell and not visited
                if (nextRow >= 0 && nextRow < m &&
                    nextCol >= 0 && nextCol < n &&
                    maze[nextRow][nextCol] == '.' &&
                    !visited[nextRow][nextCol]) {
                    
                    visited[nextRow][nextCol] = true;
                    q.push(std::make_tuple(nextRow, nextCol, currentSteps + 1));
                }
            }
        }

        // If the queue becomes empty and no exit was found
        return -1;
    }
};
```

**Time complexity:** O(M N) 

**Space complexity:** O(M N) 

**DFS solution**

```cpp
class Solution {
public:
    int minSteps = INT_MAX; // Store shortest path length

    void dfs(vector<vector<char>>& maze, int x, int y, int steps) {
        if (x < 0 || y < 0 || x >= maze.size() || y >= maze[0].size() || maze[x][y] == '+') return;

        // Check if it's a border exit (not entrance)
        if ((x == 0 || y == 0 || x == maze.size() - 1 || y == maze[0].size() - 1) && steps > 0) {
            minSteps = min(minSteps, steps);
            return;
        }

        // Mark the cell visited
        maze[x][y] = '+';

        // Explore all directions
        dfs(maze, x + 1, y, steps + 1);
        dfs(maze, x - 1, y, steps + 1);
        dfs(maze, x, y + 1, steps + 1);
        dfs(maze, x, y - 1, steps + 1);

        // Unmark to allow other paths
        maze[x][y] = '.';
    }

    int nearestExit(vector<vector<char>>& maze, vector<int>& entrance) {
        dfs(maze, entrance[0], entrance[1], 0);
        return (minSteps == INT_MAX) ? -1 : minSteps;
    }
};
```

**Time complexity:** O($4^{M N}$) 

**Space complexity:** O(M N) 