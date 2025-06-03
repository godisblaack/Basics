Link: https://leetcode.com/problems/kids-with-the-greatest-number-of-candies/description/

**My solution**

```cpp
class Solution {
public:
    vector<bool> kidsWithCandies(vector<int>& candies, int extraCandies) {
        vector<bool> result;
        int maxCandies = INT_MIN;

        for (int i = 0; i < candies.size(); i++) {
            if (maxCandies < candies[i]) {
                maxCandies = candies[i];
            }
        }

        for (int i = 0; i < candies.size(); i++) {
            if (candies[i] + extraCandies >= maxCandies) {
                result.push_back(true);
            } else {
                result.push_back(false);
            }
        }

        return result;
    }
};
```

**Time complexity:** O(N)

**Space complexity:** O(N)

This is the **optimized** solution.