Link: https://leetcode.com/problems/car-fleet/description/

I was not able to solve it.

**Better approach - Sort with time to reach target**

```cpp
class Solution {
public:
    int carFleet(int target, vector<int>& position, vector<int>& speed) {
        int n = position.size();

        vector<pair<int, double>> cars;

        for (int i = 0; i < n; ++i) {
            double time = (double)(target - position[i]) / speed[i];

            cars.push_back({position[i], time});
        }

        // Sort by position descending (closest to target first)
        sort(cars.rbegin(), cars.rend());

        int fleets = 0;

        double currentFleetTime = 0;

        for (auto& [pos, time] : cars) {
            if (time > currentFleetTime) {
                fleets++;
                
                currentFleetTime = time;
            }
            // Otherwise, car merges into an existing fleet
        }

        return fleets;
    }
};
```

**Time complexity:** O(N log N) 

**Space complexity:** O(N)

**Optimized solution - Monotonic stack with sorted times**

```cpp
class Solution {
public:
    int carFleet(int target, vector<int>& position, vector<int>& speed) {
        int n = position.size();

        vector<pair<int, double>> cars;

        for (int i = 0; i < n; ++i) {
            double time = (double)(target - position[i]) / speed[i];
            
            cars.push_back({position[i], time});
        }

        // Sort by position descending
        sort(cars.rbegin(), cars.rend());

        vector<double> stack;

        for (auto& [pos, time] : cars) {
            if (stack.empty() || time > stack.back()) {
                stack.push_back(time); // New fleet
            }
            // Else: car joins an existing fleet
        }

        return stack.size();
    }
};
```

**Time complexity:** O(N log N) 

**Space complexity:** O(N)