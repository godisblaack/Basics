Link: https://leetcode.com/problems/leaf-similar-trees/description/

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
    bool leafSimilar(TreeNode* root1, TreeNode* root2) {
        vector<int> root1Leaves;
        vector<int> root2Leaves;

        preOrder(root1, root1Leaves);
        preOrder(root2, root2Leaves);

        if (root1Leaves.size() != root2Leaves.size()) {
            return false;
        }

        for (int i = 0; i < root1Leaves.size(); i++) {
            if (root1Leaves[i] != root2Leaves[i]) {
                return false;
            }
        }

        return true;
    }

    void preOrder(TreeNode* root, vector<int>& rootVector) {
        if (root == nullptr) {
            return;
        }

        if (root->left == nullptr && root->right == nullptr) {
            rootVector.push_back(root->val);
        }

        preOrder(root->left, rootVector);
        preOrder(root->right, rootVector);
    }
};
```

**Time complexity:** O($N_{1} + N_{2}$), where $N_{1}$ and $N_{2}$ are the number of nodes in root1 and root2 respectively.

**Space complexity:** O($N_{1} + N_{2}$) in the worst case, considering the recursion stack depth and the storage for leaf value vectors. More precisely, O($H_{1} + H_{2} + L_{1} + L_{2}$), where $H_{1}$, $H_{2}$ are heights and $L_{1}$, $L_{2}$ are number of leaves.

This is the **optimized** solution. There is another way to write it.

**Iterative solution**

```cpp
// Iterative

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
    // Helper function to get leaf values using an iterative approach
    std::vector<int> getLeaves(TreeNode* root) {
        std::vector<int> leaves;
        if (root == nullptr) {
            return leaves;
        }

        std::stack<TreeNode*> s;
        s.push(root);

        while (!s.empty()) {
            TreeNode* current = s.top();
            s.pop();

            // If it's a leaf node, add its value to the vector
            if (current->left == nullptr && current->right == nullptr) {
                leaves.push_back(current->val);
            }

            // Push right child first so left child is processed first (for left-to-right order)
            if (current->right != nullptr) {
                s.push(current->right);
            }
            if (current->left != nullptr) {
                s.push(current->left);
            }
        }
        return leaves;
    }

    bool leafSimilar(TreeNode* root1, TreeNode* root2) {
        std::vector<int> root1Leaves = getLeaves(root1);
        std::vector<int> root2Leaves = getLeaves(root2);

        // Compare the two vectors
        return root1Leaves == root2Leaves; // std::vector has an overloaded operator== for comparison
    }
};
```

**Time complexity:** O($N_{1} + N_{2}$), where $N_{1}$ and $N_{2}$ are the number of nodes in root1 and root2 respectively.

**Space complexity:** O($N_{1} + N_{2}$).