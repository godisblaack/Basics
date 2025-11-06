Link: https://leetcode.com/problems/hand-of-straights/description/

I was not able to solve it.

**Sorting**

```cpp
class Solution {
public:
    bool isNStraightHand(vector<int>& hand, int groupSize) {
        if (hand.size() % groupSize != 0) return false;

        unordered_map<int, int> count;
        for (int num : hand) count[num]++;

        sort(hand.begin(), hand.end());
        for (int num : hand) {
            if (count[num] > 0) {
                for (int i = num; i < num + groupSize; i++) {
                    if (count[i] == 0) return false;
                    count[i]--;
                }
            }
        }
        return true;
    }
};
```

**Time complexity:** O(n logn)

**Space complexity:** O(n)

**Heap**

```cpp
class Solution {
public:
    bool isNStraightHand(vector<int>& hand, int groupSize) {
        if (hand.size() % groupSize != 0)
            return false;

        unordered_map<int, int> count;
        for (int n : hand)
            count[n] = 1 + count[n];

        priority_queue<int, vector<int>, greater<int>> minH;
        for (auto& pair : count)
            minH.push(pair.first);

        while (!minH.empty()) {
            int first = minH.top();
            for (int i = first; i < first + groupSize; i++) {
                if (count.find(i) == count.end())
                    return false;
                count[i] -= 1;
                if (count[i] == 0) {
                    if (i != minH.top())
                        return false;
                    minH.pop();
                }
            }
        }
        return true;
    }
};
```

**Time complexity:** O(n logn)

**Space complexity:** O(n)

**Ordered Map**

```cpp
class Solution {
public:
    bool isNStraightHand(vector<int>& hand, int groupSize) {
        if (hand.size() % groupSize != 0) return false;

        map<int, int> count;
        for (int num : hand) count[num]++;

        queue<int> q;
        int lastNum = -1, openGroups = 0;

        for (auto& entry : count) {
            int num = entry.first;
            if ((openGroups > 0 && num > lastNum + 1) ||
                 openGroups > count[num]) {
                return false;
            }

            q.push(count[num] - openGroups);
            lastNum = num;
            openGroups = count[num];

            if (q.size() == groupSize) {
                openGroups -= q.front();
                q.pop();
            }
        }
        return openGroups == 0;
    }
};
```

**Time complexity:** O(n logn)

**Space complexity:** O(n)

**Hash Map**

```cpp
class Solution {
public:
    bool isNStraightHand(vector<int>& hand, int groupSize) {
        if (hand.size() % groupSize != 0) return false;

        unordered_map<int, int> count;
        for (int num : hand) count[num]++;

        for (int num : hand) {
            int start = num;
            while (count[start - 1] > 0) start--;
            while (start <= num) {
                while (count[start] > 0) {
                    for (int i = start; i < start + groupSize; i++) {
                        if (count[i] == 0) return false;
                        count[i]--;
                    }
                }
                start++;
            }
        }
        return true;
    }
};
```

**Time complexity:** O(n)

**Space complexity:** O(n)