Link: https://neetcode.io/problems/meeting-schedule?list=neetcode150

https://leetcode.com/problems/meeting-rooms/description/

**My solution**

```cpp
/**
 * Definition of Interval:
 * class Interval {
 * public:
 *     int start, end;
 *     Interval(int start, int end) {
 *         this->start = start;
 *         this->end = end;
 *     }
 * }
 */

class Solution {
public:
    bool canAttendMeetings(vector<Interval>& intervals) {
        if (intervals.size() == 0) {
            return true;
        }

        sort(intervals.begin(), 
             intervals.end(),
             [](const Interval& a, const Interval& b) {
                    return a.start < b.start;
                }
        );

        for (int i = 0; i < intervals.size() - 1; i++) {
            if (intervals[i].end > intervals[i + 1].start) {
                return false;
            }
        }

        return true;
    }
};
```

**Time complexity:** O(n log n)

**Space complexity:** O(1)

This is the **optimized** solution.