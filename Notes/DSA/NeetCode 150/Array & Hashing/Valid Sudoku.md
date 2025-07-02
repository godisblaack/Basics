Link: https://leetcode.com/problems/valid-sudoku/description/

**My solution**

```cpp
class Solution {
public:
    bool isValidSudoku(vector<vector<char>>& board) {
        vector<unordered_map<char, int>> row(9);
        vector<unordered_map<char, int>> column(9);
        vector<unordered_map<char, int>> subBox(9);

        for (int i = 0; i < 9; i++) {
            for (int j = 0; j < 9; j++) {
                char value = board[i][j];

                if (value == '.') {
                    continue;
                }

                int subBoxIndex = (i / 3) * 3 + (j / 3);

                if (++row[i][value] > 1 || ++column[j][value] > 1 || ++subBox[subBoxIndex][value] > 1) {
                    return false;
                }
            }
        }

        return true;
    }
};
```

**Time complexity:** O(1)

**Space complexity:** O(1)

This is the **optimized** solution. I was not able to come up with the `subBoardIndex` logic.