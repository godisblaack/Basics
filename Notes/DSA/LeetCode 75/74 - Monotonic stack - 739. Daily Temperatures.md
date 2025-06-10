Link: https://leetcode.com/problems/daily-temperatures/description/

**My solution**

```cpp
class Solution {
public:
    vector<int> dailyTemperatures(vector<int>& temperatures) {
        vector<int> answer(temperatures.size(), 0);

        for (int i = 0; i < temperatures.size(); i++) {
            for (int j = i + 1; j < temperatures.size(); j++) {
                if (temperatures[i] < temperatures[j]) {
                    answer[i] = j - i;
                    
                    break;
                }
            }
        }

        return answer;
    }
};
```

**Time complexity:** O($N^{2}$)

**Space complexity:** O(N)

This is **not** the optimized solution.

**Optimized solution**

```cpp
class Solution {
public:
    std::vector<int> dailyTemperatures(std::vector<int>& temperatures) {
        int n = temperatures.size();
        std::vector<int> answer(n, 0); // Initialize with 0s
        std::stack<int> s; // Stores indices of temperatures

        // Iterate through the temperatures array
        for (int i = 0; i < n; ++i) {
            // While the stack is not empty AND the temperature at the index
            // on top of the stack is less than the current temperature
            while (!s.empty() && temperatures[s.top()] < temperatures[i]) {
                int prev_index = s.top(); // Get the index of the previous colder day
                s.pop();                   // Remove it from the stack

                // Calculate the number of days until a warmer temperature
                answer[prev_index] = i - prev_index;
            }
            
            // Push the current index onto the stack
            s.push(i);
        }

        // Any indices remaining in the stack have no warmer day to their right,
        // so their answer remains 0, as initialized.

        return answer;
    }
};
```

**Time complexity:** O(N)

**Space complexity:** O(N)