Link: https://leetcode.com/problems/task-scheduler/description/

I was not able to solve it.

**Better solution**

```cpp
class Solution {
public:
    int leastInterval(vector<char>& tasks, int n) {
        unordered_map<char, int> freq;
        for (char task : tasks)
            freq[task]++;

        priority_queue<int> maxHeap;
        for (auto& [task, count] : freq)
            maxHeap.push(count);

        queue<pair<int, int>> cooldown;
        int time = 0;

        while (!maxHeap.empty() || !cooldown.empty()) {
            time++;

            if (!maxHeap.empty()) {
                int cnt = maxHeap.top();
                maxHeap.pop();
                if (--cnt > 0)
                    cooldown.push({cnt, time + n});
            }

            if (!cooldown.empty() && cooldown.front().second == time) {
                maxHeap.push(cooldown.front().first);
                cooldown.pop();
            }
        }

        return time;
    }
};
```

**Time complexity:** O(T + U log U), where T = total tasks, U = unique tasks.

**Space complexity:** O(U), for map, heap, and cooldown queue.