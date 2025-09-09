Link: https://leetcode.com/problems/course-schedule-ii/description/

I was not able to solve it.

**DFS**

```cpp
class Solution {
public:
    vector<int> findOrder(int numCourses, vector<vector<int>>& prerequisites) {
        unordered_map<int, vector<int>> prereq;
        for (const auto& pair : prerequisites) {
            prereq[pair[0]].push_back(pair[1]);
        }

        vector<int> output;
        unordered_set<int> visit;
        unordered_set<int> cycle;

        for (int course = 0; course < numCourses; course++) {
            if (!dfs(course, prereq, visit, cycle, output)) {
                return {};
            }
        }

        return output;
    }

private:
    bool dfs(int course, const unordered_map<int, vector<int>>& prereq,
             unordered_set<int>& visit, unordered_set<int>& cycle,
             vector<int>& output) {

        if (cycle.count(course)) {
            return false;
        }
        if (visit.count(course)) {
            return true;
        }

        cycle.insert(course);
        if (prereq.count(course)) {
            for (int pre : prereq.at(course)) {
                if (!dfs(pre, prereq, visit, cycle, output)) {
                    return false;
                }
            }
        }
        cycle.erase(course);
        visit.insert(course);
        output.push_back(course);
        return true;
    }
};
```

**Time complexity:** O(V+E), where V is the number of courses and E is the number of prerequisites.

**Space complexity:** O(V+E)


**Topological Sort (Kahn's Algorithm)**

```cpp
class Solution {
public:
    vector<int> findOrder(int numCourses, vector<vector<int>>& prerequisites) {
        vector<int> indegree(numCourses, 0);
        vector<vector<int>> adj(numCourses);

        for (auto& pre : prerequisites) {
            indegree[pre[1]]++;
            adj[pre[0]].push_back(pre[1]);
        }

        queue<int> q;
        for (int i = 0; i < numCourses; ++i) {
            if (indegree[i] == 0) {
                q.push(i);
            }
        }

        int finish = 0;
        vector<int> output(numCourses);
        while (!q.empty()) {
            int node = q.front();q.pop();
            output[numCourses - finish - 1] = node;
            finish++;
            for (int nei : adj[node]) {
                indegree[nei]--;
                if (indegree[nei] == 0) {
                    q.push(nei);
                }
            }
        }

        if (finish != numCourses) {
            return {};
        }
        return output;
    }
};
```

**Time complexity:** O(V+E), where V is the number of courses and E is the number of prerequisites.

**Space complexity:** O(V+E)