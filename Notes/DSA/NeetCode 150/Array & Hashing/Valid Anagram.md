Link: https://leetcode.com/problems/valid-anagram/description/

**My 1st solution**

```cpp
class Solution {
public:
    bool isAnagram(string s, string t) {
        if (s.length() != t.length()) {
            return false;
        }

        sort(s.begin(), s.end());
        sort(t.begin(), t.end());

        for (int i = 0; i < s.length(); i++) {
            if (s[i] != t[i]) {
                return false;
            }
        }

        return true;
    }
};
```

**Time complexity:** O(N log N)

**Space complexity:** O(1)

This is **not** the optimal solution.

**My 2nd solution**

```cpp
class Solution {
public:
    bool isAnagram(string s, string t) {
        if (s.length() != t.length()) {
            return false;
        }

        unordered_map<char, int> sMap;

        for (char ch : s) {
            sMap[ch]++;
        }

        unordered_map<char, int> tMap;
        
        for (char ch : t) {
            tMap[ch]++;
        }

        for (auto& [key, value] : sMap) {
            auto it = tMap.find(key);

            if (it == tMap.end() || it->second != value) {
                return false;
            }
        }

        return true;
    }
};
```

**Time complexity:** O(N), since length of strings s and t are same, otherwise the problem will return false.

**Space complexity:** O(1), bounded since only lowercase english letters are involved.

This is **not** the optimal solution.

**Optimal solution**

```cpp
class Solution {
public:
    bool isAnagram(string s, string t) {
        if (s.length() != t.length()) return false;

        int count[26] = {0};
        for (int i = 0; i < s.length(); ++i) {
            count[s[i] - 'a']++;
            count[t[i] - 'a']--;
        }

        for (int c : count) {
            if (c != 0) return false;
        }
        return true;
    }
};
```

**Time complexity:** O(N + M)

**Space complexity:** O(1), bounded since only lowercase english letters are involved.