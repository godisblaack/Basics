Link: https://leetcode.com/problems/maximum-subsequence-score/description/

I was not able to solve this.

**Solution**

```cpp
class Solution {
public:
    long long maxScore(vector<int>& nums1, vector<int>& nums2, int k) {
        int n = nums1.size();

        // 1. Create pairs of (nums1[i], nums2[i])
        std::vector<std::pair<int, int>> pairs(n);
        for (int i = 0; i < n; ++i) {
            pairs[i] = {nums1[i], nums2[i]};
        }

        // 2. Sort pairs in descending order based on nums2 values.
        // If nums2 values are equal, the order of nums1 doesn't strictly matter
        // for correctness but sorting by nums1 descending can be a tie-breaker
        // if needed.
        std::sort(
            pairs.begin(), pairs.end(),
            [](const std::pair<int, int>& a, const std::pair<int, int>& b) {
                return a.second > b.second; // Sort by nums2 in descending order
            });

        // 3. Initialize variables
        long long current_sum_nums1 = 0;
        // Min-priority queue to keep track of the smallest k elements of nums1
        // seen so far. We use a min-heap because we want to remove the
        // *smallest* nums1 value if the heap size exceeds k, to maximize the
        // sum.
        std::priority_queue<int, std::vector<int>, std::greater<int>> min_heap;
        long long max_score = 0;

        // 4. Iterate through the sorted pairs
        for (int i = 0; i < n; ++i) {
            int num1_val = pairs[i].first;
            int num2_val =
                pairs[i].second; // This is our current potential minimum

            // Add current nums1_val to sum and heap
            current_sum_nums1 += num1_val;
            min_heap.push(num1_val);

            // Maintain k elements in the min-heap
            if (min_heap.size() > k) {
                // If we have more than k elements, remove the smallest one
                current_sum_nums1 -= min_heap.top();
                min_heap.pop();
            }

            // If we have exactly k elements in the heap, calculate the score
            // and update max_score
            if (min_heap.size() == k) {
                max_score = std::max(max_score, current_sum_nums1 * num2_val);
            }
        }

        return max_score;
    }
};
```

**Time complexity:** O(N log N) 

**Space complexity:** O(N)