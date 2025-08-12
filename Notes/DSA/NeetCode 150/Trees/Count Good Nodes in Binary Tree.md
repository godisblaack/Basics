Link: https://leetcode.com/problems/count-good-nodes-in-binary-tree/description/

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
    int goodNodes(TreeNode* root) {
        int count = 0;

        return preOrderTraversal(root, count, root->val);
    }

    int preOrderTraversal(TreeNode* root, int &count, int rootValue) {
        if (root == nullptr) {
            return 0;
        }

        if (root->val >= rootValue) {
            rootValue = root->val;
            
            count++;
        }

        preOrderTraversal(root->left, count, rootValue);
        preOrderTraversal(root->right, count, rootValue);

        return count;
    }
};
```

**Time complexity:** O(N)

**Space complexity:** O(H), where H is the height of the binary tree. In the worst case (skewed tree), this is O(N). In the best case (balanced tree), this is O(log N).

This is the **optimized** solution.