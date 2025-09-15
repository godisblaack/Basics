Link: https://leetcode.com/problems/cheapest-flights-within-k-stops/description/

I was not able to solve it.

**Dijkstra's Algorithm**

```cpp
class Solution {
public:
    int findCheapestPrice(int n, vector<vector<int>>& flights, int src, int dst, int k) {
        int INF = 1e9;
        vector<vector<pair<int, int>>> adj(n);
        vector<vector<int>> dist(n, vector<int>(k + 5, INF));

        for (auto& flight : flights) {
            adj[flight[0]].emplace_back(flight[1], flight[2]);
        }

        dist[src][0] = 0;
        priority_queue<tuple<int, int, int>,
                       vector<tuple<int, int, int>>, greater<>> minHeap;
        minHeap.emplace(0, src, -1);

        while (!minHeap.empty()) {
            auto [cst, node, stops] = minHeap.top();
            minHeap.pop();
            if (node == dst) return cst;
            if (stops == k || dist[node][stops + 1] < cst) continue;
            for (auto& [nei, w] : adj[node]) {
                int nextCst = cst + w;
                int nextStops = stops + 1;
                if (dist[nei][nextStops + 1] > nextCst) {
                    dist[nei][nextStops + 1] = nextCst;
                    minHeap.emplace(nextCst, nei, nextStops);
                }
            }
        }
        return -1;
    }
};
```

**Time complexity:** O((n+m)∗k), where n is the number of cities, m is the number of flights and k is the number of stops.

**Space complexity:** O(n∗k)

**Bellman Ford Algorithm**

```cpp
class Solution {
public:
    int findCheapestPrice(int n, vector<vector<int>>& flights, int src, int dst, int k) {
        vector<int> prices(n, INT_MAX);
        prices[src] = 0;

        for (int i = 0; i <= k; i++) {
            vector<int> tmpPrices = prices;

            for (const auto& flight : flights) {
                int s = flight[0];
                int d = flight[1];
                int p = flight[2];

                if (prices[s] == INT_MAX)
                    continue;

                if (prices[s] + p < tmpPrices[d])
                    tmpPrices[d] = prices[s] + p;
            }

            prices = tmpPrices;
        }

        return prices[dst] == INT_MAX ? -1 : prices[dst];
    }
};
```

**Time complexity:** O(n+(m∗k)), where n is the number of cities, m is the number of flights and k is the number of stops.

**Space complexity:** O(n)

**Shortest Path Faster Algorithm**

```cpp
class Solution {
public:
    int findCheapestPrice(int n, vector<vector<int>>& flights, int src, int dst, int k) {
        vector<int> prices(n, INT_MAX);
        prices[src] = 0;
        vector<vector<pair<int, int>>> adj(n);
        for (const auto& flight : flights) {
            adj[flight[0]].emplace_back(flight[1], flight[2]);
        }

        queue<tuple<int, int, int>> q;
        q.push({0, src, 0});

        while (!q.empty()) {
            auto [cst, node, stops] = q.front();
            q.pop();
            if (stops > k) continue;

            for (const auto& neighbor : adj[node]) {
                int nei = neighbor.first, w = neighbor.second;
                int nextCost = cst + w;
                if (nextCost < prices[nei]) {
                    prices[nei] = nextCost;
                    q.push({nextCost, nei, stops + 1});
                }
            }
        }
        return prices[dst] == INT_MAX ? -1 : prices[dst];
    }
};
```

**Time complexity:** O(n∗k), where n is the number of cities, m is the number of flights and k is the number of stops.

**Space complexity:** O(n+m)