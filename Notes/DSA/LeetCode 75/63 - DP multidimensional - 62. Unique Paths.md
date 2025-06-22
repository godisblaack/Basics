Link: https://leetcode.com/problems/unique-paths/description/

I was not able to solve it. My approach was right but the condition check was wrong.

**Recursive + Memoization (Top-Down DP) solution**

```cpp
class Solution {
public:
    int uniquePaths(int m, int n) {
       vector<vector<int>> dp(m, vector<int>(n, -1));

        return paths(m, n, dp, 0, 0);
    }

    int paths(int m, int n, vector<vector<int>>& dp, int row, int column) {
        if (row >= m || column >= n) {
            return 0;
        }

        if (row == m - 1 && column == n - 1) {
            return 1;
        }

        if (dp[row][column] != -1) {
            return dp[row][column];
        }
         return dp[row][column] = paths(m, n, dp, row, column + 1) +
                                  paths(m, n, dp, row + 1, column);
    }
};
```

**Time complexity:** O(Row * Column)

**Space complexity:** O(Row * Column) + O(Row + Column)

This is **not** the optimized solution.

**Bottom-Up DP with space optimized**

```cpp
class Solution {
public:
    int uniquePaths(int m, int n) {
        vector<int> dp(n, 1);
        for (int i = 1; i < m; ++i) {
            for (int j = 1; j < n; ++j) {
                dp[j] += dp[j - 1];
            }
        }
        return dp[n - 1];
    }
};
```

**Time complexity:** O(Row * Column)

**Space complexity:** O(N)

This is **not** the optimized solution.

**Optimized solution**

```cpp
class Solution {
public:
    int uniquePaths(int m, int n) {
        long long res = 1;
        for (int i = 1; i <= min(m - 1, n - 1); ++i) {
            res = res * (m + n - 1 - i) / i;
        }
        return static_cast<int>(res);
    }
};
```

**Time complexity:** O(min(Row * Column))

**Space complexity:** O(1)

**Formula:** $\binom{m+n-2}{m-1} = \frac{(m+n-2)!}{(m-1)!(n-1)!}$