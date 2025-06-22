Link: https://leetcode.com/problems/smallest-number-in-infinite-set/description/

**My solution**

```cpp
class SmallestInfiniteSet {
public:
    struct Compare {
        bool operator() (int a, int b) {
            return a > b;
        }
    };

    priority_queue<int, vector<int>, Compare> minHeap;
    set<int> addedElements;
    
    SmallestInfiniteSet() {
        for (int i = 1; i <= 1000; i++) {
            minHeap.push(i);
            addedElements.insert(i);
        }
    }
    
    int popSmallest() {
        int smallestElement = minHeap.top();

        minHeap.pop();
        addedElements.erase(smallestElement);

        return smallestElement;
    }
    
    void addBack(int num) {
        if (addedElements.find(num) == addedElements.end()) {
            minHeap.push(num);
            addedElements.insert(num);
        }
    }
};

/**
 * Your SmallestInfiniteSet object will be instantiated and called as such:
 * SmallestInfiniteSet* obj = new SmallestInfiniteSet();
 * int param_1 = obj->popSmallest();
 * obj->addBack(num);
 */
 ```

 **Time complexity:** O(1)

 **Space complexity:** O(1)

 This is the **optimized** solution.