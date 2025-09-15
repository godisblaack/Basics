Link: https://leetcode.com/problems/network-delay-time/description/

**Depth First Search (DFS)**

```cpp
class Solution {
public:
    int networkDelayTime(vector<vector<int>>& times, int n, int k) {
        unordered_map<int, vector<pair<int, int>>> adj;
        for (auto& time : times) {
            adj[time[0]].emplace_back(time[1], time[2]);
        }

        vector<int> dist(n + 1, INT_MAX);
        dfs(k, 0, adj, dist);

        int res = *max_element(dist.begin() + 1, dist.end());
        return res == INT_MAX ? -1 : res;
    }

private:
    void dfs(int node, int time,
             unordered_map<int, vector<pair<int, int>>>& adj,
             vector<int>& dist) {
        if (time >= dist[node]) return;
        dist[node] = time;
        for (auto& [nei, w] : adj[node]) {
            dfs(nei, time + w, adj, dist);
        }
    }
};
```

**Time complexity:** O(V * E)

**Space complexity:** O(V + E), where V = vertices, E = edges.

**Floyd–Warshall Algorithm**

```cpp
class Solution {
public:
    int networkDelayTime(vector<vector<int>>& times, int n, int k) {
        int inf = INT_MAX / 2;
        vector<vector<int>> dist(n, vector<int>(n, inf));

        for (int i = 0; i < n; i++)
            dist[i][i] = 0;

        for (auto& time : times) {
            int u = time[0] - 1, v = time[1] - 1, w = time[2];
            dist[u][v] = w;
        }

        for (int mid = 0; mid < n; mid++)
            for (int i = 0; i < n; i++)
                for (int j = 0; j < n; j++)
                    dist[i][j] = min(dist[i][j],
                                     dist[i][mid] + dist[mid][j]);

        int res = *max_element(dist[k-1].begin(), dist[k-1].end());
        return res == inf ? -1 : res;
    }
};
```

**Time complexity:** O($V^{3}$)

**Space complexity:** O($V^{2}$), where V = vertices.

**Bellman–Ford Algorithm**

```cpp
class Solution {
public:
    int networkDelayTime(vector<vector<int>>& times, int n, int k) {
        vector<int> dist(n, INT_MAX);
        dist[k - 1] = 0;

        for (int i = 0; i < n - 1; ++i) {
            for (const auto& time : times) {
                int u = time[0] - 1, v = time[1] - 1, w = time[2];
                if (dist[u] != INT_MAX && dist[u] + w < dist[v]) {
                    dist[v] = dist[u] + w;
                }
            }
        }

        int maxDist = *max_element(dist.begin(), dist.end());
        return maxDist == INT_MAX ? -1 : maxDist;
    }
};
```

 
**Time complexity:** O(V * E)

**Space complexity:** O(V), where V = vertices, E = edges.

**Shortest Path Faster Algorithm (SPFA)**

```cpp
class Solution {
public:
    int networkDelayTime(vector<vector<int>>& times, int n, int k) {
        unordered_map<int, vector<pair<int, int>>> adj;
        for (const auto& time : times) {
            adj[time[0]].emplace_back(time[1], time[2]);
        }

        unordered_map<int, int> dist;
        for (int i = 1; i <= n; ++i) dist[i] = INT_MAX;
        dist[k] = 0;

        queue<pair<int, int>> q;
        q.emplace(k, 0);

        while (!q.empty()) {
            auto [node, time] = q.front();
            q.pop();
            if (dist[node] < time) continue;
            for (const auto& [nei, w] : adj[node]) {
                if (time + w < dist[nei]) {
                    dist[nei] = time + w;
                    q.emplace(nei, time + w);
                }
            }
        }

        int res = 0;
        for (const auto& [node, time] : dist) {
            res = max(res, time);
        }
        return res == INT_MAX ? -1 : res;
    }
};
```

 
**Time complexity:** O(V * E)

**Space complexity:** O(V + E), where V = vertices, E = edges.

**Dijkstra’s Algorithm**

```cpp
class Solution {
public:
    int networkDelayTime(vector<vector<int>>& times, int n, int k) {
        unordered_map<int, vector<pair<int, int>>> edges;
        for (const auto& time : times) {
            edges[time[0]].emplace_back(time[1], time[2]);
        }

        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> minHeap;
        minHeap.push({0, k});

        set<int> visited;
        int t = 0;
        while (!minHeap.empty()) {
            auto curr = minHeap.top();
            minHeap.pop();
            int w1 = curr.first, n1 = curr.second;
            if (visited.count(n1)) {
                continue;
            }
            visited.insert(n1);
            t = w1;

            if (edges.count(n1)) {
                for (const auto& next : edges[n1]) {
                    int n2 = next.first, w2 = next.second;
                    if (!visited.count(n2)) {
                        minHeap.push({w1 + w2, n2});
                    }
                }
            }
        }

        return visited.size() == n ? t : -1;
    }
};
```

**Time complexity:** O(E log V)

**Space complexity:** O(V + E), where V = vertices, E = edges.
