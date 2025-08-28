Link: https://leetcode.com/problems/design-add-and-search-words-data-structure/description/

I was not able to solve it. I was not able to implement the search function.

**Recursive solution**

```cpp
const int ALPHABET_SIZE = 26;

class TrieNode {
public:
    TrieNode* children[ALPHABET_SIZE];
    bool isEndOfWord;

    TrieNode() {
        for (int i = 0; i < ALPHABET_SIZE; i++) {
            children[i] = nullptr;
        }

        isEndOfWord = false;
    }
};

class WordDictionary {
private:
    TrieNode* root;
    int index;

public:
    WordDictionary() {
        root = new TrieNode();
    }
    
    void addWord(string word) {
        TrieNode* node = root;

        for (char ch : word) {
            int index = ch - 'a';

            if (!node->children[index]) {
                node->children[index] = new TrieNode();
            }

            node = node->children[index];
        }

        node->isEndOfWord = true;
    }
    
    bool search(string word) {
        return searchHelper(word, 0, root);
    }

    bool searchHelper(const string &word, int pos, TrieNode* node) {
        if (!node) return false;
        if (pos == word.size()) return node->isEndOfWord;

        char ch = word[pos];
        if (ch == '.') {
            // Try all possible children
            for (int i = 0; i < ALPHABET_SIZE; i++) {
                if (node->children[i] && searchHelper(word, pos + 1, node->children[i])) {
                    return true;
                }
            }
            return false;
        } else {
            int idx = ch - 'a';
            return searchHelper(word, pos + 1, node->children[idx]);
        }
    }
};

/**
 * Your WordDictionary object will be instantiated and called as such:
 * WordDictionary* obj = new WordDictionary();
 * obj->addWord(word);
 * bool param_2 = obj->search(word);
 */
```

**Time complexity:** O($\sum^{L}$), $\sum$ is the ALPHABET_SIZE which is 26 in this case, and L is the length of the word.

**Space compelxity:** O(N * L)