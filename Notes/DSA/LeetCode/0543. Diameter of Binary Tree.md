Link: https://leetcode.com/problems/diameter-of-binary-tree/description/

I was not able to solve it. I watched a video solution.

**Solution**

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
    int diameterOfBinaryTree(TreeNode* root) {
        int longestPath = 0;
        depth(root, longestPath);
        return longestPath;
    }

private:
    // Returns depth of subtree rooted at 'node'
    int depth(TreeNode* node, int& longestPath) {
        if (node == nullptr) return 0;

        int leftDepth = depth(node->left, longestPath);
        int rightDepth = depth(node->right, longestPath);

        // Update longest path if path through this node is longer
        longestPath = max(longestPath, leftDepth + rightDepth);

        // Return depth of this node
        return 1 + max(leftDepth, rightDepth);
    }
};
```

**Time complexity:** O(N)

**Space complexity:** O(N)