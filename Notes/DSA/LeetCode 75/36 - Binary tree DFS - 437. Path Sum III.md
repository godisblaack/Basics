Link: https://leetcode.com/problems/path-sum-ii/description/

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
    int pathSum(TreeNode* root, int targetSum) {
        long count = 0;

        preOrder(root, targetSum, count, 0);

        return count;
    }

    void preOrder(TreeNode* root, int targetSum, long& count, long currentSum) {
        if (root == nullptr) {
            return;
        }

        hasPathSum(root, targetSum, count, currentSum);
        preOrder(root->left, targetSum, count, currentSum);
        preOrder(root->right, targetSum, count, currentSum);
    }

    void hasPathSum(TreeNode* root, int targetSum, long& count, long currentSum) {
        if (root == nullptr) {
            return;
        }

        currentSum += root->val;

        if (currentSum == targetSum) {
            count++;
        }

        hasPathSum(root->left, targetSum, count, currentSum);
        hasPathSum(root->right, targetSum, count, currentSum);
    }
};
```

**Time complexity:** O($N^{2}$)

**Space complexity:** O(N)

This is **not** the optimized solution.

**Optimized solution**

```cpp
unordered_map<long long, int> prefixSumCount;
        prefixSumCount[0] = 1; // Base case for root itself
        return dfs(root, 0, targetSum, prefixSumCount);
    }

private:
    int dfs(TreeNode* node, long long currentSum, int targetSum, unordered_map<long long, int>& prefixSumCount) {
        if (!node) return 0;

        currentSum += node->val;
        int count = prefixSumCount[currentSum - targetSum]; // Check for valid path

        // Store current prefix sum in hashmap
        prefixSumCount[currentSum]++;

        // Recur to left and right subtree
        count += dfs(node->left, currentSum, targetSum, prefixSumCount);
        count += dfs(node->right, currentSum, targetSum, prefixSumCount);

        // Backtrack (Remove current sum to avoid affecting sibling subtree)
        prefixSumCount[currentSum]--;

        return count;
    }
};
```

**Time complexity:** O(N)

**Space complexity:** O(N)