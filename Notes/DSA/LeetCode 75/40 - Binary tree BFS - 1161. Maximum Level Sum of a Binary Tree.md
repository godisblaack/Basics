Link: https://leetcode.com/problems/maximum-level-sum-of-a-binary-tree/description/

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
        int level = 0;
        int maxSum = INT_MIN;

public:
    int maxLevelSum(TreeNode* root) {
        bfs(root);

        return level;
    }

    void bfs(TreeNode* root) {
        if (root == nullptr) {
            return;
        }

        queue<TreeNode*> nodeQueue;

        nodeQueue.push(root);

        int currentLevel = 0;
        int sum = 0;

        while (!nodeQueue.empty()) {
            currentLevel++;

            sum = 0;

            int currentSize = nodeQueue.size();

            TreeNode* currentNode = nullptr;

            for (int i = 0; i < currentSize; i++) {
                currentNode = nodeQueue.front();
                nodeQueue.pop();

                sum += currentNode->val;

                if (currentNode->left != nullptr) {
                    nodeQueue.push(currentNode->left);
                }

                if (currentNode->right != nullptr) {
                    nodeQueue.push(currentNode->right);
                }
            }

            if (sum > maxSum) {
                maxSum = sum;

                level = currentLevel;
            }
        }
    }
};
```

**Time complexity:** O(N)

**Space complexity:** O(N)

This is the **optimized** solution. There is a better way to write it, as shown below:

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
#include <queue>
#include <algorithm> // For std::max
#include <limits>    // For std::numeric_limits

class Solution {
public:
    int maxLevelSum(TreeNode* root) {
        if (root == nullptr) {
            return 0; // As per LeetCode problem constraints, level starts from 1. If root is null, no levels, so 0 or handle as per problem spec. Some problems expect 1 if root has value 0. Assume 0 for no levels.
        }

        std::queue<TreeNode*> nodeQueue;
        nodeQueue.push(root);

        int maxLevel = 1; // Level number starts from 1
        long long currentMaxSum = std::numeric_limits<long long>::min(); // Use long long for sum to avoid overflow with many nodes/large values
        int currentLevelNum = 0;

        while (!nodeQueue.empty()) {
            currentLevelNum++;
            long long currentLevelSum = 0; // Use long long for sum

            int currentSize = nodeQueue.size();

            for (int i = 0; i < currentSize; ++i) {
                TreeNode* currentNode = nodeQueue.front();
                nodeQueue.pop();

                currentLevelSum += currentNode->val;

                if (currentNode->left != nullptr) {
                    nodeQueue.push(currentNode->left);
                }
                if (currentNode->right != nullptr) {
                    nodeQueue.push(currentNode->right);
                }
            }

            // Important: if sums can be negative, compare and update correctly
            // The problem statement says -10^5 <= Node.val <= 10^5, so sums can be negative.
            // A level with sum -500 is "greater" than a level with sum -1000.
            if (currentLevelSum > currentMaxSum) {
                currentMaxSum = currentLevelSum;
                maxLevel = currentLevelNum;
            }
        }
        return maxLevel;
    }
};
```

**Time complexity:** O(N)

**Space complexity:** O(N)