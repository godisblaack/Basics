Link: https://leetcode.com/problems/max-number-of-k-sum-pairs/description/

**My solution**

```cpp
class Solution {
public:
    int maxOperations(vector<int>& nums, int k) {
        sort(nums.begin(), nums.end());

        int leftIndex = 0; 
        int rightIndex = nums.size() - 1; 
        int count = 0;

        while (leftIndex < rightIndex) {

            if (nums[leftIndex] + nums[rightIndex] == k) {
                count++;

                leftIndex++;
                rightIndex--;
            } else if (nums[leftIndex] + nums[rightIndex] < k) {
                leftIndex++;
            } else {
                rightIndex--;
            }
        }

        return count;
    }
};
```

**Time Complexity**: O(N log N)

**Space Complexity**: O(log N)

This is the **optimized** solution. I did this couple of months back. The next time when I did it, I used hashmap, and in that I got stuck in a check for a very long time.

**My hashmap solution**

```cpp
class Solution {
public:
    int maxOperations(vector<int>& nums, int k) {
        multimap<int, int> valueMap;
        int maxOperations = 0;

        for (int i = 0; i < nums.size(); i++) {
            valueMap.insert({nums[i], i});
        }

        for (int i = 0; i < nums.size(); i++) {
            auto it2 = valueMap.find(k - nums[i]);

            if (it2 != valueMap.end()) {
                auto it1 = valueMap.find(nums[i]);

                if (it1 != valueMap.end()) {
                // This if statement ensures that we found the current number in the map before attempting to erase it, because we have assigned it2 one instance of the existing number which it1 should point to. This prevents potential errors if 'nums[i]' is not present, e.g. if we are looking for a complement (k - nums[i]) that doesn't exist independently like when k = 2 and nums[i] = 1 for the array = [2,1], we need to ensure we find the '1' itself before looking for the other '1', and it might be that it1 will point to valueMap.end(), and in this case the code will throw an error.
                    valueMap.erase(it1);

                    it2 = valueMap.find(k - nums[i]); // Refinding because 'it2' might have become invalid if it was pointing to the same element as 'it1' or if the internal structure change during the first erase affected it.

                    if (it2 != valueMap.end()) {
                        valueMap.erase(it2);
                        maxOperations++;
                    }
                }
            }
        }

        return maxOperations;
    }
};
```

**Time Complexity**: O(N log N)

**Space Complexity**: O(N)