Link: https://leetcode.com/problems/binary-tree-maximum-path-sum/description/

I was not able to solve it. I was not able to pass all the test cases.

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
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    int maxPathSum(TreeNode* root) {
        int maximumSum = numeric_limits<int>::min();
        maxGain(root, maximumSum);
        return maximumSum;
    }

    int maxGain(TreeNode* node, int& maximumSum) {
        if (node == nullptr) {
            return 0;
        }

        // Recursively get the maximum gain from left and right subtrees
        int leftGain = max(maxGain(node->left, maximumSum), 0);
        int rightGain = max(maxGain(node->right, maximumSum), 0);

        // Path sum that passes through the current node
        int currentPathSum = node->val + leftGain + rightGain;

        // Update the global maximum if needed
        maximumSum = max(maximumSum, currentPathSum);

        // Return the maximum gain that can be extended to the parent
        return node->val + max(leftGain, rightGain);
    }
};
```

**Time complexity:** O(N)

**Space complexity:** O(N)