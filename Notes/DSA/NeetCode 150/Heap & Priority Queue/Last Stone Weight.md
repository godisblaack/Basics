Link: https://leetcode.com/problems/last-stone-weight/description/

**My solution**

```cpp
class Solution {
public:
    int lastStoneWeight(vector<int>& stones) {
        priority_queue<int, vector<int>> maxHeap; 

        for (int stone : stones) {
            maxHeap.push(stone);
        }

        if (maxHeap.size() == 1) {
            return maxHeap.top();
        }

        while (maxHeap.size() >= 2) {
            int currentWeight = maxHeap.top();
            maxHeap.pop();

            int newWeight = maxHeap.top();
            maxHeap.pop();

            if (currentWeight == newWeight) {
                maxHeap.push(0);
            } else if (currentWeight < newWeight) {
                currentWeight = newWeight - currentWeight;
                maxHeap.push(currentWeight);
            } else {
                currentWeight = currentWeight - newWeight;
                maxHeap.push(currentWeight);
            }
        }

        return maxHeap.top();
    }
};
```

**Time complexity:** O(N log N)

**Space complexity:** O(N)

This is the **optimized** solution.

**Cleaner code**

```cpp
class Solution {
public:
    int lastStoneWeight(vector<int>& stones) {
        priority_queue<int> maxHeap(stones.begin(), stones.end());

        while (maxHeap.size() > 1) {
            int stone1 = maxHeap.top();
            maxHeap.pop();
            
            int stone2 = maxHeap.top();
            maxHeap.pop();

            if (stone1 != stone2) {
                maxHeap.push(stone1 - stone2);
            }
        }

        if (maxHeap.empty()) {
            return 0;
        }

        return maxHeap.top();
    }
};
```

**Time complexity:** O(N log N)

**Space complexity:** O(N)