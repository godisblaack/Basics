Link: https://leetcode.com/problems/validate-binary-search-tree/description/

I was not able to solve it. I was not able to pass all the test cases.

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
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left),
 * right(right) {}
 * };
 */
class Solution {
public:
    bool isValidBST(TreeNode* root) {
        if (!root)
            return true;
        return checkLeft(root->left, root->val) &&
               checkRight(root->right, root->val) && isValidBST(root->left) &&
               isValidBST(root->right);
    }

    bool checkLeft(TreeNode* node, int val) {
        if (!node)
            return true;
        if (node->val >= val)
            return false;
        return checkLeft(node->left, val) && checkLeft(node->right, val);
    }

    bool checkRight(TreeNode* node, int val) {
        if (!node)
            return true;
        if (node->val <= val)
            return false;
        return checkRight(node->left, val) && checkRight(node->right, val);
    }
};
```

**Time complexity:** O($N^{2}$).

**Space complexity:** O(h), where h is the height of the tree.

**Better approach (Inorder traversal)**

```cpp
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left),
 * right(right) {}
 * };
 */
class Solution {
public:
    long prev = LONG_MIN;

    bool isValidBST(TreeNode* root) {
        if (!root)
            return true;
        if (!isValidBST(root->left))
            return false;
        if (root->val <= prev)
            return false;
        prev = root->val;
        return isValidBST(root->right);
    }
};
```

**Time complexity:** O(N).

**Space complexity:** O(h), where h is the height of the tree.

**Optimized solution**

```cpp
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left),
 * right(right) {}
 * };
 */
class Solution {
public:
    bool isValidBST(TreeNode* root) {
        return validate(root, LONG_MIN, LONG_MAX);
    }

    bool validate(TreeNode* node, long minVal, long maxVal) {
        if (!node)
            return true;
        if (node->val <= minVal || node->val >= maxVal)
            return false;
        return validate(node->left, minVal, node->val) &&
               validate(node->right, node->val, maxVal);
    }
};
```

**Time complexity:** O(N).

**Space complexity:** O(h), where h is the height of the tree.