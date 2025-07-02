Link: https://leetcode.com/problems/top-k-frequent-elements/description/

**My solution**

```cpp
class Solution {
public:
    vector<int> topKFrequent(vector<int>& nums, int k) {
        if (nums.size() == 1) {
            return nums;
        }

        unordered_map<int, int> frequencyMap;

        for (int num : nums) {
            frequencyMap[num]++;
        }

        vector<pair<int, int>> frequencyList;

        for (auto& [key, value] : frequencyMap) {
            frequencyList.push_back({key, value});
        }

        sort(
            frequencyList.begin(), frequencyList.end(), 
            [] (pair<int, int> a, pair<int, int> b) {
                return a.second > b.second;
            }
        );

        vector<int> kFrequentElements;

        for (int i = 0; i < k; i++) {
            kFrequentElements.push_back(frequencyList[i].first);
        }

        return kFrequentElements;
    }
};
```

**Time complexity:** O(N log N), where  
Building the frequency map: O(n)  
Creating the frequencyList: O(n)  
Sorting the frequency list: O(n log n)  
Picking top k elements: O(k)

**Space complexity:** O(N), where  
Frequency map: O(n)  
Frequency list: O(n)  
Output list: O(k)

This is **not** the optimized solution.

**Optimized solution**

```cpp
class Solution {
public:
    vector<int> topKFrequent(vector<int>& nums, int k) {
        unordered_map<int, int> freqMap;
        for (int num : nums) {
            freqMap[num]++;
        }

        auto cmp = [](pair<int, int>& a, pair<int, int>& b) {
            return a.second > b.second;
        };
        priority_queue<pair<int, int>, vector<pair<int, int>>, decltype(cmp)> minHeap(cmp);

        for (auto& [num, freq] : freqMap) {
            minHeap.push({num, freq});
            if (minHeap.size() > k) {
                minHeap.pop();
            }
        }

        vector<int> result;
        while (!minHeap.empty()) {
            result.push_back(minHeap.top().first);
            minHeap.pop();
        }

        return result;
    }
};
```

**Time complexity:** O(N log k), where   
Frequency map: O(n)  
Heap operations: O(n log k)  
Extracting k elements: O(k)  

**Space complexity:** O(N), where Frequency map + heap + output: O(n)

---

### What is this code doing?

```cpp
auto cmp = [](pair<int, int>& a, pair<int, int>& b) {
    return a.second > b.second;
};
```
- This defines a **lambda function** named `cmp`.
- It returns `true` if `a.second > b.second`, meaning it gives **higher priority to smaller frequencies**. Working of lambda function in `sort` and `priority_queue` is explained in the next section.
- This sets up a **min-heap based on frequency** (i.e., element with the smallest frequency is on top).

Now, this line:
```cpp
priority_queue<pair<int, int>, vector<pair<int, int>>, decltype(cmp)> minHeap(cmp);
```
Here’s what each part means:
- `pair<int, int>` is the type of data (element, frequency).
- `vector<pair<int, int>>` is the underlying container used by the heap.
- `decltype(cmp)` tells C++ that we’re using the type of our lambda as the custom comparator.
- `minHeap(cmp)` passes the lambda into the priority queue.

This declaration sets up a **min-heap of `(element, frequency)` pairs**, which will keep the least frequent element at the top.

---

## How the comparator works inside `std::sort` versus `std::priority_queue`.

### `std::sort` Comparator

```cpp
[] (pair<int, int> a, pair<int, int> b) {
    return a.second > b.second;
}
```

In `std::sort`, this comparator means:
*“Put `a` before `b` if `a.second > b.second`.”*

So bigger frequencies come **earlier** in the vector. That’s a **descending sort**.

---

### In Contrast: `priority_queue` Comparator

In a `priority_queue`, the comparator tells the **heap to treat an element as “less than” another**, not whether it comes before it.

So when we write:
```cpp
auto cmp = [](pair<int, int>& a, pair<int, int>& b) {
    return a.second > b.second;
};
```

We’re saying:
*“Treat `a` as less important if its frequency is greater.”*

That means the **smaller frequency** ends up on top—this creates a **min-heap**, even though the comparator looks the same.

---