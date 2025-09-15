Link: https://neetcode.io/problems/foreign-dictionary?list=neetcode150  
https://leetcode.com/problems/alien-dictionary/description/

I was not able to solve it.

**Depth First Search**

```cpp
class Solution {
public:
    unordered_map<char, unordered_set<char>> adj;
    unordered_map<char, bool> visited;
    string result;

    string foreignDictionary(vector<string>& words) {
        for (const auto& word : words) {
            for (char ch : word) {
                adj[ch];
            }
        }

        for (size_t i = 0; i < words.size() - 1; ++i) {
            const string& w1 = words[i], & w2 = words[i + 1];
            size_t minLen = min(w1.length(), w2.length());
            if (w1.length() > w2.length() &&
                w1.substr(0, minLen) == w2.substr(0, minLen)) {
                return "";
            }
            for (size_t j = 0; j < minLen; ++j) {
                if (w1[j] != w2[j]) {
                    adj[w1[j]].insert(w2[j]);
                    break;
                }
            }
        }

        for (const auto& pair : adj) {
            if (dfs(pair.first)) {
                return "";
            }
        }

        reverse(result.begin(), result.end());
        return result;
    }

    bool dfs(char ch) {
        if (visited.find(ch) != visited.end()) {
            return visited[ch];
        }

        visited[ch] = true;
        for (char next : adj[ch]) {
            if (dfs(next)) {
                return true;
            }
        }
        visited[ch] = false;
        result.push_back(ch);
        return false;
    }
};
```

**Time complexity:** O(N+V+E), where V is the number of unique characters, E is the number of edges and N is the sum of lengths of all the strings.

**Space complexity:** O(V+E)

**Topological Sort (Kahn's Algorithm)**

```cpp
class Solution {
public:
    string foreignDictionary(vector<string>& words) {
        unordered_map<char, unordered_set<char>> adj;
        unordered_map<char, int> indegree;
        for (string w : words) {
            for (char c : w) {
                adj[c] = unordered_set<char>();
                indegree[c] = 0;
            }
        }

        for (int i = 0; i < words.size() - 1; i++) {
            string w1 = words[i], w2 = words[i + 1];
            int minLen = min(w1.size(), w2.size());
            if (w1.size() > w2.size() &&
                w1.substr(0, minLen) == w2.substr(0, minLen)) {
                return "";
            }
            for (int j = 0; j < minLen; j++) {
                if (w1[j] != w2[j]) {
                    if (!adj[w1[j]].count(w2[j])) {
                        adj[w1[j]].insert(w2[j]);
                        indegree[w2[j]]++;
                    }
                    break;
                }
            }
        }

        queue<char> q;
        for (auto &[c, deg] : indegree) {
            if (deg == 0) {
                q.push(c);
            }
        }

        string res;
        while (!q.empty()) {
            char char_ = q.front();
            q.pop();
            res += char_;
            for (char neighbor : adj[char_]) {
                indegree[neighbor]--;
                if (indegree[neighbor] == 0) {
                    q.push(neighbor);
                }
            }
        }

        return res.size() == indegree.size() ? res : "";
    }
};
```

**Time complexity:** O(N+V+E), where V is the number of unique characters, E is the number of edges and N is the sum of lengths of all the strings.

**Space complexity:** O(V+E)