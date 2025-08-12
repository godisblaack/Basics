Link: https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/description/

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
    TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {
        unordered_map<int, int> inorderMap;

        for (int i = 0; i < inorder.size(); i++) {
            inorderMap[inorder[i]] = i; 
        }

        TreeNode* root = new TreeNode(preorder[0]);

        for (int i = 1; i < preorder.size(); i++) {
            auto currentIndex = inorderMap[preorder[i]];

            TreeNode* track = root;
            TreeNode* temp = root;

            while (temp) {
                auto previousIndex = inorderMap[temp->val];
                
                if (previousIndex > currentIndex) {
                    track = temp;

                    temp = temp->left;
                } else {
                    track = temp;

                    temp = temp->right;
                }
            }

            TreeNode* newNode = new TreeNode(preorder[i]);

            if (currentIndex < inorderMap[track->val]) {
                track->left = newNode;
            } else {
                track->right = newNode;
            }
        }

        return root;
    }
};
```

**Time complexity:** O($N^{2})

**Space complexity:** O(N)

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
    unordered_map<int, int> inorderMap;
    int preorderIndex = 0;

    TreeNode* buildTreeHelper(vector<int>& preorder, int left, int right) {
        if (left > right) return nullptr;

        int rootVal = preorder[preorderIndex++];
        TreeNode* root = new TreeNode(rootVal);

        int inorderIndex = inorderMap[rootVal];

        root->left = buildTreeHelper(preorder, left, inorderIndex - 1);
        root->right = buildTreeHelper(preorder, inorderIndex + 1, right);

        return root;
    }

    TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {
        for (int i = 0; i < inorder.size(); ++i) {
            inorderMap[inorder[i]] = i;
        }

        return buildTreeHelper(preorder, 0, inorder.size() - 1);
    }
};
```

**Time complexity:** O(N)

**Space complexity:** O(N)