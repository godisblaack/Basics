Link: https://leetcode.com/problems/kth-smallest-element-in-a-bst/description/

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
    int kthSmallest(TreeNode* root, int k) {
        int result;
        int count = 0;
        
        inOrderTraversal(root, k, count, result);

        return result;
    }

    void inOrderTraversal(TreeNode* root, int k, int& count, int& result) {
        if (root == nullptr) {
            return;
        }


        inOrderTraversal(root->left, k, count, result);
        
        count++;

        if (count == k) {
            result = root->val;

            return;
        }
        inOrderTraversal(root->right, k, count, result);
    }
};
```

**Time complexity:** O(N) 

**Space complexity:** O(N)

This is **not** the optimized solution.

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
    int kthSmallest(TreeNode* root, int k) {
        std::stack<TreeNode*> st;
        TreeNode* curr = root;

        while (curr || !st.empty()) {
            while (curr) {
                st.push(curr);
                curr = curr->left;
            }

            curr = st.top();
            st.pop();
            k--;

            if (k == 0) return curr->val;

            curr = curr->right;
        }

        return -1; // Should never reach here if k is valid
    }
};
```

**Time complexity:** O(N)

**Space complexity:** O(N), same as before, but avoids function call overhead.