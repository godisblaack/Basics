Link: https://leetcode.com/problems/edit-distance/description/

I was not able to solve it. I watched a video and coded it myself.

**Recursive solution**

```cpp
class Solution {
public:
    int minDistance(string word1, string word2) {
        int word1Size = word1.size();
        int word2Size = word2.size();
        
        int word1Pointer = word1Size - 1;
        int word2Pointer = word2Size - 1;

        return editDistance(word1, word2, word1Size, word2Size, word1Pointer, word2Pointer);
    }

    int editDistance(string& word1, string& word2, int word1Size, int word2Size, 
                     int word1Pointer, int word2Pointer) {
        if (word1Pointer < 0) {
            return word2Pointer + 1;
        } else if (word2Pointer < 0) {
            return word1Pointer + 1;
        }

        if (word1[word1Pointer] == word2[word2Pointer]) {
            return editDistance(word1, word2, word1Size, word2Size, word1Pointer - 1, word2Pointer - 1);
        } else{
            return 1 + min(
                editDistance(word1, word2, word1Size, word2Size, word1Pointer, word2Pointer - 1),
                min(
                    editDistance(word1, word2, word1Size, word2Size, word1Pointer - 1, word2Pointer),
                    editDistance(word1, word2, word1Size, word2Size, word1Pointer - 1, word2Pointer - 1)
                    )
                );
        }
    }
};
```

**Time complexity:** O($3^{max(word1 size, word2 size)}$)

**Space complexity:** O(word1 size + word2 size)

This is **not** the optimized solution.

**Buttom-Up solution**

```cpp
class Solution {
public:
    int minDistance(string word1, string word2) {
        int word1Size = word1.size();
        int word2Size = word2.size();
        
        int word1Pointer = word1Size - 1;
        int word2Pointer = word2Size - 1;

        vector<vector<int>> dp(word1Size, vector<int>(word2Size, -1));

        return editDistance(word1, word2, word1Size, word2Size, dp, word1Pointer, word2Pointer);
    }

    int editDistance(string& word1, string& word2, int word1Size, int word2Size, 
                     vector<vector<int>>& dp, int word1Pointer, int word2Pointer) {
        if (word1Pointer < 0) {
            return word2Pointer + 1;
        } else if (word2Pointer < 0) {
            return word1Pointer + 1;
        }

        if (dp[word1Pointer][word2Pointer] != -1) {
            return dp[word1Pointer][word2Pointer];
        }

        if (word1[word1Pointer] == word2[word2Pointer]) {
            return dp[word1Pointer][word2Pointer] = 
                   editDistance(word1, word2, word1Size, word2Size, dp, word1Pointer - 1, word2Pointer - 1);
        } else{
            return dp[word1Pointer][word2Pointer] = 
                   1 + min(
                editDistance(word1, word2, word1Size, word2Size, dp, word1Pointer, word2Pointer - 1),
                min(
                    editDistance(word1, word2, word1Size, word2Size, dp, word1Pointer - 1, word2Pointer),
                    editDistance(word1, word2, word1Size, word2Size, dp, word1Pointer - 1, word2Pointer - 1)
                    )
                );
        }

        return dp[word1Pointer][word2Pointer];
    }
};
```

**Time complexity:** O(word1 size * word2 size)

**Space complexity:** O(word1 size * word2 size)

This is **not** the optimized solution.

**Optimized solution**

```cpp
class Solution {
public:
    int minDistance(string word1, string word2) {
        int m = word1.size(), n = word2.size();
        vector<int> prev(n + 1), curr(n + 1);

        // Initialize base case: converting empty word1 to word2
        for (int j = 0; j <= n; ++j) {
            prev[j] = j;
        }

        for (int i = 1; i <= m; ++i) {
            curr[0] = i;
            for (int j = 1; j <= n; ++j) {
                if (word1[i - 1] == word2[j - 1]) {
                    curr[j] = prev[j - 1];
                } else {
                    curr[j] = 1 + min({ prev[j], curr[j - 1], prev[j - 1] });
                }
            }
            swap(prev, curr);
        }

        return prev[n];
    }
};
```

**Time complexity:** O(word1 size * word2 size)

**Space complexity:** O(word2 size)