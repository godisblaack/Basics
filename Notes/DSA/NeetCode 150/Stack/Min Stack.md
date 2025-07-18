Link: https://leetcode.com/problems/min-stack/description/

**My solution**

```cpp
class MinStack {
public:
    priority_queue<int, std::vector<int>, std::greater<int>> minHeap;

    stack<int> normalStack;

    unordered_map<int, int> deletionList;

    MinStack() {

    }
    
    void push(int val) {
        minHeap.push(val);

        normalStack.push(val);
    }
    
    void pop() {
        deletionList[normalStack.top()]++;

        normalStack.pop();
    }
    
    int top() {
        return normalStack.top();
    }
    
    int getMin() {
        while (!minHeap.empty() && deletionList[minHeap.top()] != 0) {
            deletionList[minHeap.top()]--;

            minHeap.pop();
        }

        return minHeap.top();
    }
};

/**
 * Your MinStack object will be instantiated and called as such:
 * MinStack* obj = new MinStack();
 * obj->push(val);
 * obj->pop();
 * int param_3 = obj->top();
 * int param_4 = obj->getMin();
 */
```

**Time complexity:** O(N)

**Space complexity:** O(N)

This is **not** the optimized solution.

**Optimized solution - Using two stack approach**

```cpp
class MinStack {
    stack<int> mainStack;
    stack<int> minStack;

public:
    MinStack() {

    }

    void push(int val) {
        mainStack.push(val);

        if (minStack.empty() || val <= minStack.top()) {
            minStack.push(val);
        }
    }

    void pop() {
        if (mainStack.top() == minStack.top()) {
            minStack.pop();
        }
        
        mainStack.pop();
    }

    int top() {
        return mainStack.top();
    }

    int getMin() {
        return minStack.top();
    }
};

/**
 * Your MinStack object will be instantiated and called as such:
 * MinStack* obj = new MinStack();
 * obj->push(val);
 * obj->pop();
 * int param_3 = obj->top();
 * int param_4 = obj->getMin();
 */
```

**Time complexity:** O(1)

**Space complexity:** O(N)