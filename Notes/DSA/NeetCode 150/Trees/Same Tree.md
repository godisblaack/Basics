Link: https://leetcode.com/problems/same-tree/description/

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
    bool isSameTree(TreeNode* p, TreeNode* q) {
        bool isMatch = true;

        return nodeMatch(p, q, isMatch);
    }

    bool nodeMatch(TreeNode* p, TreeNode* q, bool& isMatch) {
        if (p == nullptr && q == nullptr) {
            return true;
        } else if ((p == nullptr && q != nullptr) || (p != nullptr && q == nullptr)) {
            return false;
        }

        if (p->val != q->val) {
            return false;
        }

        return nodeMatch(p->left, q->left, isMatch) && nodeMatch(p->right, q->right, isMatch);
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
    bool isSameTree(TreeNode* p, TreeNode* q) {
        if (!p && !q) return true;
        if (!p || !q || p->val != q->val) return false;
        return isSameTree(p->left, q->left) && isSameTree(p->right, q->right);
    }
};
```

**Time complexity:** O(N)

**Space complexity:** O(N)