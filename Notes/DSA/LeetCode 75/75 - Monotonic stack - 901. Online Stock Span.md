Link: https://leetcode.com/problems/online-stock-span/description/

**My solution**

```cpp
class StockSpanner {
public:
    vector<int> stockPrices;

    StockSpanner() {
        
    }
    
    int next(int price) {
        stockPrices.push_back(price);

        int span = 1;

        for (int i = stockPrices.size() - 2; i >= 0; i--) {
            if (price < stockPrices[i]) {
                return span;
            } else {
                span++;
            }
        }

        return span;
    }
};

/**
 * Your StockSpanner object will be instantiated and called as such:
 * StockSpanner* obj = new StockSpanner();
 * int param_1 = obj->next(price);
 */
 ```

 **Time complexity:** O($N^{2}$)

 **Space complexity:** O(N)

 This is **not** the optimized solution.

 **Optimized solution**

 ```cpp
 class StockSpanner {
public:
    // Stack stores pairs: {price, span}
    // We maintain a monotonically decreasing stack of prices.
    // When a new price comes, we pop elements that are less than or equal,
    // accumulating their spans.
    std::stack<std::pair<int, int>> s;

    StockSpanner() {
        // Constructor: stack is empty initially
    }
    
    int next(int price) {
        int current_span = 1; // The span for the current price is at least 1 (for itself)

        // While the stack is not empty AND the price at the top of the stack
        // is less than or equal to the current 'price'
        while (!s.empty() && s.top().first <= price) {
            // The element on top of the stack contributes its span to the current price's span
            current_span += s.top().second; 
            s.pop(); // Remove the element as it's now 'covered' by the current price
        }

        // Push the current price and its calculated span onto the stack
        // This maintains the decreasing order property for future prices.
        s.push({price, current_span});

        return current_span;
    }
};

/**
 * Your StockSpanner object will be instantiated and called as such:
 * StockSpanner* obj = new StockSpanner();
 * int param_1 = obj->next(price);
 */
 ```

 **Time complexity:** O(N)

 **Space complexity:** O(N)