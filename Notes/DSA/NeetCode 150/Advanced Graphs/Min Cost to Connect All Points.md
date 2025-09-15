Link: https://leetcode.com/problems/min-cost-to-connect-all-points/description/

I was not able to solve it.

**Kruskal's Algorithm**

```cpp
class DSU {
public:
    vector<int> Parent, Size;

    DSU(int n) : Parent(n + 1), Size(n + 1, 1) {
        for (int i = 0; i <= n; ++i) Parent[i] = i;
    }

    int find(int node) {
        if (Parent[node] != node) {
            Parent[node] = find(Parent[node]);
        }
        return Parent[node];
    }

    bool unionSets(int u, int v) {
        int pu = find(u), pv = find(v);
        if (pu == pv) return false;
        if (Size[pu] < Size[pv]) swap(pu, pv);
        Size[pu] += Size[pv];
        Parent[pv] = pu;
        return true;
    }
};

class Solution {
public:
    int minCostConnectPoints(vector<vector<int>>& points) {
        int n = points.size();
        DSU dsu(n);
        vector<array<int, 3>> edges;

        for (int i = 0; i < n; ++i) {
            for (int j = i + 1; j < n; ++j) {
                int dist = abs(points[i][0] - points[j][0]) +
                           abs(points[i][1] - points[j][1]);
                edges.push_back({dist, i, j});
            }
        }

        sort(edges.begin(), edges.end());
        int res = 0;

        for (auto& [dist, u, v] : edges) {
            if (dsu.unionSets(u, v)) {
                res += dist;
            }
        }
        return res;
    }
};
```

**Time complexity:** O($n^{2} log n $)

**Space complexity:** O($n^{2}$)

**Prim's Algorithm**

```cpp
class Solution {
public:
    int minCostConnectPoints(vector<vector<int>>& points) {
        int N = points.size();
        unordered_map<int, vector<pair<int, int>>> adj;
        for (int i = 0; i < N; i++) {
            int x1 = points[i][0];
            int y1 = points[i][1];
            for (int j = i + 1; j < N; j++) {
                int x2 = points[j][0];
                int y2 = points[j][1];
                int dist = abs(x1 - x2) + abs(y1 - y2);
                adj[i].push_back({dist, j});
                adj[j].push_back({dist, i});
            }
        }

        int res = 0;
        unordered_set<int> visit;
        priority_queue<pair<int, int>, vector<pair<int, int>>,
                                greater<pair<int, int>>> minH;
        minH.push({0, 0});
        while (visit.size() < N) {
            auto curr = minH.top();
            minH.pop();
            int cost = curr.first;
            int i = curr.second;
            if (visit.count(i)) {
                continue;
            }
            res += cost;
            visit.insert(i);
            for (const auto& nei : adj[i]) {
                int neiCost = nei.first;
                int neiIndex = nei.second;
                if (!visit.count(neiIndex)) {
                    minH.push({neiCost, neiIndex});
                }
            }
        }
        return res;
    }
};
```

**Time complexity:** O($n^{2} log n $)

**Space complexity:** O($n^{2}$)

**Prim's Algorithm (Optimal)**

```cpp
class Solution {
public:
    int minCostConnectPoints(vector<vector<int>>& points) {
        int n = points.size(), node = 0;
        vector<int> dist(n, 100000000);
        vector<bool> visit(n, false);
        int edges = 0, res = 0;

        while (edges < n - 1) {
            visit[node] = true;
            int nextNode = -1;
            for (int i = 0; i < n; i++) {
                if (visit[i]) continue;
                int curDist = abs(points[i][0] - points[node][0]) +
                               abs(points[i][1] - points[node][1]);
                dist[i] = min(dist[i], curDist);
                if (nextNode == -1 || dist[i] < dist[nextNode]) {
                    nextNode = i;
                }
            }
            res += dist[nextNode];
            node = nextNode;
            edges++;
        }
        return res;
    }
};
```

**Time complexity:** O($n^{2}$)

**Space complexity:** O(n)