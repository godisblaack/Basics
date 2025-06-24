Link: https://leetcode.com/problems/non-overlapping-intervals/description/

I was not able to solve it. I was not able to pass all the test case with my solution.

**Optimized solution**

```cpp
class Solution {
public:
    int eraseOverlapIntervals(std::vector<std::vector<int>>& intervals) {
        if (intervals.empty()) {
            return 0;
        }

        // Sort intervals by their end times.
        // If end times are equal, sorting by start time is a good tie-breaker
        // (though not strictly necessary for correctness, it can make it slightly
        // more intuitive for debugging).
        std::sort(intervals.begin(), intervals.end(), [](const std::vector<int>& a, const std::vector<int>& b) {
            if (a[1] != b[1]) { // Sort by end time primarily
                return a[1] < b[1];
            }
            return a[0] < b[0]; // Then by start time for ties
        });

        int non_overlapping_count = 0;
        // Initialize prev_end_time to a value smaller than any possible interval start/end.
        // Or, more simply, initialize with the first interval if you count it immediately.
        long long prev_end_time = std::numeric_limits<long long>::min(); 
        // Using long long to be absolutely safe, though int is usually fine given constraints.
        // An alternative is to initialize non_overlapping_count = 1 and prev_end_time = intervals[0][1]
        // and start loop from i=1.

        for (const auto& interval : intervals) {
            int current_start = interval[0];
            int current_end = interval[1];

            // If the current interval does not overlap with the previously selected interval
            // (i.e., its start time is greater than or equal to the previous interval's end time)
            if (current_start >= prev_end_time) {
                non_overlapping_count++;
                prev_end_time = current_end; // Update the end time for the next comparison
            }
            // Else, the current interval overlaps. We "remove" it by not counting it
            // and keeping the prev_end_time as it is (because the previously selected
            // interval ended earlier, which is better for maximizing non-overlapping intervals).
        }
        
        // The result is total intervals minus the maximum number of non-overlapping intervals kept.
        return intervals.size() - non_overlapping_count;
    }
};
```

**Time complexity:** O(N log N)

**Space complexity:** O(log N)