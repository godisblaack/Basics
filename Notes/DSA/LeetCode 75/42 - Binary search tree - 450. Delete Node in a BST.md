Link: https://leetcode.com/problems/delete-node-in-a-bst/description/

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
    TreeNode* parent;
    TreeNode* currentNode;
    TreeNode* newRoot;
    int flag = 0;

public:
    TreeNode* deleteNode(TreeNode* root, int key) {
        parent = root;

        currentNode = searchBST(root, key);

        if (currentNode != nullptr) {
            deleteKey();
            
            if (flag == 1) {
                return nullptr;
            } else if (flag == 2) {
                root = newRoot;
            } else {
                return root;
            }
        }

        return root;
    }

    void deleteKey() {
        if (parent == currentNode && currentNode->left == nullptr && currentNode->right == nullptr) {
            flag = 1;

            return;
        } else if (parent == currentNode) {
            if (currentNode->left != nullptr && currentNode->right != nullptr) {
                currentNode = currentNode->right;

                newRoot = parent->left;

                TreeNode* findPlace = parent->left;

                while(findPlace->right != nullptr) {
                    findPlace = findPlace->right;
                }

                findPlace->right = currentNode;

                flag = 2;

                return;
            } else {
                if (currentNode->left == nullptr) {
                    newRoot = parent->right;
                } else {
                    newRoot = parent->left;
                }

                flag = 2;

                return;
            }
        } else if (currentNode->left == nullptr && currentNode->right == nullptr) {
            if (currentNode == parent->left) {
                parent->left = nullptr;
            } else {
                parent->right = nullptr;
            }

            return;
        }

        if (currentNode == parent->left) {
            if (currentNode->left == nullptr) {
                parent->left = currentNode->right;

                return;
            }

            currentNode = currentNode->right;

            parent->left = parent->left->left;

            TreeNode* findPlace = parent->left;

            while(findPlace->right != nullptr) {
                findPlace = findPlace->right;
            }

            findPlace->right = currentNode;
        } else {
            if (currentNode->right == nullptr) {
                parent->right = currentNode->left;

                return;
            }

            currentNode = currentNode->left;

            parent->right = parent->right->right;

            TreeNode* findPlace = parent->right;

            while(findPlace->left != nullptr) {
                findPlace = findPlace->left;
            }

            findPlace->left = currentNode;
        }
    }

    TreeNode* searchBST(TreeNode* root, int key) {
        if (root == nullptr) {
            return nullptr;
        }

        if (root->val == key) {
            return root;
        } else {
            parent = root;

            if (root->val > key) {
                return searchBST(root->left, key);
            } else {
                return searchBST(root->right, key);
            }
        }
    }
};
```

**Time Complexity:**  
- Best Case: O(1)  
- Worst Case: O(H) (which is O(log N) for balanced, O(N) for skewed)  
- Average Case: O(log N)  

**Space complexity:** O(H), space for the call stack.

This is the **optimized** solution. This not the best way to write it. There are 2 better solution.

**Recursice approach**

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
    // Helper function to find the minimum value node in a subtree
    TreeNode* findMin(TreeNode* node) {
        while (node->left != nullptr) {
            node = node->left;
        }
        return node;
    }

    TreeNode* deleteNode(TreeNode* root, int key) {
        if (root == nullptr) {
            return nullptr;
        }

        // 1. Search for the node to delete
        if (key < root->val) {
            root->left = deleteNode(root->left, key); // Recurse left
        } else if (key > root->val) {
            root->right = deleteNode(root->right, key); // Recurse right
        } else { // Key found: root->val == key
            // 2. Delete the node (handle 3 cases)

            // Case 1: Node has no children or one child
            if (root->left == nullptr) {
                TreeNode* temp = root->right; // Store the right child (or nullptr)
                delete root; // Free memory (important in C++, less so in garbage-collected languages)
                return temp;
            } else if (root->right == nullptr) {
                TreeNode* temp = root->left; // Store the left child
                delete root; // Free memory
                return temp;
            }

            // Case 2: Node has two children
            // Find the inorder successor (smallest in the right subtree)
            TreeNode* successor = findMin(root->right);

            // Copy the successor's value to the current node
            root->val = successor->val;

            // Recursively delete the successor from the right subtree
            // This call will handle Case 1 or Case 2 for the successor itself
            root->right = deleteNode(root->right, successor->val);
        }
        return root; // Return the (potentially updated) root of the current subtree
    }
};
```

**Time complexity:** O(log N)

**Space complexity:** O(N)

**Iterative solution**

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
    // Helper function to find the minimum value node in a subtree
    TreeNode* findMin(TreeNode* node) {
        while (node->left != nullptr) {
            node = node->left;
        }
        return node;
    }

    TreeNode* deleteNode(TreeNode* root, int key) {
        if (root == nullptr) {
            return nullptr;
        }

        // Create a dummy node to simplify handling the root node itself
        // if it needs to be deleted.
        TreeNode* dummy = new TreeNode(0);
        dummy->left = root; // Attach the actual root as the left child of dummy

        TreeNode* parent = dummy;
        TreeNode* current = root;

        // Step 1: Find the node to delete and its parent
        // 'current' will point to the node to be deleted
        // 'parent' will point to the parent of 'current'
        while (current != nullptr && current->val != key) {
            parent = current;
            if (key < current->val) {
                current = current->left;
            } else {
                current = current->right;
            }
        }

        // If key not found, return original root
        if (current == nullptr) {
            // Must clean up the dummy node if it was allocated dynamically
            TreeNode* result = dummy->left;
            delete dummy;
            return result;
        }

        // Key found, 'current' is the node to be deleted.
        // 'parent' is its parent.

        // Case 1 & 2: Node has 0 or 1 child
        TreeNode* nodeToLink;
        if (current->left == nullptr) {
            nodeToLink = current->right;
        } else if (current->right == nullptr) {
            nodeToLink = current->left;
        } else { // Case 3: Node has two children
            // Find inorder successor (smallest in right subtree)
            TreeNode* successor_parent = current;
            TreeNode* successor = current->right;
            while (successor->left != nullptr) {
                successor_parent = successor;
                successor = successor->left;
            }

            // Move successor's value to current node
            current->val = successor->val;

            // Now, effectively delete the successor from its original position.
            // The successor has at most one child (its right child).
            // 'successor_parent' is the parent of 'successor'.
            if (successor_parent->left == successor) { // If successor was a left child
                successor_parent->left = successor->right;
            } else { // If successor was a right child (i.e., current->right was the successor)
                successor_parent->right = successor->right;
            }
            delete successor; // Free successor node
            // The current node's value has been updated, and its right subtree has been modified.
            // We're done with the deletion process for the original 'current' node.
            TreeNode* result = dummy->left;
            delete dummy;
            return result;
        }

        // If we reach here, it's Case 1 or 2 (0 or 1 child)
        // Link the parent to the appropriate child of 'current'
        if (parent->left == current) {
            parent->left = nodeToLink;
        } else { // parent->right == current
            parent->right = nodeToLink;
        }

        delete current; // Free the memory of the deleted node

        TreeNode* result = dummy->left; // The actual root after deletion
        delete dummy;
        return result;
    }
};
```

**Time complexity:** O(log N)

**Space complexity:** O(1)