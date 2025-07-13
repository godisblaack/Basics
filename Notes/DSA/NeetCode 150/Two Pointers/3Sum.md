Link: https://leetcode.com/problems/3sum/description/

**My solution**

```cpp
class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        sort(nums.begin(), nums.end());

        vector<vector<int>> answer;
        set<vector<int>> seen;

        for (int i = 0; i < nums.size(); i++) {
            int left = i + 1;
            int right = nums.size() - 1;

            while (left < right) {
                if (nums[i] + nums[left] + nums[right] == 0) {
                    vector<int> temp = {nums[i], nums[left], nums[right]};
                    sort(temp.begin(), temp.end());

                    if (seen.find(temp) == seen.end()) {
                    answer.push_back(temp);
                    seen.insert(temp);
                    }
                    
                    left++;
                    right--;
                } else if (nums[i] + nums[left] + nums[right] < 0) {
                    left++;
                } else {
                    right--;
                }
            }
        }

        return answer;
    }
};
```

**Time complexity:** O($N^{2} log k$), where k is number of unique triplets.

**Space complexity:** O(k)

This is **not** the optimized solution.

**Optimized solution**

```cpp
class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        vector<vector<int>> result;

        for (int i = 0; i < nums.size(); ++i) {
            if (i > 0 && nums[i] == nums[i - 1]) continue;  // Skip duplicate first elements

            int left = i + 1;
            int right = nums.size() - 1;

            while (left < right) {
                int sum = nums[i] + nums[left] + nums[right];
                if (sum == 0) {
                    result.push_back({nums[i], nums[left], nums[right]});
                    
                    // Skip duplicates
                    while (left < right && nums[left] == nums[left + 1]) left++;
                    while (left < right && nums[right] == nums[right - 1]) right--;

                    left++;
                    right--;
                }
                else if (sum < 0) {
                    left++;
                }
                else {
                    right--;
                }
            }
        }

        return result;
    }
};
```

**Time complexity:** O($N^{2}$)

**Space complexity:** O(1)