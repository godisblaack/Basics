Link: https://leetcode.com/problems/gas-station/description/

**My solution**

```cpp
class Solution {
public:
    int canCompleteCircuit(vector<int>& gas, vector<int>& cost) {
        vector<int> difference;

        for (int i = 0; i < gas.size(); i++) {
            difference.push_back(gas[i] - cost[i]);
        }

        int currentGas = 0;

        for (int i = 0; i < difference.size(); i++) {
            currentGas = difference[i];

            int j = (i + 1) % difference.size();

            while (j != i && currentGas > 0) {
                currentGas += difference[j];

                j = ++j % difference.size();
            }

            if (j == i && currentGas >= 0) {
                return i;
            }
        }

        return -1;
    }
};
```

**Time complexity:** $O(n^{2})$

**Space complexity:** O(n)


**Two Pointers**

```cpp
class Solution {
public:
    int canCompleteCircuit(vector<int>& gas, vector<int>& cost) {
        int n = gas.size();
        int start = n - 1, end = 0;
        int tank = gas[start] - cost[start];
        while (start > end) {
            if (tank < 0) {
                start--;
                tank += gas[start] - cost[start];
            } else {
                tank += gas[end] - cost[end];
                end++;
            }
        }
        return tank >= 0 ? start : -1;
    }
};
```

**Time complexity:** O(n)

**Space complexity:** O(1)

**Greedy**

```cpp
class Solution {
public:
    int canCompleteCircuit(vector<int>& gas, vector<int>& cost) {
        if (accumulate(gas.begin(), gas.end(), 0) <
            accumulate(cost.begin(), cost.end(), 0)) {
            return -1;
        }

        int total = 0;
        int res = 0;
        for (int i = 0; i < gas.size(); i++) {
            total += (gas[i] - cost[i]);

            if (total < 0) {
                total = 0;
                res = i + 1;
            }
        }

        return res;
    }
};
```

**Time complexity:** O(n)

**Space complexity:** O(1)