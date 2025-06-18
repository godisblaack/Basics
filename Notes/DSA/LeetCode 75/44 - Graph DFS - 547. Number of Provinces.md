Link: https://leetcode.com/problems/number-of-provinces/description/

I was not able to solve this.

**DFS solution**

```cpp
class Solution {
public:
    void dfs(int node, vector<vector<int>>& isConnected, vector<bool>& visited) {
        visited[node] = true;
        
        for (int i = 0; i < isConnected.size(); i++) {
            if (isConnected[node][i] == 1 && !visited[i]) {
                dfs(i, isConnected, visited);
            }
        }
    }

    int findCircleNum(vector<vector<int>>& isConnected) {
        int size = isConnected.size();
        vector<bool> visited(size, false);
        int provinces = 0;

        for (int i = 0; i < size; i++) {
            if (!visited[i]) {
                dfs(i, isConnected, visited); // Start DFS for this province
                provinces++; // Increment province count
            }
        }

        return provinces;
    }
};
```

**Time complexity:** O($N^{2}$)

**Space complexity:** O(N)