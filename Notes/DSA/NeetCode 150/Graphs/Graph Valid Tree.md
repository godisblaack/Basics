Link: https://neetcode.io/problems/valid-tree?list=neetcode150  
https://leetcode.com/problems/graph-valid-tree/description/

I was not able to solve it.

**DFS**

```cpp
class Solution {
public:
    bool validTree(int n, vector<vector<int>>& edges) {
        if (edges.size() > n - 1) {
            return false;
        }

        vector<vector<int>> adj(n);
        for (const auto& edge : edges) {
            adj[edge[0]].push_back(edge[1]);
            adj[edge[1]].push_back(edge[0]);
        }

        unordered_set<int> visit;
        if (!dfs(0, -1, visit, adj)) {
            return false;
        }

        return visit.size() == n;
    }

private:
    bool dfs(int node, int parent, unordered_set<int>& visit,
             vector<vector<int>>& adj) {
        if (visit.count(node)) {
            return false;
        }

        visit.insert(node);
        for (int nei : adj[node]) {
            if (nei == parent) {
                continue;
            }
            if (!dfs(nei, node, visit, adj)) {
                return false;
            }
        }
        return true;
    }
};
```

**Time complexity:** O(V+E), where V is the number of vertices and E is the number of edges.

**Space complexity:** O(V+E)

**BFS**

```cpp
class Solution {
public:
    bool validTree(int n, vector<vector<int>>& edges) {
        if (edges.size() > n - 1) {
            return false;
        }

        vector<vector<int>> adj(n);
        for (const auto& edge : edges) {
            adj[edge[0]].push_back(edge[1]);
            adj[edge[1]].push_back(edge[0]);
        }

        unordered_set<int> visit;
        queue<pair<int, int>> q;
        q.push({0, -1});  // {current node, parent node}
        visit.insert(0);

        while (!q.empty()) {
            auto [node, parent] = q.front();
            q.pop();
            for (int nei : adj[node]) {
                if (nei == parent) {
                    continue;
                }
                if (visit.count(nei)) {
                    return false;
                }
                visit.insert(nei);
                q.push({nei, node});
            }
        }

        return visit.size() == n;
    }
};
```

**Time complexity:** O(V+E), where V is the number of vertices and E is the number of edges.

**Space complexity:** O(V+E)

**Disjoint set union**

```cpp
class DSU {
    vector<int> Parent, Size;
    int comps;
public:
    DSU(int n) {
        comps = n;
        Parent.resize(n + 1);
        Size.resize(n + 1);
        for (int i = 0; i <= n; i++) {
            Parent[i] = i;
            Size[i] = 1;
        }
    }

    int find(int node) {
        if (Parent[node] != node) {
            Parent[node] = find(Parent[node]);
        }
        return Parent[node];
    }

    bool unionNodes(int u, int v) {
        int pu = find(u), pv = find(v);
        if (pu == pv) return false;
        if (Size[pu] < Size[pv]) {
            swap(pu, pv);
        }
        comps--;
        Size[pu] += Size[pv];
        Parent[pv] = pu;
        return true;
    }

    int components() {
        return comps;
    }
};

class Solution {
public:
    bool validTree(int n, vector<vector<int>>& edges) {
        if (edges.size() > n - 1) {
            return false;
        }

        DSU dsu(n);
        for (auto& edge : edges) {
            if (!dsu.unionNodes(edge[0], edge[1])) {
                return false;
            }
        }
        return dsu.components() == 1;
    }
};
```

**Time complexity:** O(V+(E∗α(V)))

**Space complexity:** O(V), where V is the number of vertices and E is the number of edges in the graph. α() is used for amortized complexity.