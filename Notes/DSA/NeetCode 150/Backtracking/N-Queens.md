Link: https://leetcode.com/problems/n-queens/description/

I was not able to solve it.

**Backtracking solution**

```cpp
class Solution {
public:
    vector<vector<string>> solveNQueens(int boardSize) {
        vector<string> currentBoard(boardSize, string(boardSize, '.'));
        vector<vector<string>> allSolutions;

        vector<bool> columnOccupied(boardSize, false);
        vector<bool> diagonalLeftToRight(2 * boardSize - 1, false);  // row + col
        vector<bool> diagonalRightToLeft(2 * boardSize - 1, false);  // row - col + boardSize - 1

        placeQueens(boardSize, 0, currentBoard, allSolutions, columnOccupied, diagonalLeftToRight, diagonalRightToLeft);
        return allSolutions;
    }

    void placeQueens(int boardSize, int currentRow, vector<string>& currentBoard,
                     vector<vector<string>>& allSolutions,
                     vector<bool>& columnOccupied,
                     vector<bool>& diagonalLeftToRight,
                     vector<bool>& diagonalRightToLeft) {
        if (currentRow == boardSize) {
            allSolutions.push_back(currentBoard);
            return;
        }

        for (int currentColumn = 0; currentColumn < boardSize; ++currentColumn) {
            if (columnOccupied[currentColumn] ||
                diagonalLeftToRight[currentRow + currentColumn] ||
                diagonalRightToLeft[currentRow - currentColumn + boardSize - 1]) {
                continue;
            }

            currentBoard[currentRow][currentColumn] = 'Q';
            columnOccupied[currentColumn] = true;
            diagonalLeftToRight[currentRow + currentColumn] = true;
            diagonalRightToLeft[currentRow - currentColumn + boardSize - 1] = true;

            placeQueens(boardSize, currentRow + 1, currentBoard, allSolutions,
                        columnOccupied, diagonalLeftToRight, diagonalRightToLeft);

            currentBoard[currentRow][currentColumn] = '.';
            columnOccupied[currentColumn] = false;
            diagonalLeftToRight[currentRow + currentColumn] = false;
            diagonalRightToLeft[currentRow - currentColumn + boardSize - 1] = false;
        }
    }
};
```

**Time complexity:** O(N!)

**Space complexity:** O($N^{2}$ + N)