Link: https://leetcode.com/problems/binary-tree-level-order-traversal/description/

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
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left),
 * right(right) {}
 * };
 */
class Solution {
public:
    vector<vector<int>> levelOrder(TreeNode* root) {
        vector<vector<int>> traversal;

        levelOrderTraversal(root, traversal);

        return traversal;
    }

    void levelOrderTraversal(TreeNode* root, vector<vector<int>>& traversal) {
        if (root == nullptr) {
            return;
        }

        queue<TreeNode*> nodeQueue;

        nodeQueue.push(root);

        while (!nodeQueue.empty()) {
            vector<int> currentLevelTraversal;

            int currentSize = nodeQueue.size();

            for (int i = 0; i < currentSize; i++) {
                TreeNode* currentNode = nodeQueue.front();

                nodeQueue.pop();

                currentLevelTraversal.push_back({currentNode->val});

                if (currentNode->left != nullptr) {
                    nodeQueue.push(currentNode->left);
                }

                if (currentNode->right != nullptr) {
                    nodeQueue.push(currentNode->right);
                }
            }

            traversal.push_back({currentLevelTraversal});
        }
    }
};
```

**Time complexity:** O(N)

**Space complexity:** O(N)

This is the **optimized** solution.