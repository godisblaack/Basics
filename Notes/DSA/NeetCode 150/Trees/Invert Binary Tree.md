Link: https://leetcode.com/problems/invert-binary-tree/description/

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
    TreeNode* invertTree(TreeNode* root) {
        levelOrderTraversal(root);

        return root;
    }

    void levelOrderTraversal(TreeNode* root) {
        if (root == nullptr) {
            return;
        }

        queue<TreeNode*> q;

        q.push(root);

        while(!q.empty()) {
            TreeNode* currentNode = q.front();

            q.pop();

            if (currentNode->left != nullptr) {
                q.push(currentNode->left);
            }

            if (currentNode->right != nullptr) {
                q.push(currentNode->right);
            }

            TreeNode* temp = currentNode->left;
            currentNode->left = currentNode->right;
            currentNode->right = temp;
        }
    }
};
```

**Time complexity:** O(N)

**Space complexity:** O(N)

This is the **optimized** solution.

**Cleaner code**

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
    TreeNode* invertTree(TreeNode* root) {
        if (!root) return nullptr;
        
        TreeNode* left = invertTree(root->left);
        TreeNode* right = invertTree(root->right);
        
        root->left = right;
        root->right = left;
        
        return root;
    }
};
```

**Time complexity:** O(N)

**Space complexity:** O(h), stack space for recursive calls. h is the tree height. In worst case (skewed tree), O(n); best case (balanced), O(log n).