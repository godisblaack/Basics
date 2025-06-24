Link: https://leetcode.com/problems/reorder-routes-to-make-all-paths-lead-to-the-city-zero/description/

I was not able to pass the last 2 test cases.

**DFS solution**

```cpp
class Solution {
public:
    int minReorder(int n, vector<vector<int>>& connections) {
        vector<vector<int>> adj(n);
        unordered_set<string> originalEdges;

        // Build adjacency list
        for (auto& conn : connections) {
            adj[conn[0]].push_back(conn[1]);
            adj[conn[1]].push_back(conn[0]);  // Make the graph **undirected** for traversal
            originalEdges.insert(to_string(conn[0]) + "-" + to_string(conn[1]));  // Track directed edges
        }

        queue<int> q;
        vector<bool> visited(n, false);
        int swapCount = 0;

        q.push(0); // Start BFS from node 0
        visited[0] = true;

        while (!q.empty()) {
            int node = q.front();
            q.pop();

            for (int neighbor : adj[node]) {
                if (!visited[neighbor]) {
                    string edge = to_string(node) + "-" + to_string(neighbor);
                    if (originalEdges.find(edge) != originalEdges.end()) {
                        swapCount++;  // Reverse the edge if it's originally directed away from 0
                    }
                    visited[neighbor] = true;
                    q.push(neighbor);
                }
            }
        }

        return swapCount;
    }
};
```

**Time complexity:** O(N + E) 

**Space complexity:** O(N + E)