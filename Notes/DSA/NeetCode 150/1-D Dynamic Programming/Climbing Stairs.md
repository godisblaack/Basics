Link: https://leetcode.com/problems/climbing-stairs/description/

**My solution**

```cpp
class Solution {
public:
    int possibility = 0;

    int climbStairs(int n) {
        dp(0, n);

        return possibility;
    }

    void dp(int nextStep, int target) {
        if (nextStep == target) {
            possibility++;

            return;
        }

        if (nextStep > target) {
            return;
        }

        dp(nextStep + 1, target);
        dp(nextStep + 2, target);
    }
};
```

**Time complexity:** O($2^{n}$)

**Space complexity:** O(n)

I got **TLE** for this solution. I was **not** able to optimize it.

**Recursion**
```cpp
class Solution {
public:
    int climbStairs(int n) {
        return dfs(n, 0);
    }

    int dfs(int n, int i) {
        if (i >= n) return i == n;
        return dfs(n, i + 1) + dfs(n, i + 2);
    }
};
```

**Time complexity:** O($2^{n}$)

**Space complexity:** O(n)

**Dynamic Programming (Top-Down)**
```cpp
class Solution {
public:
    vector<int> cache;
    int climbStairs(int n) {
        cache.resize(n, -1);
        return dfs(n, 0);
    }

    int dfs(int n, int i) {
        if (i >= n) return i == n;
        if (cache[i] != -1) return cache[i];
        return cache[i] = dfs(n, i + 1) + dfs(n, i + 2);
    }
};
```

**Time complexity:** O(n)

**Space complexity:** O(n)

**Dynamic Programming (Bottom-Up)**
```cpp
class Solution {
public:
    int climbStairs(int n) {
        if (n <= 2) {
            return n;
        }
        vector<int> dp(n + 1);
        dp[1] = 1;
        dp[2] = 2;
        for (int i = 3; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2];
        }
        return dp[n];
    }
};
```

**Time complexity:** O(n)

**Space complexity:** O(n)

**Dynamic Programming (Space Optimized)**
```cpp
class Solution {
public:
    int climbStairs(int n) {
        int one = 1, two = 1;

        for (int i = 0; i < n - 1; i++) {
            int temp = one;
            one = one + two;
            two = temp;
        }

        return one;
    }
};
```

**Time complexity:** O(n)

**Space complexity:** O(1)

**Matrix Exponentiation**
```cpp
class Solution {
public:
    int climbStairs(int n) {
        if (n == 1) return 1;

        vector<vector<int>> M = {{1, 1}, {1, 0}};
        vector<vector<int>> result = matrixPow(M, n);

        return result[0][0];
    }

private:
    vector<vector<int>> matrixMult(vector<vector<int>>& A, vector<vector<int>>& B) {
        return {{A[0][0] * B[0][0] + A[0][1] * B[1][0],
                 A[0][0] * B[0][1] + A[0][1] * B[1][1]},
                {A[1][0] * B[0][0] + A[1][1] * B[1][0],
                 A[1][0] * B[0][1] + A[1][1] * B[1][1]}};
    }

    vector<vector<int>> matrixPow(vector<vector<int>>& M, int p) {
        vector<vector<int>> result = {{1, 0}, {0, 1}};
        vector<vector<int>> base = M;

        while (p > 0) {
            if (p % 2 == 1) {
                result = matrixMult(result, base);
            }
            base = matrixMult(base, base);
            p /= 2;
        }

        return result;
    }
};
```

**Time complexity:** O(log n)

**Space complexity:** O(n)

**Math**
```cpp
class Solution {
public:
    int climbStairs(int n) {
        double sqrt5 = sqrt(5);
        double phi = (1 + sqrt5) / 2;
        double psi = (1 - sqrt5) / 2;
        n++;
        return round((pow(phi, n) - pow(psi, n)) / sqrt5);
    }
};
```

**Time complexity:** O(log n)

**Space complexity:** O(n)
