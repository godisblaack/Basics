Link: https://leetcode.com/problems/best-time-to-buy-and-sell-stock/description/

**My solution**

```cpp
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int left = 0;
        int right = 1;

        int maxProfit = 0;

        while (right < prices.size()) {
            int currentProfit = prices[right] - prices[left];

            if (maxProfit < currentProfit) {
                maxProfit = currentProfit;
            }

            if (prices[right] < prices[left]) {
                left = right;
            }

            right++;
        }

        return maxProfit;
    }
};
```

**Time complexity:** O(N)

**Space complexity:** O(1)

This is the **optimal** solution. There is another way to write it.

**Cleaner code**

```cpp
int maxProfit(vector<int>& prices) {
    int minPrice = INT_MAX;
    int maxProfit = 0;

    for (int price : prices) {
        if (price < minPrice)
            minPrice = price;
        else if (price - minPrice > maxProfit)
            maxProfit = price - minPrice;
    }

    return maxProfit;
}
```

**Time complexity:** O(N)

**Space complexity:** O(1)