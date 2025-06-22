Link: https://leetcode.com/problems/container-with-most-water/description/

**My solution**

```cpp
class Solution {
public:
    int maxArea(vector<int>& height) {
        int i = 0;
        int j = height.size() - 1;
        
        int maxWater = INT_MIN; 

        while (i < j) {
            int water = 0;

            if (height[i] < height[j]) {
                water = height[i] * (j - i);
                
                i++;
            } else {
                water = height[j] * (j - i);

                j--;
            }

            if (maxWater < water) {
                maxWater = water;
            }

        }

        return maxWater;
    }
};
```

**Time complexity:** O(N)

**Space complexity:** O(1)

This is the **optimized** solution.