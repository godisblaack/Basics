Link: https://leetcode.com/problems/search-in-a-binary-search-tree/description/

**My solution**

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
    TreeNode* searchBST(TreeNode* root, int val) {
        if (root == nullptr) {
            return nullptr;
        }

        if (root->val == val) {
            return root;
        } else if (root->val > val) {
            return searchBST(root->left, val);
        } else {
            return searchBST(root->right, val);
        }
    }
};
```

**Time complexity:** O(log N)

**Space complexity:** O(H), space for the call stack.

This is **not** the optimized solution. There is an iterative approach with better space complexity.

**Optimized solution**

```cpp
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 * int val;
 * TreeNode *left;
 * TreeNode *right;
 * TreeNode() : val(0), left(nullptr), right(nullptr) {}
 * TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 * TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    TreeNode* searchBST(TreeNode* root, int val) {
        TreeNode* currentNode = root; // Start from the root

        while (currentNode != nullptr) { // Continue as long as we haven't reached a null pointer
            if (currentNode->val == val) {
                return currentNode; // Found the node, return it
            } else if (currentNode->val > val) {
                currentNode = currentNode->left; // If current value is greater, go left
            } else { // currentNode->val < val
                currentNode = currentNode->right; // If current value is smaller, go right
            }
        }

        return nullptr; // If the loop finishes, the value was not found
    }
};
```

**Time complexity:** O(log N)

**Space complexity (auxiliary):** O(1)