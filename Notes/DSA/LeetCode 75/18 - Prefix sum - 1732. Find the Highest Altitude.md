Link: https://leetcode.com/problems/find-the-highest-altitude/description/

**My solution**

```cpp
class Solution {
public:
    int largestAltitude(vector<int>& gain) {
        int currentAltitude = 0;
        int highestAltitude = 0;

        for (int g: gain) {
            currentAltitude += g;

            if (highestAltitude < currentAltitude) {
                highestAltitude = currentAltitude;
            }
        }

        return highestAltitude;
    }
};
```

**Time complexity:** O(N)

**Space complexity:** O(1)

This is the **optimzied** solution.