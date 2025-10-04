Link: https://leetcode.com/problems/word-break/description/

I was not able to solve it.

**Recursion**

```cpp
class Solution {
public:
    bool wordBreak(string s, vector<string>& wordDict) {
        return dfs(s, wordDict, 0);
    }

private:
    bool dfs(const string& s, const vector<string>& wordDict, int i) {
        if (i == s.length()) {
            return true;
        }

        for (const string& w : wordDict) {
            if (i + w.length() <= s.length() &&
                s.substr(i, w.length()) == w) {
                if (dfs(s, wordDict, i + w.length())) {
                    return true;
                }
            }
        }
        return false;
    }
};
```

**Time complexity:** O($t ∗ m^{n}$), where n is the length of the string s, m is the number of words in wordDict and t is the maximum length of any word in wordDict.

**Space complexity:** O(n)

**Dynamic Programming (Top-Down)**

```cpp
class Solution {
public:
    unordered_map<int, bool> memo;

    bool wordBreak(string s, vector<string>& wordDict) {
        memo[s.length()] = true;
        return dfs(s, wordDict, 0);
    }

    bool dfs(string& s, vector<string>& wordDict, int i) {
        if (memo.find(i) != memo.end()) {
            return memo[i];
        }

        for (const string& w : wordDict) {
            if (i + w.length() <= s.length() &&
                s.substr(i, w.length()) == w) {
                if (dfs(s, wordDict, i + w.length())) {
                    memo[i] = true;
                    return true;
                }
            }
        }
        memo[i] = false;
        return false;
    }
};
```

**Time complexity:** O(n∗m∗t), where n is the length of the string s, m is the number of words in wordDict and t is the maximum length of any word in wordDict.

**Space complexity:** O(n)

**Dynamic Programming (Bottom-Up)**

```cpp
class Solution {
public:
    bool wordBreak(string s, vector<string>& wordDict) {
        vector<bool> dp(s.size() + 1, false);
        dp[s.size()] = true;

        for (int i = s.size() - 1; i >= 0; i--) {
            for (const auto& w : wordDict) {
                if ((i + w.size()) <= s.size() &&
                     s.substr(i, w.size()) == w) {
                    dp[i] = dp[i + w.size()];
                }
                if (dp[i]) {
                    break;
                }
            }
        }

        return dp[0];
    }
};
```

**Time complexity:** O(n∗m∗t), where n is the length of the string s, m is the number of words in wordDict and t is the maximum length of any word in wordDict.

**Space complexity:** O(n)

**Dynamic Programming (Trie)**

```cpp
class TrieNode {
public:
    unordered_map<char, TrieNode*> children;
    bool is_word = false;
};

class Trie {
public:
    TrieNode* root;

    Trie() {
        root = new TrieNode();
    }

    void insert(string word) {
        TrieNode* node = root;
        for (char c : word) {
            if (!node->children.count(c)) {
                node->children[c] = new TrieNode();
            }
            node = node->children[c];
        }
        node->is_word = true;
    }

    bool search(string& s, int i, int j) {
        TrieNode* node = root;
        for (int idx = i; idx <= j; ++idx) {
            if (!node->children.count(s[idx])) {
                return false;
            }
            node = node->children[s[idx]];
        }
        return node->is_word;
    }
};

class Solution {
public:
    bool wordBreak(string s, vector<string>& wordDict) {
        Trie trie;
        for (string word : wordDict) {
            trie.insert(word);
        }

        int n = s.length();
        vector<bool> dp(n + 1, false);
        dp[n] = true;

        int maxLen = 0;
        for (string w : wordDict) {
            maxLen = max(maxLen, (int)w.size());
        }

        for (int i = n - 1; i >= 0; --i) {
            for (int j = i; j < min(n, i + maxLen); ++j) {
                if (trie.search(s, i, j)) {
                    dp[i] = dp[j + 1];
                    if (dp[i]) break;
                }
            }
        }

        return dp[0];
    }
};
```

**Time complexity:** $O((n ∗ t^{2}) + m)$, where n is the length of the string s, m is the number of words in wordDict and t is the maximum length of any word in wordDict.

**Space complexity:** O(n + (m ∗ t))