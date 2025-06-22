Link: https://leetcode.com/problems/kth-largest-element-in-an-array/description/

**My 1st solution**

```cpp
class Solution {
public:
    int findKthLargest(vector<int>& nums, int k) {
        sort(nums.begin(), nums.end());

        return nums[nums.size() - k];
    }
};
```

**Time complexity:** O(N log N)

**Space complexity:** O(log N)

**My 2nd solution (Max Heap)**

```cpp
class Solution {
public:
    int findKthLargest(vector<int>& nums, int k) {
        priority_queue<int> queue;
        
        for (int num: nums) {
            queue.push(num);
        }

        for (int i = 0; i < k - 1; i++) {
            queue.pop();
        }

        return queue.top();
    }
};
```

**Time complexity:** O(N log N)

**Space complexity:** O(N)


Both these solutions are **not** the optimized solution. There is 2 other ways to solve this problem. 

**Min Heap (size K)**

```cpp
class Solution {
public:
    int findKthLargest(vector<int>& nums, int k) {
        // Create a min-priority queue (min-heap)
        // std::priority_queue<int, std::vector<int>, std::greater<int>>
        // The third template argument `std::greater<int>` makes it a min-heap.
        std::priority_queue<int, std::vector<int>, std::greater<int>> min_heap;

        for (int num : nums) {
            min_heap.push(num); // Add the current number to the heap
            if (min_heap.size() > k) {
                min_heap.pop(); // If heap size exceeds k, remove the smallest
                                // element
            }
        }

        // The top of the min-heap will be the Kth largest element
        // because it contains the k largest elements seen so far, and the
        // smallest among them is at the top.
        return min_heap.top();
    }
};
```

**Time complexity:** O(N log k)

**Space complexity:** O(k)

This solution is prefered when `k` is small.

**Optimized solution**

```cpp
class Solution {
public:
    int findKthLargest(vector<int>& nums, int k) {
        // std::nth_element rearranges the elements in [first, last)
        // such that the element at the nth position is the element that
        // would be in that position in a sorted sequence.
        // All elements before this nth position are less than or equal to it,
        // and all elements after this nth position are greater than or equal to it.

        // To find the Kth largest element, we need the element at index (N - k)
        // if the array were sorted in ascending order.
        int n = nums.size();
        std::nth_element(nums.begin(), nums.begin() + (n - k), nums.end());

        return nums[n - k];
    }
};
```

**Time complexity:** O(N)

**Space complexity:** O(1)