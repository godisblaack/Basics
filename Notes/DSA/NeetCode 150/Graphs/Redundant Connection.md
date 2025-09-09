Link: https://leetcode.com/problems/redundant-connection/description/

I was not able to solve it.

**DFS**

```cpp
class Solution {
public:
    vector<int> findRedundantConnection(vector<vector<int>>& edges) {
        int n = edges.size();
        vector<vector<int>> adj(n + 1);

        for (const auto& edge : edges) {
            int u = edge[0], v = edge[1];
            adj[u].push_back(v);
            adj[v].push_back(u);
            vector<bool> visit(n + 1, false);

            if (dfs(u, -1, adj, visit)) {
                return {u, v};
            }
        }
        return {};
    }

private:
    bool dfs(int node, int parent,
             vector<vector<int>>& adj, vector<bool>& visit) {
        if (visit[node]) return true;
        visit[node] = true;
        for (int nei : adj[node]) {
            if (nei == parent) continue;
            if (dfs(nei, node, adj, visit)) return true;
        }
        return false;
    }
};
```

**Time complexity:** O(E∗(V+E))

**Space complexity:** O(V+E), where V is the number of vertices and E is the number of edges in the graph.

**DFS optimal**

```cpp
class Solution {
    vector<bool> visit;
    vector<vector<int>> adj;
    unordered_set<int> cycle;
    int cycleStart;
public:
    vector<int> findRedundantConnection(vector<vector<int>>& edges) {
        int n = edges.size();
        adj.resize(n + 1);
        for (auto& edge : edges) {
            int u = edge[0], v = edge[1];
            adj[u].push_back(v);
            adj[v].push_back(u);
        }

        visit.resize(n + 1, false);
        cycleStart = -1;
        dfs(1, -1);

        for (int i = edges.size() - 1; i >= 0; i--) {
            int u = edges[i][0], v = edges[i][1];
            if (cycle.count(u) && cycle.count(v)) {
                return {u, v};
            }
        }
        return {};
    }

private:
    bool dfs(int node, int par) {
        if (visit[node]) {
            cycleStart = node;
            return true;
        }
        visit[node] = true;
        for (int nei : adj[node]) {
            if (nei == par) continue;
            if (dfs(nei, node)) {
                if (cycleStart != -1) cycle.insert(node);
                if (node == cycleStart) {
                    cycleStart = -1;
                }
                return true;
            }
        }
        return false;
    }
};
```

**Time complexity:** O(V+E), where V is the number of vertices and E is the number of edges.

**Space complexity:** O(V+E)

**Topological Sort (Kahn's Algorithm)**

```cpp
class Solution {
public:
    vector<int> findRedundantConnection(vector<vector<int>>& edges) {
        int n = edges.size();
        vector<int> indegree(n + 1, 0);
        vector<vector<int>> adj(n + 1);
        for (auto& edge : edges) {
            int u = edge[0], v = edge[1];
            adj[u].push_back(v);
            adj[v].push_back(u);
            indegree[u]++;
            indegree[v]++;
        }

        queue<int> q;
        for (int i = 1; i <= n; i++) {
            if (indegree[i] == 1) q.push(i);
        }

        while (!q.empty()) {
            int node = q.front(); q.pop();
            indegree[node]--;
            for (int nei : adj[node]) {
                indegree[nei]--;
                if (indegree[nei] == 1) q.push(nei);
            }
        }

        for (int i = edges.size() - 1; i >= 0; i--) {
            int u = edges[i][0], v = edges[i][1];
            if (indegree[u] == 2 && indegree[v])
                return {u, v};
        }
        return {};
    }
};
```

**Time complexity:** O(V+(E∗α(V)))

**Space complexity:** O(V), where V is the number of vertices and E is the number of edges in the graph. α() is used for amortized complexity.