Link: https://leetcode.com/problems/balanced-binary-tree/description/

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
    bool isBalanced(TreeNode* root) {
        bool balance = true;

        checkBalance(root, balance);

        return balance;
    }

    int checkBalance(TreeNode* root, bool& balance) {
        if (root == nullptr) {
            return 0;
        }

        int left = checkBalance(root->left, balance);
        int right = checkBalance(root->right, balance);

        if (abs(left - right) > 1) {
            balance = false;
        }

        return 1 + max(left, right);
    }
};
```

**Time complexity:** O(N)

**Space complexity:** O(N)