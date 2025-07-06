Link: https://leetcode.com/problems/trapping-rain-water/description/

I was not able to solve it. I was not able to pass all the test cases.

**Brute force**

```cpp
class Solution {
public:
    int trap(vector<int>& height) {
        int size = height.size(); 

        int water = 0;

        for (int i = 1; i < size - 1; i++) {
            int leftMax = 0;
            int rightMax = 0;

            for (int j = 0; j <= i; j++) {
                leftMax = max(leftMax, height[j]);
            }

            for (int j = i; j < size; j++) {
                rightMax = max(rightMax, height[j]);
            }

            water += min(leftMax, rightMax) - height[i];
        }
        return water;
    }
};
```

**Time complexity:** O($N^{2}$)

**Space complexity:** O(1)

**Better solution (Prefix & suffix arrays)**

```cpp
class Solution {
public:
    int trap(vector<int>& height) {

        int size = height.size();

        vector<int> leftMax(size);
        vector<int> rightMax(size);

        leftMax[0] = height[0];

        for (int i = 1; i < size; i++) {
            leftMax[i] = max(leftMax[i - 1], height[i]);
        }

        rightMax[size - 1] = height[size - 1];

        for (int i = size - 2; i >= 0; i--) {
            rightMax[i] = max(rightMax[i + 1], height[i]);
        }

        int water = 0;

        for (int i = 0; i < size; i++) {
            water += min(leftMax[i], rightMax[i]) - height[i];
        }

        return water;
    }
};
```

**Time complexity:** O(N)

**Space complexity:** O(N)

**Optimal solution (Two pointer)**

```cpp
class Solution {
public:
    int trap(vector<int>& height) {
        int left = 0;
        int right = height.size() - 1;
        int leftMax = 0;
        int rightMax = 0;
        int water = 0;

        while (left < right) {
            if (height[left] < height[right]) {
                if (height[left] >= leftMax) {
                    leftMax = height[left];
                } else {
                    water += leftMax - height[left];
                }

                left++;
            } else {
                if (height[right] >= rightMax) {
                    rightMax = height[right];
                } else {
                    water += rightMax - height[right];
                }
                
                right--;
            }
        }

        return water;
    }
};
```

**Time complexity:** O(N)

**Space complexity:** O(1)