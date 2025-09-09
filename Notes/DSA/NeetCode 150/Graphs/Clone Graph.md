Link: https://leetcode.com/problems/clone-graph/description/

I was not able to solve it.

**DFS solution**

```cpp
/*
// Definition for a Node.
class Node {
public:
    int val;
    vector<Node*> neighbors;
    Node() {
        val = 0;
        neighbors = vector<Node*>();
    }
    Node(int _val) {
        val = _val;
        neighbors = vector<Node*>();
    }
    Node(int _val, vector<Node*> _neighbors) {
        val = _val;
        neighbors = _neighbors;
    }
};
*/

class Solution {
public:
    unordered_map<Node*, Node*> visited; // original → clone

    Node* cloneGraph(Node* node) {
        if (!node) return nullptr;

        // If already cloned, return it
        if (visited.find(node) != visited.end()) {
            return visited[node];
        }

        // Create clone
        Node* cloneNode = new Node(node->val);
        visited[node] = cloneNode;

        // Clone neighbors recursively
        for (auto neighbor : node->neighbors) {
            cloneNode->neighbors.push_back(cloneGraph(neighbor));
        }

        return cloneNode;
    }
};
```

**Time complexity:** O(V + E)

**Space complexity:** O(V)

**BFS solution**

```cpp
/*
// Definition for a Node.
class Node {
public:
    int val;
    vector<Node*> neighbors;
    Node() {
        val = 0;
        neighbors = vector<Node*>();
    }
    Node(int _val) {
        val = _val;
        neighbors = vector<Node*>();
    }
    Node(int _val, vector<Node*> _neighbors) {
        val = _val;
        neighbors = _neighbors;
    }
};
*/

class Solution {
public:
    Node* cloneGraph(Node* node) {
        if (!node) return nullptr;

        unordered_map<Node*, Node*> visited;
        queue<Node*> q;

        // Create clone for the first node
        Node* cloneNode = new Node(node->val);
        visited[node] = cloneNode;
        q.push(node);

        while (!q.empty()) {
            Node* curr = q.front();
            q.pop();

            for (auto neighbor : curr->neighbors) {
                if (visited.find(neighbor) == visited.end()) {
                    // Clone neighbor
                    visited[neighbor] = new Node(neighbor->val);
                    q.push(neighbor);
                }
                // Link the clone of current node to the clone of neighbor
                visited[curr]->neighbors.push_back(visited[neighbor]);
            }
        }

        return cloneNode;
    }
};
```

**Time complexity:** O(V + E)

**Space complexity:** O(V)