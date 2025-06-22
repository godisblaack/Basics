Link: https://leetcode.com/problems/longest-zigzag-path-in-a-binary-tree/description/

I was not able to solve this. Code without comments is at the end.

**Brute force solution**

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
private:
    int global_max_length;

    // Helper DFS function to calculate a zigzag path starting from 'node'
    // 'go_left' indicates if the next required move is to the left
    // 'current_length' is the length of the zigzag path ending at 'node'
    void calculateZigZag(TreeNode* node, bool go_left, int current_length) {
        if (node == nullptr) {
            return;
        }

        // Update the global maximum length found so far
        global_max_length = std::max(global_max_length, current_length);

        if (go_left) {
            // Current path wants to go left (from previous right move)
            if (node->left) {
                // Continue zigzag: move left, next expected move is right
                calculateZigZag(node->left, false, current_length + 1);
            }
            // Break zigzag: if we went left previously, moving right now starts a new zigzag of length 1
            if (node->right) {
                calculateZigZag(node->right, true, 1);
            }
        } else {
            // Current path wants to go right (from previous left move)
            if (node->right) {
                // Continue zigzag: move right, next expected move is left
                calculateZigZag(node->right, true, current_length + 1);
            }
            // Break zigzag: if we went right previously, moving left now starts a new zigzag of length 1
            if (node->left) {
                calculateZigZag(node->left, false, 1);
            }
        }
    }

    // Helper function to traverse all nodes and start zigzag calculations from each
    void traverseAndCalculate(TreeNode* node) {
        if (node == nullptr) {
            return;
        }

        // From the current node, start a zigzag path attempting to go left (initial length 0,
        // because the first move will make it 1)
        if (node->left) {
            calculateZigZag(node->left, false, 1); // Started with a left move, next is right
        } else {
            // If no left child, we still consider a path of length 0 (just this node).
            // This is already covered by global_max_length being initialized to 0
            // or implicitly updated by paths that end immediately.
        }

        // From the current node, start a zigzag path attempting to go right (initial length 0)
        if (node->right) {
            calculateZigZag(node->right, true, 1); // Started with a right move, next is left
        } else {
            // Same as above for right child.
        }

        // Recursively visit children to ensure all nodes are considered as starting points
        traverseAndCalculate(node->left);
        traverseAndCalculate(node->right);
    }

public:
    int longestZigZag(TreeNode* root) {
        global_max_length = 0; // Reset for each call

        if (root == nullptr) {
            return 0;
        }

        // A single node has a path length of 0.
        // Paths are "number of nodes visited - 1".
        // If the tree is just root, it's 0.
        // We set global_max_length to 0 initially.
        // The calculateZigZag function updates global_max_length based on current_length,
        // so if the path is 1->left->2 (length 1), it will be covered.

        // The initial calls need to account for starting a path *from* the root.
        // We consider root itself as a path of length 0, so initialize global_max_length = 0.
        // Then, we call calculateZigZag for paths starting from root's children,
        // implying the path already moved *from* root to its child.
        if (root->left) {
            calculateZigZag(root->left, false, 1); // move to left, next is right
        }
        if (root->right) {
            calculateZigZag(root->right, true, 1); // move to right, next is left
        }

        // Now, we need to ensure every node is considered as a potential starting point for a path
        // that doesn't necessarily start from the root.
        // This is where the outer traversal (`traverseAndCalculate`) comes in for the true brute-force.
        traverseAndCalculate(root);

        return global_max_length;
    }
};
```

**Time complexity:** O($N^{2}$)

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
private:
    int global_max_length;

    // DFS function to traverse the tree and find the longest zigzag path.
    // 'node': The current node.
    // 'go_left': True if the last move to 'node' was from its parent's RIGHT child,
    //            meaning the next desired zigzag move is LEFT.
    //            False if the last move to 'node' was from its parent's LEFT child,
    //            meaning the next desired zigzag move is RIGHT.
    // 'current_length': The length of the zigzag path ending at 'node'.
    void dfs(TreeNode* node, bool go_left, int current_length) {
        if (node == nullptr) {
            return;
        }

        // Update the global maximum length found so far
        global_max_length = std::max(global_max_length, current_length);

        if (go_left) { // Last move was to the right, next desired move is LEFT
            // Try to continue the zigzag path by going left
            if (node->left) {
                dfs(node->left, false, current_length + 1);
            }
            // If we cannot go left to continue, or if we want to explore a new path,
            // we start a new zigzag path from node's right child.
            // The length of this new path is 1 (the node itself, plus the move to the child).
            if (node->right) {
                dfs(node->right, true, 1);
            }
        } else { // Last move was to the left, next desired move is RIGHT
            // Try to continue the zigzag path by going right
            if (node->right) {
                dfs(node->right, true, current_length + 1);
            }
            // If we cannot go right to continue, or if we want to explore a new path,
            // we start a new zigzag path from node's left child.
            // The length of this new path is 1.
            if (node->left) {
                dfs(node->left, false, 1);
            }
        }
    }

public:
    int longestZigZag(TreeNode* root) {
        global_max_length = 0; // Initialize global max length

        if (root == nullptr) {
            return 0; // Empty tree, no path
        }

        // From the root, we can start a path by going left or by going right.
        // Each of these starts a new zigzag path of length 1 (the move to the child).
        // The 'false' for left child means the "last move" to `root->left` was from `root`
        // as a 'left' move. So, the *next* zigzag move should be 'right'.
        // The 'true' for right child means the "last move" to `root->right` was from `root`
        // as a 'right' move. So, the *next* zigzag move should be 'left'.
        dfs(root->left, false, 1);
        dfs(root->right, true, 1);

        // A single node has a zigzag length of 0. If the tree has only one node,
        // and no paths are found (e.g., if root has no children), global_max_length
        // would still be 0. So, this correctly handles the single node case.

        return global_max_length;
    }
};
```

