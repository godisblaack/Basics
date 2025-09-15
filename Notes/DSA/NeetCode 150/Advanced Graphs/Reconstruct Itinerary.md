Link: https://leetcode.com/problems/reconstruct-itinerary/description/

I was not able to solve it.

**DFS**

```cpp
class Solution {
public:
    vector<string> findItinerary(vector<vector<string>>& tickets) {
        unordered_map<string, vector<string>> adj;
        for (auto& ticket : tickets) {
            adj[ticket[0]];
        }

        sort(tickets.begin(), tickets.end());
        for (auto& ticket : tickets) {
            adj[ticket[0]].push_back(ticket[1]);
        }

        vector<string> res = {"JFK"};
        dfs("JFK", res, adj, tickets.size() + 1);
        return res;
    }

private:
    bool dfs(const string& src, vector<string>& res,
             unordered_map<string, vector<string>>& adj, int targetLen) {
        if (res.size() == targetLen) {
            return true;
        }

        if (adj.find(src) == adj.end()) {
            return false;
        }

        vector<string> temp = adj[src];
        for (int i = 0; i < temp.size(); ++i) {
            string v = temp[i];
            adj[src].erase(adj[src].begin() + i);
            res.push_back(v);
            if (dfs(v, res, adj, targetLen)) return true;
            adj[src].insert(adj[src].begin() + i, v);
            res.pop_back();
        }
        return false;
    }
};
```

**Time complexity:** O(E ∗ V), where E is the number of tickets (edges) and V is the number of airports (vertices).

**Space complexity:** O(E ∗ V)

**Hierholzer's Algorithm (Recursion)**

```cpp
class Solution {
public:
    vector<string> findItinerary(vector<vector<string>>& tickets) {
        unordered_map<string, deque<string>> adj;
        for (auto& ticket : tickets) {
            adj[ticket[0]].push_back(ticket[1]);
        }
        for (auto& [src, dests] : adj) {
            sort(dests.rbegin(), dests.rend());
        }

        vector<string> res;
        dfs("JFK", adj, res);
        reverse(res.begin(), res.end());
        return res;
    }

private:
    void dfs(const string& src, unordered_map<string,
             deque<string>>& adj, vector<string>& res) {
        while (!adj[src].empty()) {
            string dst = adj[src].back();
            adj[src].pop_back();
            dfs(dst, adj, res);
        }
        res.push_back(src);
    }
};
```

**Time complexity:** O(E log E), where E is the number of tickets (edges) and V is the number of airports (vertices).

**Space complexity:** O(E)

**Hierholzer's Algorithm (Iteration)**

```cpp
class Solution {
public:
    vector<string> findItinerary(vector<vector<string>>& tickets) {
        unordered_map<string, vector<string>> adj;
        for (const auto& ticket : tickets) {
            adj[ticket[0]].push_back(ticket[1]);
        }
        for (auto& [src, destinations] : adj) {
            sort(destinations.rbegin(), destinations.rend());
        }

        vector<string> res;
        stack<string> stk;
        stk.push("JFK");

        while (!stk.empty()) {
            string curr = stk.top();
            if (adj[curr].empty()) {
                res.push_back(curr);
                stk.pop();
            } else {
                string next = adj[curr].back();
                adj[curr].pop_back();
                stk.push(next);
            }
        }

        reverse(res.begin(), res.end());
        return res;
    }
};
```

**Time complexity:** O(E log E), where E is the number of tickets (edges) and V is the number of airports (vertices).

**Space complexity:** O(E)