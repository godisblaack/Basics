Link: https://leetcode.com/problems/serialize-and-deserialize-binary-tree/description/

I was not able to solve it.

**Level-order solution**

```cpp
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
 * };
 */
class Codec {
public:
    // Encodes a tree to a single string.
    string serialize(TreeNode* root) {
        if (!root) {
            return "null";
        }
        string result = "";
        queue<TreeNode*> q;
        q.push(root);
        result += to_string(root->val) + ",";

        while (!q.empty()) {
            TreeNode* node = q.front();
            q.pop();

            if (node->left) {
                q.push(node->left);
                result += to_string(node->left->val) + ",";
            } else {
                result += "null,";
            }

            if (node->right) {
                q.push(node->right);
                result += to_string(node->right->val) + ",";
            } else {
                result += "null,";
            }
        }
        return result.substr(0, result.length() - 1);
    }

    // Decodes your encoded data to tree.
    TreeNode* deserialize(string data) {
        if (data == "null") {
            return NULL;
        }

        stringstream ss(data);
        string item;
        getline(ss, item, ',');
        TreeNode* root = new TreeNode(stoi(item));
        queue<TreeNode*> q;
        q.push(root);

        while (!q.empty()) {
            TreeNode* parent = q.front();
            q.pop();

            if (getline(ss, item, ',')) {
                if (item != "null") {
                    parent->left = new TreeNode(stoi(item));
                    q.push(parent->left);
                }
            }

            if (getline(ss, item, ',')) {
                if (item != "null") {
                    parent->right = new TreeNode(stoi(item));
                    q.push(parent->right);
                }
            }
        }
        return root;
    }
};

// Your Codec object will be instantiated and called as such:
// Codec ser, deser;
// TreeNode* ans = deser.deserialize(ser.serialize(root));
```

**Time complexity:** O(N)

**Space complexity:** O(N)

**Pre-order solution**

```cpp
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
 * };
 */
class Codec {
private:
    // Recursive helper function for serialization
    void serializeHelper(TreeNode* root, string& result) {
        if (!root) {
            result += "null,";
            return;
        }
        result += to_string(root->val) + ",";
        serializeHelper(root->left, result);
        serializeHelper(root->right, result);
    }

    // Recursive helper function for deserialization
    TreeNode* deserializeHelper(vector<string>& nodes) {
        if (nodes.empty() || nodes[0] == "null") {
            if (!nodes.empty()) {
                nodes.erase(nodes.begin());
            }
            return NULL;
        }

        TreeNode* root = new TreeNode(stoi(nodes[0]));
        nodes.erase(nodes.begin());
        root->left = deserializeHelper(nodes);
        root->right = deserializeHelper(nodes);
        return root;
    }

public:
    // Encodes a tree to a single string.
    string serialize(TreeNode* root) {
        string result = "";
        serializeHelper(root, result);
        return result.substr(0, result.length() - 1);
    }

    // Decodes your encoded data to tree.
    TreeNode* deserialize(string data) {
        if (data.empty()) {
            return NULL;
        }
        stringstream ss(data);
        string item;
        vector<string> nodes;
        while (getline(ss, item, ',')) {
            nodes.push_back(item);
        }
        return deserializeHelper(nodes);
    }
};

// Your Codec object will be instantiated and called as such:
// Codec ser, deser;
// TreeNode* ans = deser.deserialize(ser.serialize(root));
```

**Time complexity:** O(N)

**Space complexity:** O(N)