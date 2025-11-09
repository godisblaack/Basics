Link: https://leetcode.com/problems/insert-interval/description/

**My solution**

```cpp
class Solution {
public:
    vector<vector<int>> insert(vector<vector<int>>& intervals, vector<int>& newInterval) {
        int size = intervals.size();

        if (size == 0) {
            intervals.push_back(newInterval);

            return intervals;
        }

        int i = 0;

        vector<vector<int>> result;

        while (i < size && intervals[i][1] < newInterval[0]) {
            result.push_back(intervals[i]);

            i++;
        }


        while (i < size && newInterval[1] >= intervals[i][0]) {
            newInterval[0] = min(intervals[i][0], newInterval[0]);
            newInterval[1] = max(newInterval[1], intervals[i][1]);

            i++;
        }


        result.push_back(newInterval);

        while (i < size) {
            result.push_back(intervals[i]);

            i++;
        }

        return result;
    }
};
```

**Time complexity:** O(n)

**Space complexity:**
- O(1) extra space.
- O(n) space for the output list.

This is the **optimized** solution.

**Binary Search**

```cpp
class Solution {
public:
    vector<vector<int>> insert(vector<vector<int>>& intervals, vector<int>& newInterval) {
        if (intervals.empty()) {
            return {newInterval};
        }

        int n = intervals.size();
        int target = newInterval[0];
        int left = 0, right = n - 1;

        while (left <= right) {
            int mid = (left + right) / 2;
            if (intervals[mid][0] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        intervals.insert(intervals.begin() + left, newInterval);

        vector<vector<int>> res;
        for (const auto& interval : intervals) {
            if (res.empty() || res.back()[1] < interval[0]) {
                res.push_back(interval);
            } else {
                res.back()[1] = max(res.back()[1], interval[1]);
            }
        }

        return res;
    }
};
```

**Time complexity:** O(n)

**Space complexity:**
- O(1) extra space.
- O(n) space for the output list.

**Greedy**

```cpp
class Solution {
public:
    vector<vector<int>> insert(vector<vector<int>>& intervals, vector<int>& newInterval) {
        vector<vector<int>> res;
        int newStart = newInterval[0];
        int newEnd = newInterval[1];
        int n = intervals.size();
        for (int i = 0; i < n; i++) {
            if (intervals[i][0] > newEnd) {
                res.push_back(newInterval);
                copy(intervals.begin() + i, intervals.end(), back_inserter(res));
                return res;
            } else if (intervals[i][1] < newStart) {
                res.push_back(intervals[i]);
            } else {
                newInterval[0] = min(newInterval[0], intervals[i][0]);
                newInterval[1] = max(newInterval[1], intervals[i][1]);
            }
        }
        res.push_back(newInterval);
        return res;
    }
};
```


**Time complexity:** O(n)

**Space complexity:**
- O(1) extra space.
- O(n) space for the output list.