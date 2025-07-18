Link: https://leetcode.com/problems/largest-rectangle-in-histogram/description/

**My solution**

```cpp
class Solution {
public:
    int largestRectangleArea(vector<int>& heights) {
        int size = heights.size();

        int maximumArea = 0;

        for (int i = 0; i < size; ++i) {
            int currentMinimumHeight = heights[i];

            for (int j = i; j < size; ++j) {
                currentMinimumHeight = min(currentMinimumHeight, heights[j]);

                int width = j - i + 1;
                int currentArea = currentMinimumHeight * width;

                maximumArea = max(currentArea, maximumArea);
            }
        }

        return maximumArea;
    }
};
```

**Time complexity:** O($N^{2}$)

**Space complexity:** O(1)

This is **not** the optimized solution. This is the brute force approach and I got TLE for this solution.

**Better approach - Precompute next and previous smaller**

```cpp
class Solution {
public:
    int largestRectangleArea(vector<int>& heights) {
        int size = heights.size();

        vector<int> previousSmaller(size);
        vector<int> nextSmaller(size);

        stack<int> st;

        // Previous smaller
        for (int i = 0; i < size; ++i) {
            while (!st.empty() && heights[st.top()] >= heights[i]) {
                st.pop();
            }

            if (st.empty()) {
                previousSmaller[i] = -1;
            } else {
                previousSmaller[i] = st.top();
            }

            st.push(i);
        }

        // Reset stack
        while (!st.empty()) {
            st.pop();
        }

        // Next smaller
        for (int i = size - 1; i >= 0; --i) {
            while (!st.empty() && heights[st.top()] >= heights[i]) {
                st.pop();
            }
            
            if (st.empty()) {
                nextSmaller[i] = size;
            } else {
                nextSmaller[i] = st.top();
            }

            st.push(i);
        }

        int maximumArea = 0;

        for (int i = 0; i < size; ++i) {
            int width = nextSmaller[i] - previousSmaller[i] - 1;
            int currentArea = heights[i] * width;

            maximumArea = max(maximumArea, currentArea);
        }

        return maximumArea;
    }
};
```

**Time complexity:** O(N)

**Space complexity:** O(N)

**Optimized solution - Single stack traversal**

```cpp
class Solution {
public:
    int largestRectangleArea(vector<int>& heights) {
        int size = heights.size();

        int maximumArea = 0;

        stack<int> st;

        heights.push_back(0); // Sentinel to flush the stack

        for (int i = 0; i <= size; ++i) {
            while (!st.empty() && heights[i] < heights[st.top()]) {
                int currentHeight = heights[st.top()];

                st.pop();

                int width;

                if (st.empty()) {
                    width = i;
                } else {
                    width = i - st.top() - 1;
                } 

                maximumArea = max(maximumArea, currentHeight * width);
            }

            st.push(i);
        }

        return maximumArea;
    }
};
```

**Time complexity:** O(N)

**Space complexity:** O(N)