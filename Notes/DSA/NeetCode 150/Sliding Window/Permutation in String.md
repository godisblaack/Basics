Link: https://leetcode.com/problems/permutation-in-string/description/

**My solution**

```cpp
class Solution {
public:
    bool checkInclusion(string s1, string s2) {
        int s1Size = s1.length();
        int s2Size = s2.length();

        if (s1Size > s2Size) {
            return false;
        }

        unordered_map<char, int> s1Map;

        for (char ch : s1) {
            s1Map[ch]++;
        }

        unordered_map<char, int> s2Map;

        for (int i = 0; i < s1Size - 1; i++) {
            s2Map[s2[i]]++;
        }

        for (int left = 0; left < s2Size; left++) {
            if (s1Size + left - 1 < s2Size) {
                s2Map[s2[s1Size + left - 1]]++;
            }

            for (int j = left; j < s1Size + left && j < s2Size; j++) {
                if (s1Map.find(s2[j]) != s1Map.end()) {
                    if (s1Map.find(s2[j])->second == s2Map[s2[j]]) {
                        if (j == s1Size + left - 1) {
                            return true;
                        }
                    } else {
                        break;
                    }
                } else {
                    break;
                }
            }

            s2Map[s2[left]]--;
        }

        return false;
    }
};
```

**Time complexity:** O(size of s1 * (size of s2 - size of s1))

**Space complexity:** O(size of s1)

This is **not** the optimized solution.

**Optimal solution - Sliding window with frequency array**

```cpp
class Solution {
public:
    bool checkInclusion(string s1, string s2) {
        int s1Size = s1.length();
        int s2Size = s2.length();

        if (s1Size > s2Size) {
            return false;
        }

        vector<int> frequency1(26, 0), frequency2(26, 0);

        for (int i = 0; i < s1Size; i++) {
            frequency1[s1[i] - 'a']++;
            frequency2[s2[i] - 'a']++;
        }

        if (frequency1 == frequency2) {
            return true;
        }

        for (int i = s1Size; i < s2Size; i++) {
            frequency2[s2[i] - 'a']++;
            frequency2[s2[i - s1Size] - 'a']--;

            if (frequency1 == frequency2) {
                return true;
            }
        }

        return false;
    }
};
```

*Time complexity:** O(size of s2)

**Space complexity:** O(1)