Link: https://leetcode.com/problems/keys-and-rooms/description/

**My solution**

```cpp
class Solution {
public:
    bool canVisitAllRooms(vector<vector<int>>& rooms) {
        vector<bool> unlockedRoom(rooms.size(), false);

        queue<int> visitRoom;

        visitRoom.push(0);

        while(!visitRoom.empty()) {
            if (unlockedRoom[visitRoom.front()]) {
                visitRoom.pop();

                continue;
            }
            
            unlockedRoom[visitRoom.front()] = true;

            for (int i = 0; i < rooms[visitRoom.front()].size(); i++) {
                visitRoom.push(rooms[visitRoom.front()][i]);
            }

            visitRoom.pop();
        }

        for (bool condition : unlockedRoom) {
            if (!condition) {
                return false;
            }
        }

        return true;
    }
};
```

**Time complexity:** O(V + E)

**Space complexity:** O(N)

This is the **optimized** solution. I used BFS approach, we can also use DFS approach.

**DFS approach**

```cpp
#include <vector>
#include <stack> // For iterative DFS, or recursion for recursive DFS

class Solution {
public:
    void dfs(int roomNumber, const std::vector<std::vector<int>>& rooms, std::vector<bool>& unlockedRoom, int& visitedCount) {
        unlockedRoom[roomNumber] = true;
        visitedCount++;

        for (int key : rooms[roomNumber]) {
            if (!unlockedRoom[key]) {
                dfs(key, rooms, unlockedRoom, visitedCount);
            }
        }
    }

    bool canVisitAllRooms(std::vector<std::vector<int>>& rooms) {
        int numRooms = rooms.size();
        if (numRooms == 0) {
            return true;
        }

        std::vector<bool> unlockedRoom(numRooms, false);
        int visitedCount = 0;

        // Start DFS from room 0
        dfs(0, rooms, unlockedRoom, visitedCount);

        // Check if all rooms were visited
        return visitedCount == numRooms;
    }
};
```

**Time complexity:** O(V + E)

**Space complexity:** O(N)