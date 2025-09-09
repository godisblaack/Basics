Link: https://leetcode.com/problems/course-schedule/description/

I was not able to solve it.

**DFS**

```cpp
class Solution {
    unordered_map<int, vector<int>> preMap;
    unordered_set<int> visiting;

public:
    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
        for (int i = 0; i < numCourses; i++) {
            preMap[i] = {};
        }

        for (const auto& prerequisite : prerequisites) {
            preMap[prerequisite[0]].push_back(prerequisite[1]);
        }

        for (int i = 0; i < numCourses; i++) {
            if (!dfs(i)) {
                return false;
            }
        }

        return true;
    }

    bool dfs(int numCourse) {
        if (visiting.count(numCourse)) {
            return false;
        }

        if (preMap[numCourse].empty()) {
            return true;
        }

        visiting.insert(numCourse);

        for (const auto& pre : preMap[numCourse]) {
            if (!dfs(pre)) {
                return false;
            }
        }

        visiting.erase(numCourse);
        preMap[numCourse].clear();

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
    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
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
        while (!q.empty()) {
            int node = q.front();
            q.pop();
            finish++;
            for (int nei : adj[node]) {
                indegree[nei]--;
                if (indegree[nei] == 0) {
                    q.push(nei);
                }
            }
        }

        return finish == numCourses;
    }
};
```

**Time complexity:** O(V+E), where V is the number of courses and E is the number of prerequisites.

**Space complexity:** O(V+E)