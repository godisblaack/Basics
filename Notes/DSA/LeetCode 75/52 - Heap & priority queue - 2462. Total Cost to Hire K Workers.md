Link: https://leetcode.com/problems/total-cost-to-hire-k-workers/description/

**My solution**

```cpp
class Solution {
public:
    long long totalCost(vector<int>& costs, int k, int candidates) {
        int hiringCost = 0;

        for (int i = 0; i < k; i++) {
            int min1 = INT_MAX;
            int min2 = INT_MAX;
            
            int j = 0;
            int index1 = j;
            int index2 = j;

            for (; j < candidates && j < costs.size(); j++) {
                if (costs[j] < min1) {
                    min1 = costs[j];

                    index1 = j;
                }

                if (costs[costs.size() - j - 1] < min2) {
                    min2 = costs[costs.size() - j - 1];

                    index2 = j;
                }
            }

            if (min1 > min2) {
                hiringCost += min2;

                costs.erase(costs.end() - index2 - 1);
            } else {
                hiringCost += min1;

                costs.erase(costs.begin() + index1);
            }
        }

        return hiringCost;
    }
};
```

**Time complexity:** O(k N)

**Space complexity:** O(1)

This is **not** the optimized solution. I got TLE error for this soluiton.

**Optimized solution**

```cpp
class Solution {
public:
    long long totalCost(vector<int>& costs, int k, int candidates) {
        int n = costs.size();
        long long total_hired_cost = 0;

        // Min-priority queue for the first 'candidates' workers
        // Stores costs in ascending order
        std::priority_queue<int, std::vector<int>, std::greater<int>> left_pq;

        // Min-priority queue for the last 'candidates' workers
        // Stores costs in ascending order
        std::priority_queue<int, std::vector<int>, std::greater<int>> right_pq;

        // Pointers to keep track of the next available worker from left and right
        int left_ptr = 0;
        int right_ptr = n - 1;

        // 1. Initial population of heaps
        // Fill left_pq with the first 'candidates' elements
        // Stop if left_ptr crosses right_ptr (means array is smaller than 2*candidates)
        while (left_ptr < candidates && left_ptr <= right_ptr) {
            left_pq.push(costs[left_ptr]);
            left_ptr++;
        }

        // Fill right_pq with the last 'candidates' elements
        // Stop if right_ptr becomes less than left_ptr
        while (right_ptr >= n - candidates && right_ptr >= left_ptr) {
            right_pq.push(costs[right_ptr]);
            right_ptr--;
        }

        // 2. Hire k workers
        for (int i = 0; i < k; ++i) {
            // Determine which worker to hire:
            // Case 1: Only left_pq has elements
            if (right_pq.empty()) {
                total_hired_cost += left_pq.top();
                left_pq.pop();
            }
            // Case 2: Only right_pq has elements
            else if (left_pq.empty()) {
                total_hired_cost += right_pq.top();
                right_pq.pop();
            }
            // Case 3: Both have elements, compare tops
            else {
                if (left_pq.top() <= right_pq.top()) {
                    // Hire from left_pq (includes tie-breaking by smaller index)
                    total_hired_cost += left_pq.top();
                    left_pq.pop();
                    
                    // Refill left_pq if there are still workers available
                    if (left_ptr <= right_ptr) {
                        left_pq.push(costs[left_ptr]);
                        left_ptr++;
                    }
                } else {
                    // Hire from right_pq
                    total_hired_cost += right_pq.top();
                    right_pq.pop();

                    // Refill right_pq if there are still workers available
                    if (left_ptr <= right_ptr) {
                        right_pq.push(costs[right_ptr]);
                        right_ptr--;
                    }
                }
            }
        }

        return total_hired_cost;
    }
};
```

**Time complexity:** O(k log candidates)

**Space complexity:** O(candidates)