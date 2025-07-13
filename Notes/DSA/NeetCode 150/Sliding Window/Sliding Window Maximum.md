Link: https://leetcode.com/problems/sliding-window-maximum/description/

**My solution**

```cpp
class SlidingWindowMax {
    priority_queue<int> maxHeap;

    unordered_map<int, int> lazyDelete;

public:
    void insert(int num) { 
        maxHeap.push(num); 
    }

    void remove(int num) { 
        lazyDelete[num]++; 
    }

    int getMax() {
        while (!maxHeap.empty() && lazyDelete[maxHeap.top()] > 0) {
            lazyDelete[maxHeap.top()]--;

            maxHeap.pop();
        }

        return maxHeap.top();
    }
};

class Solution {
public:
    vector<int> maxSlidingWindow(vector<int>& nums, int k) {
        SlidingWindowMax slidingWindowMax;

        vector<int> result;

        for (int i = 0; i < nums.size(); ++i) {
            slidingWindowMax.insert(nums[i]);

            if (i >= k) {
                slidingWindowMax.remove(nums[i - k]);
            }

            if (i >= k - 1) {
                result.push_back(slidingWindowMax.getMax());
            }
        }

        return result;
    }
};
```

**Time complexity:** O(n log k), where n is the size of input, and k is the window size.

**Space compelxity:** O(k)

**Optimal solution - Using deque (Double ended queue)**

```cpp
// Optimized

class Solution {
public:
    vector<int> maxSlidingWindow(vector<int>& nums, int k) {
        deque<int> dq; // stores indices
        vector<int> result;

        for (int i = 0; i < nums.size(); ++i) {
            // Remove indices out of window
            if (!dq.empty() && dq.front() <= i - k) {
                dq.pop_front();
            }

            // Remove smaller elements from back
            while (!dq.empty() && nums[dq.back()] < nums[i]) {
                dq.pop_back();
            }

            // Add current index
            dq.push_back(i);

            // Window has started
            if (i >= k - 1) {
                result.push_back(nums[dq.front()]);
            }
        }

        return result;
    }
};
```

**Time complexity:** O(n), where n is the size of input.

**Space complexity:** O(k), where k is the window size.