Link: https://leetcode.com/problems/palindrome-partitioning/description/

**My solution**

```cpp
class Solution {
public:
    bool isPalindrome(const string& s) {
        int l = 0, r = s.size() - 1;
        while (l < r)
            if (s[l++] != s[r--])
                return false;
        return true;
    }

    void generatePartitions(string& s, int idx, vector<string>& curr, vector<vector<string>>& ans) {
        if (idx == s.size()) {
            ans.push_back(curr);
            return;
        }
        
        for (int cut = idx + 1; cut <= s.size(); cut++) {
            string sub = s.substr(idx, cut - idx);
            if (isPalindrome(sub)) {
                curr.push_back(sub);
                generatePartitions(s, cut, curr, ans);
                curr.pop_back();
            }
        }
    }

    vector<vector<string>> partition(string s) {
        vector<vector<string>> ans;
        vector<string> curr;
        generatePartitions(s, 0, curr, ans);
        return ans;
    }
};
```

**Time complexity:** O(n * $2^{n}$)

**Space complexity:** O(n) + output

**Better solution - backtracking**

```cpp
class Solution {
public:
    vector<vector<string>> partition(string s) {
        vector<vector<string>> result;
        vector<string> path;
        backtrack(0, s, path, result);
        return result;
    }
    
private:
    void backtrack(int start, string &s, vector<string> &path, vector<vector<string>> &result) {
        if (start == s.size()) {
            result.push_back(path);
            return;
        }
        
        for (int end = start; end < s.size(); end++) {
            if (isPalindrome(s, start, end)) {
                path.push_back(s.substr(start, end - start + 1));
                backtrack(end + 1, s, path, result);
                path.pop_back(); // undo the choice
            }
        }
    }
    
    bool isPalindrome(string &s, int left, int right) {
        while (left < right) {
            if (s[left] != s[right]) return false;
            left++;
            right--;
        }
        return true;
    }
};
```

**Time complexity:** O(n * $2^{n}$)

**Space complexity:** O(n) + output

**Optimized Approach — Precompute Palindromes (DP table)**

```cpp
class Solution {
public:
    vector<vector<bool>> buildPalindromeTable(const string& s) {
        int n = s.size();
        vector<vector<bool>> dp(n, vector<bool>(n, false));
        for (int i = n - 1; i >= 0; i--) {
            for (int j = i; j < n; j++) {
                if (s[i] == s[j] && (j - i <= 2 || dp[i + 1][j - 1])) {
                    dp[i][j] = true;
                }
            }
        }
        return dp;
    }

    void dfs(int start, const string& s, vector<string>& path,
             vector<vector<string>>& res, vector<vector<bool>>& dp) {
        if (start == s.size()) {
            res.push_back(path);
            return;
        }
        for (int end = start; end < s.size(); end++) {
            if (dp[start][end]) {
                path.push_back(s.substr(start, end - start + 1));
                dfs(end + 1, s, path, res, dp);
                path.pop_back();
            }
        }
    }

    vector<vector<string>> partition(string s) {
        auto dp = buildPalindromeTable(s);
        vector<vector<string>> res;
        vector<string> path;
        dfs(0, s, path, res, dp);
        return res;
    }
};
```

**Time complexity:** O($n^{2} + 2^{n}$)

**Space complexity:** O($n^{2}$) + output