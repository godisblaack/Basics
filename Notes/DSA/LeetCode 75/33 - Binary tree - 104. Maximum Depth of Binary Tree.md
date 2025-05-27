Link: https://leetcode.com/problems/maximum-depth-of-binary-tree/description/

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
    int maxDepth(TreeNode* root) {
        return maximumDepth(root);
    }

    int maximumDepth(TreeNode* root) {
        int maximumDepthCount = 0;

        if (root == nullptr) {
            return maximumDepthCount;
        }

        queue<TreeNode*> nodeQueue;

        nodeQueue.push(root);

        while (!nodeQueue.empty()) {
            int currentSize = nodeQueue.size();

            for (int i = 0; i < currentSize; i++) {
                TreeNode* currentNode = nodeQueue.front();

                nodeQueue.pop();

                if (currentNode->left != nullptr) {
                    nodeQueue.push(currentNode->left);
                }

                if (currentNode->right != nullptr) {
                    nodeQueue.push(currentNode->right);
                }
            }

            maximumDepthCount++;
        }

        return maximumDepthCount;
    }
};
```

**Time complexity:** O(N)

**Space complexity:** O(N)

This is the **optimized** solution. There is another approach to solve this problem.

**Recursive solution**

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
    int maxDepth(TreeNode* root) {
        // Base case: If the node is null, it contributes 0 to the depth.
        if (root == nullptr) {
            return 0;
        }

        // Recursively find the maximum depth of the left subtree
        int leftDepth = maxDepth(root->left);
        // Recursively find the maximum depth of the right subtree
        int rightDepth = maxDepth(root->right);

        // The maximum depth of the current tree is 1 (for the current node)
        // plus the maximum of the depths of its left and right subtrees.
        return 1 + std::max(leftDepth, rightDepth);
    }
};
```

**Time complexity:** O(N)

**Space complexity:** O(N)