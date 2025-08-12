Link: https://leetcode.com/problems/binary-tree-right-side-view/description/

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
    vector<int> rightSideView(TreeNode* root) {
        vector<int> view;

        bfs(root, view);

        if (root != nullptr) {
            view.pop_back();
        }

        return view;
    }

    void bfs(TreeNode* root, vector<int>& view) {
        if (root == nullptr) {
            return;
        }

        queue<TreeNode*> nodeQueue;
        
        nodeQueue.push(root);

        int rightNode = nodeQueue.front()->val;

        view.push_back(rightNode);

        while (!nodeQueue.empty()) {
            int currentSize = nodeQueue.size();

            for (int i = 0; i < currentSize; i++) {
                TreeNode* currentNode = nodeQueue.front();

                nodeQueue.pop();

                if (currentNode->left != nullptr) {
                    nodeQueue.push(currentNode->left);

                    rightNode = currentNode->left->val;
                }
                
                if (currentNode->right != nullptr) {
                    nodeQueue.push(currentNode->right);

                    rightNode = currentNode->right->val;
                }
            }

            view.push_back(rightNode);
        }
    }
};
```

**Time complexity:** O(N)

**Space complexity:** O(N)

This is **not** the optimized solution. I just removed the redundant lines where I was assigning the value of the node to `rightNode` on every step.

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
    vector<int> rightSideView(TreeNode* root) {
        vector<int> view;

        bfs(root, view);

        return view;
    }

    void bfs(TreeNode* root, vector<int>& view) {
        if (root == nullptr) {
            return;
        }

        queue<TreeNode*> nodeQueue;
        
        nodeQueue.push(root);

        while (!nodeQueue.empty()) {
            TreeNode* currentNode = nullptr;

            int currentSize = nodeQueue.size();

            for (int i = 0; i < currentSize; i++) {
                currentNode = nodeQueue.front();

                nodeQueue.pop();

                if (currentNode->left != nullptr) {
                    nodeQueue.push(currentNode->left);
                }
                
                if (currentNode->right != nullptr) {
                    nodeQueue.push(currentNode->right);
                }
            }

            view.push_back(currentNode->val);
        }
    }
};
```

**Time complexity:** O(N)

**Space complexity:** O(N)