Link: https://leetcode.com/problems/successful-pairs-of-spells-and-potions/description/

**My solution (brute force)**

```cpp
class Solution {
public:
    vector<int> successfulPairs(vector<int>& spells, vector<int>& potions, long long success) {
        vector<int> pairs(spells.size(), 0);

        for (int i = 0; i < spells.size(); i++) {
            for (int j = 0; j < potions.size(); j++) {
                if (static_cast<long int>(spells[i]) * potions[j] >= success) {
                    pairs[i]++;
                }
            }
        }

        return pairs;
    }
};
```

**Time complexity:** O($N^{2}$)  

**Space complexity:** O(1)

This is **not** the optimized solution. This was my first brute force approach. On submitting this solution in LeetCode I got Time Limit Exceeded error then I optimized the code using the binary search algorithm.

```cpp
class Solution {
public:
    vector<int> successfulPairs(vector<int>& spells, vector<int>& potions, long long success) {
        sort(potions.begin(), potions.end());

        vector<int> pairs;

        for (int i = 0; i < spells.size(); i++) {
            int start = 0;
            int end = potions.size() - 1;
            
            int result = -1;

            while (start <= end) {
                int mid = start + (end - start) / 2;

                if (static_cast<long long>(spells[i]) * potions[mid] >=
                    success) {
                    result = mid;

                    end = mid - 1;
                } else {
                    start = mid + 1;
                }
            }

            if (result == -1) {
                pairs.push_back(0);
            } else {
                pairs.push_back(potions.size() - result);
            }
        }

        return pairs;
    }
};
```

**Time complexity:** O(M log M + N log M)
- Sorting potions: O(M log M)  
- Looping through spells: N iterations  
- Binary search within the loop: O(log M) for each iteration  

Therefore, the total time complexity is the sum of the sorting time and the time spent in the loop: O(M log M + N log M), where,
- N is the number of spells in the spells vector.
- M is the number of potions in the potions vector.

**Space complexity:** O(N) 

This is the **optimal** solution.

The mistakes I made were:
- My primary mistake was initializing the result variable to 0 in my binary search. This was problematic because 0 is a valid index in an array. Consequently, if no successful pair was found, result would remain 0, leading to an incorrect calculation of the number of successful pairs by subtracting 0 from the total length of the potions array (pairs.push_back(potions.size() - result)). I lacked a clear mechanism to differentiate between a scenario where no successful potion existed and one where the first successful potion happened to be at index 0.