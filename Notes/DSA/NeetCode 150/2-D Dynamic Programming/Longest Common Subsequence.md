Link: https://leetcode.com/problems/longest-common-subsequence/description/

I was not able to solve it. I was not able to think of all the conditions.

**Top-Down solution**

```cpp
class Solution {
public:
    int longestCommonSubsequence(string text1, string text2) {
        int m = text1.size();
        int n = text2.size();

        // Initialize memoization table with -1
        vector<vector<int>> dp(m + 1, vector<int>(n + 1, -1));

        return lcs(text1, text2, m, n, dp);
    }

private:
    // Recursive function with memoization
    int lcs(const string& text1, const string& text2, int i, int j, vector<vector<int>>& dp) {
        // Base case: if either string is empty
        if (i == 0 || j == 0) return 0;

        // If already computed, return stored result
        if (dp[i][j] != -1) return dp[i][j];

        // If characters match, include them and move diagonally
        if (text1[i - 1] == text2[j - 1]) {
            return dp[i][j] = 1 + lcs(text1, text2, i - 1, j - 1, dp);
        }

        // Otherwise, take the max by skipping one character from either string
        return dp[i][j] = max(
            lcs(text1, text2, i - 1, j, dp),
            lcs(text1, text2, i, j - 1, dp)
        );
    }
};
```

**Time complexity:** O(Row * Column)

**Space complexity:** O(Row * Column)

**Bottom-Up with space optimization**

```cpp
class Solution {
public:
    int longestCommonSubsequence(string text1, string text2) {
        int m = text1.size(), n = text2.size();
        vector<int> prev(n + 1, 0), curr(n + 1, 0);

        for (int i = 1; i <= m; ++i) {
            for (int j = 1; j <= n; ++j) {
                if (text1[i - 1] == text2[j - 1])
                    curr[j] = 1 + prev[j - 1];
                else
                    curr[j] = max(prev[j], curr[j - 1]);
            }
            swap(prev, curr);
        }

        return prev[n];
    }
};
```

**Time complexity:** O(Row * Column)

**Space complexity:** O(Row)