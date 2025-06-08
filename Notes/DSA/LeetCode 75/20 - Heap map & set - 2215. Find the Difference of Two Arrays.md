Link: https://leetcode.com/problems/find-the-difference-of-two-arrays/description/

**My solution**

```cpp
class Solution {
public:
    vector<vector<int>> findDifference(vector<int>& nums1, vector<int>& nums2) {
        map<int, int> nums1Map;
        map<int, int> nums2Map;

        for (int i = 0; i < nums1.size(); i++) {
            nums1Map[nums1[i]]++;
        }

        for (int i = 0; i < nums2.size(); i++) {
            nums2Map[nums2[i]]++;
        }

        vector<vector<int>> answer(2);

        for (const auto& [key, value] : nums1Map) {
            if (nums2Map.find(key) == nums2Map.end()) {
                answer[0].push_back(key);
            }
        }

        for (const auto& [key, value] : nums2Map) {
            if (nums1Map.find(key) == nums1Map.end()) {
                answer[1].push_back(key);
            }
        }

        return answer;
    }
};
```

**Time Complexity**: O(N log N), where N = max($N_{1} + N_{2}$) 

**Space Complexity**: O($N_{1} + N_{2}$)

This is **not** the optimized solution, for interview scenarios in terms of average-case time complexity.

**Optimized solution**

```cpp
class Solution {
public:
    vector<vector<int>> findDifference(vector<int>& nums1, vector<int>& nums2) {
        std::unordered_set<int> set1(nums1.begin(), nums1.end()); // Populates set1 with unique elements from nums1
        std::unordered_set<int> set2(nums2.begin(), nums2.end()); // Populates set2 with unique elements from nums2

        std::vector<std::vector<int>> answer(2);

        // Find elements unique to nums1
        for (int num : set1) { // Iterates through unique elements of nums1
            if (set2.find(num) == set2.end()) { // O(1) average lookup in unordered_set
                answer[0].push_back(num);
            }
        }

        // Find elements unique to nums2
        for (int num : set2) { // Iterates through unique elements of nums2
            if (set1.find(num) == set1.end()) { // O(1) average lookup in unordered_set
                answer[1].push_back(num);
            }
        }

        return answer;
    }
};
```

**Time Complexity**: O($N_{1} + N_{2}$) on average. If there are many hash collisions, though this is rare with good hash function, in the worst case it can go up to O($N^{2}_{1} + N^{2}_{2}$).

**Space Complexity**: O($N_{1} + N_{2}$)