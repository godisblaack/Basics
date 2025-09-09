Link: https://leetcode.com/problems/surrounded-regions/description/

I was not able to solve it.

**DFS**

```cpp
class Solution {
    int rows;
    int columns;

public:
    void solve(vector<vector<char>>& board) {
        rows = board.size();
        columns = board[0].size();

        for (int r = 0; r < rows; r++) {
            if (board[r][0] == 'O') {
                capture(board, r, 0);
            }

            if (board[r][columns - 1] == 'O') {
                capture(board, r, columns - 1);
            }
        }

        for (int c = 0; c < columns; c++) {
            if (board[0][c] == 'O') {
                capture(board, 0, c);
            }

            if (board[rows - 1][c] == 'O') {
                capture(board, rows - 1, c);
            }
        }

        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < columns; j++) {
                if (board[i][j] == 'O') {
                    board[i][j] = 'X';
                } else if (board[i][j] == 'T') {
                    board[i][j] = 'O';
                }
            }
        }

        return;
    }

    void capture(vector<vector<char>>& board, int r, int c) {
        if (r < 0 || c < 0 || r >= rows || c >= columns || board[r][c] != 'O') {
            return;
        }

        board[r][c] = 'T';

        capture(board, r - 1, c);
        capture(board, r + 1, c);
        capture(board, r, c - 1);
        capture(board, r, c + 1);

        return;
    }
};
```

**Time complexity:** O(m∗n)

**Space complexity:** O(m∗n)

**BFS**

```cpp
class Solution {
    int ROWS, COLS;
    vector<pair<int, int>> directions = {{1, 0}, {-1, 0},
                                         {0, 1}, {0, -1}};

public:
    void solve(vector<vector<char>>& board) {
        ROWS = board.size();
        COLS = board[0].size();

        capture(board);

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (board[r][c] == 'O') {
                    board[r][c] = 'X';
                } else if (board[r][c] == 'T') {
                    board[r][c] = 'O';
                }
            }
        }
    }

private:
    void capture(vector<vector<char>>& board) {
        queue<pair<int, int>> q;
        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (r == 0 || r == ROWS - 1 ||
                    c == 0 || c == COLS - 1 &&
                    board[r][c] == 'O') {
                    q.push({r, c});
                }
            }
        }
        while (!q.empty()) {
            auto [r, c] = q.front();
            q.pop();
            if (board[r][c] == 'O') {
                board[r][c] = 'T';
                for (auto& direction : directions) {
                    int nr = r + direction.first;
                    int nc = c + direction.second;
                    if (nr >= 0 && nr < ROWS &&
                        nc >= 0 && nc < COLS) {
                        q.push({nr, nc});
                    }
                }
            }
        }
    }
};
```

**Time complexity:** O(m∗n)

**Space complexity:** O(m∗n)

**Disjoint union set**

```cpp
class DSU {
    vector<int> Parent, Size;

public:
    DSU(int n) {
        Parent.resize(n + 1);
        Size.resize(n + 1);
        for (int i = 0; i <= n; i++) {
            Parent[i] = i;
            Size[i] = 1;
        }
    }

    int find(int node) {
        if (Parent[node] != node) {
            Parent[node] = find(Parent[node]);
        }
        return Parent[node];
    }

    bool unionNodes(int u, int v) {
        int pu = find(u), pv = find(v);
        if (pu == pv) return false;
        if (Size[pu] >= Size[pv]) {
            Size[pu] += Size[pv];
            Parent[pv] = pu;
        } else {
            Size[pv] += Size[pu];
            Parent[pu] = pv;
        }
        return true;
    }

    bool connected(int u, int v) {
        return find(u) == find(v);
    }
};

class Solution {
public:
    void solve(vector<vector<char>>& board) {
        int ROWS = board.size(), COLS = board[0].size();
        DSU dsu(ROWS * COLS + 1);
        vector<vector<int>> directions = {{1, 0}, {-1, 0},
                                          {0, 1}, {0, -1}};

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (board[r][c] != 'O') continue;
                if (r == 0 || c == 0 ||
                    r == ROWS - 1 || c == COLS - 1) {
                    dsu.unionNodes(ROWS * COLS, r * COLS + c);
                } else {
                    for (auto& dir : directions) {
                        int nr = r + dir[0], nc = c + dir[1];
                        if (board[nr][nc] == 'O') {
                            dsu.unionNodes(r * COLS + c, nr * COLS + nc);
                        }
                    }
                }
            }
        }

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (!dsu.connected(ROWS * COLS, r * COLS + c)) {
                    board[r][c] = 'X';
                }
            }
        }
    }
};
```

**Time complexity:** O(m∗n)

**Space complexity:** O(m∗n)