Link: https://leetcode.com/problems/subtree-of-another-tree/description/

I was not able to solve it.

**Brute force**

```cpp
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    bool isSubtree(TreeNode* root, TreeNode* subRoot) {
        if (!root) return false;
        if (isSameTree(root, subRoot)) return true;
        return isSubtree(root->left, subRoot) || isSubtree(root->right, subRoot);
    }

    bool isSameTree(TreeNode* s, TreeNode* t) {
        if (!s && !t) return true;
        if (!s || !t || s->val != t->val) return false;
        return isSameTree(s->left, t->left) && isSameTree(s->right, t->right);
    }
};
```

**Time complexity:** O(n * m), where n is the number of nodes in root, and m is the number of nodes in subRoot.

**Space complexity:** O(n)

**Better Approach (Serialization + String Matching)**

```cpp
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    string serialize(TreeNode* node) {
        if (!node) return "X"; // Use a unique null marker
        return "^" + to_string(node->val) + "^," + serialize(node->left) + "," + serialize(node->right);
    }

    bool isSubtree(TreeNode* root, TreeNode* subRoot) {
        string s1 = serialize(root);
        string s2 = serialize(subRoot);
        return s1.find(s2) != string::npos;
    }
};
```

**Time complexity:** O(n + m)

**Space complexity:** O(n + m)

**Optimized Approach (Tree Hashing or KMP)**

```cpp
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    string serialize(TreeNode* node) {
        if (!node) return "X"; // Use a unique null marker
        return "^" + to_string(node->val) + "^," + serialize(node->left) + "," + serialize(node->right);
    }

    vector<int> buildKMP(string& pattern) {
        int m = pattern.size();
        vector<int> lps(m, 0);
        int len = 0;
        for (int i = 1; i < m; ) {
            if (pattern[i] == pattern[len]) {
                lps[i++] = ++len;
            } else if (len > 0) {
                len = lps[len - 1];
            } else {
                lps[i++] = 0;
            }
        }
        return lps;
    }

    bool kmpSearch(string& text, string& pattern) {
        vector<int> lps = buildKMP(pattern);
        int i = 0, j = 0;
        while (i < text.size()) {
            if (text[i] == pattern[j]) {
                i++; j++;
                if (j == pattern.size()) return true;
            } else if (j > 0) {
                j = lps[j - 1];
            } else {
                i++;
            }
        }
        return false;
    }

    bool isSubtree(TreeNode* root, TreeNode* subRoot) {
        string s1 = serialize(root);
        string s2 = serialize(subRoot);
        return kmpSearch(s1, s2);
    }
};
```

**Time complexity:** O(n + m)

**Space complexity:** O(n + m)

Fastest, avoids naive substring search.