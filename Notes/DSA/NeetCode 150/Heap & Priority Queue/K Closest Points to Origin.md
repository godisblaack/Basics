Link: https://leetcode.com/problems/k-closest-points-to-origin/description/

**My solution**

```cpp
class Solution {
public:
    vector<vector<int>> kClosest(vector<vector<int>>& points, int k) {
        int x1 = 0;
        int y1 = 0;

        vector<pair<double, vector<int>>> distanceList;

        for (auto point : points) {
            distanceList.push_back({calculateDistance(x1, y1, point[0], point[1]), point});
        }

        sort(distanceList.begin(), distanceList.end());

        vector<vector<int>> result;
        
        for (int i = 0; i < k; ++i) {
            result.push_back(distanceList[i].second);
        }


        return result;
    }

    double calculateDistance(double x1, double y1, double x2, double y2) {
        double dx = x2 - x1;
        double dy = y2 - y1;

        return sqrt(dx * dx + dy * dy);
    }
};
```

**Time complexity:** O(N log N)

**Space complexity:** O(N)

This is **not** the optimized solution.

**Optimized solution**

```cpp
class Solution {
public:
    vector<vector<int>> kClosest(vector<vector<int>>& points, int k) {
        auto distance = [](const vector<int>& point) {
            return point[0] * point[0] + point[1] * point[1]; // No need for sqrt
        };

        // Max-heap: pair<distance, point>
        priority_queue<pair<int, vector<int>>> maxHeap;

        for (const auto& point : points) {
            int dist = distance(point);
            maxHeap.push({dist, point});
            if (maxHeap.size() > k) {
                maxHeap.pop(); // Remove the farthest point
            }
        }

        vector<vector<int>> result;
        while (!maxHeap.empty()) {
            result.push_back(maxHeap.top().second);
            maxHeap.pop();
        }

        return result;
    }
};
```

**Time complexity:** O(N log k)

**Space complexity:** O(k), maintaining max-heap of size k.