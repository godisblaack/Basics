Link: https://leetcode.com/problems/partition-labels/description/

I was not able to solve it.

**Two Pointers (Greedy)**

```cpp
class Solution {
public:
    vector<int> partitionLabels(string s) {
        unordered_map<char, int> lastIndex;
        for (int i = 0; i < s.size(); i++) {
            lastIndex[s[i]] = i;
        }

        vector<int> res;
        int size = 0, end = 0;
        for (int i = 0; i < s.size(); i++) {
            size++;
            end = max(end, lastIndex[s[i]]);

            if (i == end) {
                res.push_back(size);
                size = 0;
            }
        }
        return res;
    }
};
```

**Time complexity:** O(n), where n is the length of the string s and m is the number of unique characters in the string s.

**Space complexity:** O(m)