**Time complexity:** O(N)

**Space complexity:** O(N)

**Solutions without comments**

**Brute force solution**

```cpp
#include <algorithm>
#include <utility>

class SolutionBruteForce {
private:
    int global_max_length;

    void calculateZigZag(TreeNode* node, bool go_left, int current_length) {
        if (node == nullptr) {
            return;
        }

        global_max_length = std::max(global_max_length, current_length);

        if (go_left) {
            if (node->left) {
                calculateZigZag(node->left, false, current_length + 1);
            }
            if (node->right) {
                calculateZigZag(node->right, true, 1);
            }
        } else {
            if (node->right) {
                calculateZigZag(node->right, true, current_length + 1);
            }
            if (node->left) {
                calculateZigZag(node->left, false, 1);
            }
        }
    }

    void traverseAndCalculate(TreeNode* node) {
        if (node == nullptr) {
            return;
        }

        if (node->left) {
            calculateZigZag(node->left, false, 1);
        }
        if (node->right) {
            calculateZigZag(node->right, true, 1);
        }

        traverseAndCalculate(node->left);
        traverseAndCalculate(node->right);
    }

public:
    int longestZigZag(TreeNode* root) {
        global_max_length = 0;

        if (root == nullptr) {
            return 0;
        }

        traverseAndCalculate(root);

        return global_max_length;
    }
};
```

**Time complexity:** O($N^{2}$)

**Space complexity:** O(N)

**Optimized solution**

```cpp
#include <algorithm>
#include <utility>

class SolutionBetter {
private:
    int global_max_length;

    void dfs(TreeNode* node, bool go_left, int current_length) {
        if (node == nullptr) {
            return;
        }

        global_max_length = std::max(global_max_length, current_length);

        if (go_left) {
            if (node->left) {
                dfs(node->left, false, current_length + 1);
            }
            if (node->right) {
                dfs(node->right, true, 1);
            }
        } else {
            if (node->right) {
                dfs(node->right, true, current_length + 1);
            }
            if (node->left) {
                dfs(node->left, false, 1);
            }
        }
    }

public:
    int longestZigZag(TreeNode* root) {
        global_max_length = 0;

        if (root == nullptr) {
            return 0;
        }

        dfs(root->left, false, 1);
        dfs(root->right, true, 1);

        return global_max_length;
    }
};
```

**Time complexity:** O(N)

**Space complexity:** O(N)