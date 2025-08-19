Link: https://leetcode.com/problems/find-median-from-data-stream/submissions/1740504813/

**My solution**

```cpp
class MedianFinder {
private: 
    vector<int> array;
    unordered_map<int, int> map;

public:
    MedianFinder() {
        
    }
    
    void addNum(int num) {
        array.push_back(num);

        sort(array.begin(), array.end());
    }
    
    double findMedian() {
        if (array.size() % 2 != 0) {
            return (double)array[array.size() / 2];
        } else {
            return ((double)(array[(array.size() / 2) - 1] + array[array.size() / 2]) / 2);
        }
    }
};

/**
 * Your MedianFinder object will be instantiated and called as such:
 * MedianFinder* obj = new MedianFinder();
 * obj->addNum(num);
 * double param_2 = obj->findMedian();
 */
```
**Time complexity:** O(N log N)

**Space complexity:** O(N)

This is **not** the optimized solution. I got TLE for this solution.

**Optimized solution**

```cpp
class MedianFinder {
private:
    priority_queue<int> low; // Max-heap
    priority_queue<int, vector<int>, greater<int>> high; // Min-heap

public:
    MedianFinder() {}

    void addNum(int num) {
        low.push(num);
        high.push(low.top());
        low.pop();

        if (low.size() < high.size()) {
            low.push(high.top());
            high.pop();
        }
    }

    double findMedian() {
        if (low.size() > high.size()) {
            return low.top();
        } else {
            return (low.top() + high.top()) / 2.0;
        }
    }
};

/**
 * Your MedianFinder object will be instantiated and called as such:
 * MedianFinder* obj = new MedianFinder();
 * obj->addNum(num);
 * double param_2 = obj->findMedian();
 */
```

**Time complexity:** O(1)

**Space complexity:** O(N)