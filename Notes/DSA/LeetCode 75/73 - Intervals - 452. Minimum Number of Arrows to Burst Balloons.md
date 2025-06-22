Link: https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/description/

**My solution**

```cpp
class Solution {
public:
    int findMinArrowShots(vector<vector<int>>& points) {
        if (points.size() == 1) {
            return 1;
        }

        sort(points.begin(), points.end(), [](vector<int>& a, vector<int>& b) {
            return a[1] < b[1];
        });

        int nonOverlappingCount = 0;
        long long previousY = numeric_limits<long long>::min();

        for (auto point: points) {
            int x = point[0];
            int y = point[1];

            if (x > previousY) {
                nonOverlappingCount++;

                previousY = y;
            }
        }

        return nonOverlappingCount;
    }
};
```

**Time complexity:** O(log N)

**Space complexity:** O(log N)

This is the **optimized** solution.