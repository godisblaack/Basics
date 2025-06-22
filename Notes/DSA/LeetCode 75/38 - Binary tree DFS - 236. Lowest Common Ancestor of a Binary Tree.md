Link: https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/description/

I was not able to solve this, so I watch a video and coded the brute force by mysefl.

**My solution**

```cpp
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
 * };
 */
class Solution {
    vector<TreeNode*> pPath;
    vector<TreeNode*> qPath;

public:
    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        vector<TreeNode*> currentPath;

        preOrderTraversal(root, p, q, currentPath);

        return findAncestor();
    }

    void preOrderTraversal(TreeNode* root, TreeNode* p, TreeNode* q, vector<TreeNode*> currentPath) {
        if (root == nullptr) {
            return;
        }

        currentPath.push_back(root);

        if (p == root) {
            pPath = currentPath;
        }

        if (q == root) {
            qPath = currentPath;
        }

        preOrderTraversal(root->left, p, q, currentPath);
        preOrderTraversal(root->right, p, q, currentPath);
    }

    TreeNode* findAncestor() {
        int size = 0;

        if (pPath.size() > qPath.size()) {
            size = qPath.size();
        } else {
            size = pPath.size();
        }

        int i = 0;

        for (; i < size; i++) {
            if (pPath[i] != qPath[i]) {
                break;
            }
        }
        
        return pPath[i - 1];
    }
};
```

**Time complexity:** O($N^{2}$)

**Space complexity:** O(N)

This is **not** the optimized solution.

**Optimized solution**

```cpp
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
 * };
 */
class Solution {
public:
    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        // Base case 1: If root is null, p or q cannot be found.
        if (root == nullptr) {
            return nullptr;
        }

        // Base case 2: If root is p or q, then root is an ancestor.
        // Since we are looking for the LOWEST common ancestor, if we find p or q,
        // it means that current 'root' is either p or q itself.
        // If the other node (q or p) is in its subtree, 'root' is the LCA.
        // If the other node is not in its subtree, then 'root' is simply p or q,
        // and a higher level call will handle the LCA.
        if (root == p || root == q) {
            return root;
        }

        // Recursively search in the left and right subtrees
        TreeNode* left_lca = lowestCommonAncestor(root->left, p, q);
        TreeNode* right_lca = lowestCommonAncestor(root->right, p, q);

        // Case 1: Both p and q are found in different subtrees
        // If left_lca is not null and right_lca is not null, it means p and q
        // are in different subtrees of the current 'root'.
        // Therefore, 'root' is the lowest common ancestor.
        if (left_lca != nullptr && right_lca != nullptr) {
            return root;
        }
        // Case 2: Only one of p or q is found (or both are in one subtree)
        // If left_lca is not null, it means either p or q (or both) are in the left subtree.
        // In this scenario, the LCA must be in the left subtree (or is left_lca itself).
        // Since we are returning the first node found, `left_lca` represents the LCA.
        else if (left_lca != nullptr) {
            return left_lca;
        }
        // Case 3: Only one of p or q is found (or both are in one subtree)
        // If right_lca is not null, it means either p or q (or both) are in the right subtree.
        // Similar to Case 2, `right_lca` represents the LCA.
        else if (right_lca != nullptr) {
            return right_lca;
        }
        // Case 4: Neither p nor q was found in the left or right subtrees.
        // Return null.
        else {
            return nullptr;
        }
    }
};
```

**Time complexity:** O(N)

**Space complexity:** O(N)