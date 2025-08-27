Link: https://leetcode.com/problems/word-search/description/

I was not able to solve it. I was not able to pass all the test cases.


**Brute force



**

```cpp
class Solution {
public:
    bool dfs(vector<vector<char>>& board, vector<vector<bool>>& visited, string& word, int i, int j, int index) {
        if (index == word.size())
            return true;
        if (i < 0 || j < 0 || i >= board.size() || j >= board[0].size())
            return false;
        if (visited[i][j] || board[i][j] != word[index])
            return false;

        visited[i][j] = true;

        bool found = dfs(board, visited, word, i + 1, j, index + 1) ||
                     dfs(board, visited, word, i - 1, j, index + 1) ||
                     dfs(board, visited, word, i, j + 1, index + 1) ||
                     dfs(board, visited, word, i, j - 1, index + 1);

        visited[i][j] = false;
        return found;
    }

    bool exist(vector<vector<char>>& board, string word) {
        int m = board.size(), n = board[0].size();
        vector<vector<bool>> visited(m, vector<bool>(n, false));

        for (int i = 0; i < m; ++i) {
            for (int j = 0; j < n; ++j) {
                if (dfs(board, visited, word, i, j, 0))
                    return true;
            }
        }
        return false;
    }
};
```

**Time complexity:** O(m * n * $4^{L}$), where L = word.length, and each cell can branch in 4 directions.

**Space complexity:** O(m * n + L)

**Optimized solution**

```cpp
class Solution {
public:
    bool dfs(vector<vector<char>>& board, string word, int i, int j, int index) {
        if (index == word.size())
            return true;
        if (i < 0 || j < 0 || i >= board.size() || j >= board[0].size())
            return false;
        if (board[i][j] != word[index])
            return false;

        char temp = board[i][j];
        board[i][j] = '#'; // mark visited

        bool found = dfs(board, word, i + 1, j, index + 1) ||
                     dfs(board, word, i - 1, j, index + 1) ||
                     dfs(board, word, i, j + 1, index + 1) ||
                     dfs(board, word, i, j - 1, index + 1);

        board[i][j] = temp; // backtrack
        return found;
    }

    bool exist(vector<vector<char>>& board, string word) {
        for (int i = 0; i < board.size(); ++i) {
            for (int j = 0; j < board[0].size(); ++j) {
                if (dfs(board, word, i, j, 0))
                    return true;
            }
        }
        return false;
    }
};
```

**Time complexity:** O(m * n * $4^{L}$), where L = word.length, and each cell can branch in 4 directions.

**Space complexity:** O(L)