Link: https://leetcode.com/problems/merge-intervals/description/

I was not able to solve it.

**Sorting**

```cpp
class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        sort(intervals.begin(), intervals.end());
        vector<vector<int>> output;
        output.push_back(intervals[0]);

        for (auto& interval : intervals) {
            int start = interval[0];
            int end = interval[1];
            int lastEnd = output.back()[1];

            if (start <= lastEnd) {
                output.back()[1] = max(lastEnd, end);
            } else {
                output.push_back({start, end});
            }
        }
        return output;
    }
};
```

**Time complexity:** O(nlogn)

**Space complexity:** O(1) or 
O(n) space depending on the sorting algorithm.
O(n) for the output list.

**Sorting**

```cpp
class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        sort(intervals.begin(), intervals.end());
        
        vector<vector<int>> result;

        for (int i = 0; i < intervals.size(); i++) {
            if (result.empty() || result.back()[1] < intervals[i][0]) {
                result.push_back(intervals[i]);
            } else {
                result.back()[1] = max(result.back()[1], intervals[i][1]);
            }
        }

        return result;
    }
};
```

**Time complexity:** O(nlogn)

**Space complexity:** O(1) or 
O(n) space depending on the sorting algorithm.
O(n) for the output list.