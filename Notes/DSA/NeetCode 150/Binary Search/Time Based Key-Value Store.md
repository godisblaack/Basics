Link: https://leetcode.com/problems/time-based-key-value-store/description/

I was not able to solve it. My approach is exactly as same as the optimized solution. I had one issue in binary search. I was ending it early. I was copying the entire vector for every call, so I got TLE for my solution.

**Optimized solution** (My solution with above mentioned fixes by AI)

```cpp
class TimeMap {
public:
    unordered_map<string, vector<pair<string, int>>> timeMap;

    TimeMap() {
        
    }
    
    void set(string key, string value, int timestamp) {
        timeMap[key].push_back({value, timestamp});    
    }
    
    string get(string key, int timestamp) {
        if (timeMap.find(key) != timeMap.end()) {
            return binarySearch(timeMap, key, timestamp);
        } else {
            return "";
        }
    }

    string binarySearch(unordered_map<string, vector<pair<string, int>>>& timeMap, string key, int timestamp) {
        const vector<pair<string, int>>& valueTimestamp = timeMap[key];

        string value = "";

        int left = 0;
        int right = valueTimestamp.size() - 1;

        while (left <= right) {
            int mid = left + ((right - left) / 2);

            if (valueTimestamp[mid].second <= timestamp) {
                value = valueTimestamp[mid].first;

                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        return value;
    }
};

/**
 * Your TimeMap object will be instantiated and called as such:
 * TimeMap* obj = new TimeMap();
 * obj->set(key,value,timestamp);
 * string param_2 = obj->get(key,timestamp);
 */
```

**Time complexity:** O(log N), where N is the number of timestamps for that key. 

**Space complexity:** O(N), where N is the total number of pair stored.

**Cleaner code**

```cpp
class TimeMap {
public:
    unordered_map<string, vector<pair<int, string>>> timeMap;

    TimeMap() {}

    void set(string key, string value, int timestamp) {
        timeMap[key].emplace_back(timestamp, value);
    }

    string get(string key, int timestamp) {
        const auto& vec = timeMap[key];
        int left = 0, right = vec.size() - 1;
        string result = "";

        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (vec[mid].first <= timestamp) {
                result = vec[mid].second;
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        return result;
    }
};

/**
 * Your TimeMap object will be instantiated and called as such:
 * TimeMap* obj = new TimeMap();
 * obj->set(key,value,timestamp);
 * string param_2 = obj->get(key,timestamp);
 */
 ```

 **Time complexity:** O(log N), where N is the number of timestamps for that key. 

 **Space complexity:** O(N), where N is the total number of pair stored.