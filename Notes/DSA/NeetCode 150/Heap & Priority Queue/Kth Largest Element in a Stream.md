Link: https://leetcode.com/problems/kth-largest-element-in-a-stream/description/

**My solution**

```cpp
class KthLargest {
private:
    int k;
    
    priority_queue<int, vector<int>, greater<int>> minHeap;

public:
    KthLargest(int k, vector<int>& nums) {
        this->k = k;

        for (int num : nums) {
            minHeap.push(num);

            if (minHeap.size() > k) {
                minHeap.pop();
            }
        }
    }
    
    int add(int val) {
        minHeap.push(val);

        if (minHeap.size() > k) {
            minHeap.pop();
        }

        return minHeap.top();
    }
    
};

/**
 * Your KthLargest object will be instantiated and called as such:
 * KthLargest* obj = new KthLargest(k, nums);
 * int param_1 = obj->add(val);
 */
```

**Time complexity:** O((N + M) * log(K)), where N is the size of the initial array and M is the number of times add is called. Each push operation on the min-heap takes O(log(k)) time, where k is the size of the heap.

**Space complexity:** O(k), where k is the size of the heap.

This is the **optimized** solution.