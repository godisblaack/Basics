Link: https://leetcode.com/problems/implement-trie-prefix-tree/description/

**My solution**

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

class Trie {
private:
    TrieNode* root;

public:
    Trie() { 
        root = new TrieNode(); 
    }

    void insert(string word) {
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
        TrieNode* node = root;

        for (char ch : word) {
            int index = ch - 'a';

            if (!node->children[index]) {
                return false;
            }

            node = node->children[index];
        }

        return node->isEndOfWord;
    }

    bool startsWith(string prefix) {
        TrieNode* node = root;

        for (char ch : prefix) {
            int index = ch - 'a';

            if (!node->children[index]) {
                return false;
            }

            node = node->children[index];
        }

        return true;
    }
};

/**
 * Your Trie object will be instantiated and called as such:
 * Trie* obj = new Trie();
 * obj->insert(word);
 * bool param_2 = obj->search(word);
 * bool param_3 = obj->startsWith(prefix);
 */
 ```

**Time complexity:** O(L)

**Space complexity:** O(N L ALPHABET_SIZE)

This is **not** the optimized code.

**Optimized soluiton**

```cpp
#include <string>
#include <unordered_map> // Required for std::unordered_map
#include <iostream>      // For example usage

// Removed ALPHABET_SIZE as it's not directly used for map indexing

class TrieNode {
public:
    // Using std::unordered_map to store children.
    // Key: character, Value: pointer to the next TrieNode
    std::unordered_map<char, TrieNode*> children;
    bool isEndOfWord;

    // Constructor
    TrieNode() : isEndOfWord(false) {
        // No need to initialize all alphabet_size entries; the map starts empty.
    }

    // Destructor to recursively delete child nodes and prevent memory leaks
    ~TrieNode() {
        // Iterate through all values (TrieNode* pointers) in the map
        for (auto const& [key, val] : children) {
            delete val; // Deletes the child node
        }
    }
};

class Trie {
private:
    TrieNode* root;

public:
    // Constructor
    Trie() {
        root = new TrieNode();
    }

    // Destructor to free the entire Trie structure
    ~Trie() {
        delete root; // This will trigger the recursive deletion of all nodes due to TrieNode's destructor
    }

    // Inserts a word into the Trie
    void insert(std::string word) {
        TrieNode* node = root;

        for (char ch : word) {
            // If the character is not found in the current node's children map
            if (node->children.find(ch) == node->children.end()) {
                // Create a new TrieNode for this character
                node->children[ch] = new TrieNode();
            }
            // Move to the next node in the path
            node = node->children[ch];
        }
        // Mark the end of the word
        node->isEndOfWord = true;
    }

    // Searches for a word in the Trie
    bool search(std::string word) {
        TrieNode* node = root;

        for (char ch : word) {
            // If the character is not found in the current node's children map
            if (node->children.find(ch) == node->children.end()) {
                return false; // Word not found
            }
            // Move to the next node
            node = node->children[ch];
        }
        // Return true only if the final node marks the end of a word
        return node->isEndOfWord;
    }

    // Checks if any word in the Trie starts with the given prefix
    bool startsWith(std::string prefix) {
        TrieNode* node = root;

        for (char ch : prefix) {
            // If the character is not found in the current node's children map
            if (node->children.find(ch) == node->children.end()) {
                return false; // Prefix not found
            }
            // Move to the next node
            node = node->children[ch];
        }
        // If we successfully traversed the entire prefix, it means it exists
        return true;
    }
};

/**
 * Your Trie object will be instantiated and called as such:
 * Trie* obj = new Trie();
 * obj->insert(word);
 * bool param_2 = obj->search(word);
 * bool param_3 = obj->startsWith(prefix);
 */
 ```

 **Time complexity:** O(L)

 **Space complexity:** O(U + overhead of map), where U is total number of unique characters across all unique prefixes in the Trie.