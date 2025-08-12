Link: https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/description/

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
public:
    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        vector<TreeNode*> pPath;
        vector<TreeNode*> qPath;

        binarySearch(root, p, pPath);
        binarySearch(root, q, qPath);

        TreeNode* lowestCommonAncestor;

        for (int i = 0; i < pPath.size() && i < qPath.size(); i++) {
            if (pPath[i] != qPath[i]) {
                lowestCommonAncestor = pPath[i - 1];

                break;
            }

            lowestCommonAncestor = pPath[i];
        }

        return lowestCommonAncestor;
    }

    vector<TreeNode*> binarySearch(TreeNode* root, TreeNode* key, vector<TreeNode*>& path) {
        if (root == nullptr) {
            return path;
        }

        path.push_back(root);
        
        if (root == key) {
            return path;
        } else if (root->val > key->val) {
            binarySearch(root->left, key, path);
        } else {
            binarySearch(root->right, key, path);
        }

        return path;
    }
};
```

**Time complexity:** O(h) + O(h) + O(h) = O(h), where h is the height of the tree.

**Space complexity:** O(h) + O(h) = O(h)

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
        while (root) {
            if (p->val < root->val && q->val < root->val) {
                root = root->left;
            } else if (p->val > root->val && q->val > root->val) {
                root = root->right;
            } else {
                return root;
            }
        }
        return nullptr;
    }
};
```

**Time complexity:** O(h), where h is the height of the tree.

**Space complexity:** O(1)
