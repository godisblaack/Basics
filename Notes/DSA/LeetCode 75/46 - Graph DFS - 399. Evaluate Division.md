Link: https://leetcode.com/problems/evaluate-division/description/

I was not able to solve it.

**DFS solution**

```cpp
class Solution {
public:
    unordered_map<string, vector<pair<string, double>>> graph;

    vector<double> calcEquation(vector<vector<string>>& equations, vector<double>& values, vector<vector<string>>& queries) {
        for (int i = 0; i < equations.size(); i++) {
            string A = equations[i][0], B = equations[i][1];
            graph[A].push_back({B, values[i]});
            graph[B].push_back({A, 1.0 / values[i]});
        }

        vector<double> results;
        for (auto& query : queries) {
            unordered_set<string> visited;
            results.push_back(dfs(query[0], query[1], visited));
        }

        return results;
    }

    double dfs(string src, string dest, unordered_set<string>& visited) {
        if (graph.find(src) == graph.end() || graph.find(dest) == graph.end()) return -1.0;
        if (src == dest) return 1.0;

        visited.insert(src);
        
        for (auto& neighbor : graph[src]) {
            if (visited.find(neighbor.first) == visited.end()) {
                double result = dfs(neighbor.first, dest, visited);
                if (result != -1.0) return neighbor.second * result;
            }
        }
        
        return -1.0;
    }
};
```

**Time complexity:** O(N + E) 

**Space complexity:** O(N)

**BFS solution**

```cpp
class Solution {
public:
    unordered_map<string, vector<pair<string, double>>> graph;

    double bfs(string src, string dest) {
        if (graph.find(src) == graph.end() || graph.find(dest) == graph.end()) return -1.0;
        if (src == dest) return 1.0;

        queue<pair<string, double>> q;
        unordered_set<string> visited;
        q.push({src, 1.0});
        visited.insert(src);

        while (!q.empty()) {
            auto [node, value] = q.front();
            q.pop();

            if (node == dest) return value;

            for (auto& neighbor : graph[node]) {
                if (visited.find(neighbor.first) == visited.end()) {
                    visited.insert(neighbor.first);
                    q.push({neighbor.first, value * neighbor.second});
                }
            }
        }

        return -1.0;
    }

    vector<double> calcEquation(vector<vector<string>>& equations, vector<double>& values, vector<vector<string>>& queries) {
        for (int i = 0; i < equations.size(); i++) {
            string A = equations[i][0], B = equations[i][1];
            graph[A].push_back({B, values[i]});
            graph[B].push_back({A, 1.0 / values[i]});
        }

        vector<double> results;
        for (auto& query : queries) {
            results.push_back(bfs(query[0], query[1]));
        }

        return results;
    }
};
```

**Time complexity:** O(N + E) 

**Space complexity:** O(N)