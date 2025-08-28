Link: https://leetcode.com/problems/word-search-ii/description/

I was not able to solve it.

**Trie with dfs search**

```cpp
class TrieNode {
public:
    unordered_map<char, TrieNode*> children;
    string word = "";
};

class Solution {
public:
    vector<string> findWords(vector<vector<char>>& board, vector<string>& words) {
        TrieNode* root = buildTrie(words);
        vector<string> result;
        int rows = board.size(), cols = board[0].size();

        for (int r = 0; r < rows; ++r) {
            for (int c = 0; c < cols; ++c) {
                dfs(board, r, c, root, result);
            }
        }

        return result;
    }

private:
    TrieNode* buildTrie(vector<string>& words) {
        TrieNode* root = new TrieNode();
        for (const string& word : words) {
            TrieNode* node = root;
            for (char ch : word) {
                if (!node->children.count(ch))
                    node->children[ch] = new TrieNode();
                node = node->children[ch];
            }
            node->word = word;
        }
        return root;
    }

    void dfs(vector<vector<char>>& board, int r, int c, TrieNode* node, vector<string>& result) {
        char ch = board[r][c];
        if (ch == '#' || !node->children.count(ch)) return;

        node = node->children[ch];
        if (!node->word.empty()) {
            result.push_back(node->word);
            node->word = ""; // Avoid duplicates
        }

        board[r][c] = '#'; // Mark visited

        vector<pair<int, int>> directions = {{-1,0}, {1,0}, {0,-1}, {0,1}};
        for (auto [dr, dc] : directions) {
            int nr = r + dr, nc = c + dc;
            if (nr >= 0 && nr < board.size() && nc >= 0 && nc < board[0].size()) {
                dfs(board, nr, nc, node, result);
            }
        }

        board[r][c] = ch; // Restore
    }
};
```

**Time complexity:** O($M * N * 4^{L}$)

**Space complexity:** O(W * L)

Let:
- M = number of rows in the board
- N = number of columns in the board
- W = number of words
- L = average length of each word

### Summary Table

| Component         | Complexity        |
|-------------------|-------------------|
| Build Trie        | $O(W \cdot L)$ |
| DFS Traversal     | $O(M \cdot N \cdot 4^L)$ |
| Trie Space        | $O(W \cdot L)$ |
| DFS Stack         | $O(L)$ |
| Result Storage    | $O(W \cdot L)$ |

---