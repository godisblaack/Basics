Link: https://leetcode.com/problems/minimum-interval-to-include-each-query/description/


**Brute Force**

```cpp
class Solution {
public:
    vector<int> minInterval(vector<vector<int>>& intervals, vector<int>& queries) {
        vector<int> res;
        for (int q : queries) {
            int cur = -1;
            for (auto& interval : intervals) {
                int l = interval[0], r = interval[1];
                if (l <= q && q <= r) {
                    if (cur == -1 || (r - l + 1) < cur) {
                        cur = r - l + 1;
                    }
                }
            }
            res.push_back(cur);
        }
        return res;
    }
};
```

**Time complexity:** O(m∗n), where m is the length of the array queries and n is the length of the array intervals.

**Space complexity:** O(1) extra space.
O(m) space for the output array.

**Sweep Line Algorithm**

```cpp
class Solution {
public:
    vector<int> minInterval(vector<vector<int>>& intervals, vector<int>& queries) {
        vector<vector<int>> events;
        // Create events for intervals
        for (int i = 0; i < intervals.size(); i++) {
            events.push_back({intervals[i][0], 0, intervals[i][1] - intervals[i][0] + 1, i});
            events.push_back({intervals[i][1], 2, intervals[i][1] - intervals[i][0] + 1, i});
        }

        // Create events for queries
        for (int i = 0; i < queries.size(); i++) {
            events.push_back({queries[i], 1, i});
        }

        // Sort by time and type (end before query)
        sort(events.begin(), events.end(), [](const vector<int>& a, const vector<int>& b) {
            return a[0] == b[0] ? a[1] < b[1] : a[0] < b[0];
        });

        vector<int> ans(queries.size(), -1);
        // Min heap storing [size, index]
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
        vector<bool> inactive(intervals.size(), false);

        for (const auto& event : events) {
            if (event[1] == 0) { // Interval start
                pq.push({event[2], event[3]});
            } else if (event[1] == 2) { // Interval end
                inactive[event[3]] = true;
            } else { // Query
                int queryIdx = event[2];
                while (!pq.empty() && inactive[pq.top().second]) {
                    pq.pop();
                }
                if (!pq.empty()) {
                    ans[queryIdx] = pq.top().first;
                }
            }
        }

        return ans;
    }
};
```

**Time complexity:** O((n+m)log(n+m)), where m is the length of the array queries and n is the length of the array intervals.

**Space complexity:** O(n+m)

**Min Heap**

```cpp
class Solution {
public:
    vector<int> minInterval(vector<vector<int>>& intervals, vector<int>& queries) {
        // Sort intervals based on the start value
        sort(intervals.begin(), intervals.end(), [](auto& a, auto& b) {
            return a[0] < b[0];
        });

        vector<int> sortedQueries = queries;
        sort(sortedQueries.begin(), sortedQueries.end());
        map<int, int> res;

        auto cmp = [](const vector<int>& a, const vector<int>& b) {
            return a[0] > b[0] || (a[0] == b[0] && a[1] > b[1]);
        };
        priority_queue<vector<int>, vector<vector<int>>, decltype(cmp)> minHeap(cmp);

        int i = 0;
        for (int q : sortedQueries) {
            while (i < intervals.size() && intervals[i][0] <= q) {
                int l = intervals[i][0];
                int r = intervals[i][1];
                minHeap.push({r - l + 1, r});
                i++;
            }

            while (!minHeap.empty() && minHeap.top()[1] < q) {
                minHeap.pop();
            }

            res[q] = minHeap.empty() ? -1 : minHeap.top()[0];
        }

        vector<int> result(queries.size());
        for (int j = 0; j < queries.size(); j++) {
            result[j] = res[queries[j]];
        }
        return result;
    }
};
```

**Time complexity:** O(nlogn+mlogm), where m is the length of the array queries and n is the length of the array intervals.

**Space complexity:** O(n+m)