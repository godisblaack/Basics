Link: https://leetcode.com/problems/determine-if-two-strings-are-close/description/

**My 1st solution**

```cpp
class Solution {
public:
    bool closeStrings(string word1, string word2) {

        if (word1.length() != word2.length()) {
            return false;
        }

        int word1Frequency[26] = {0};
        int word2Frequency[26] = {0};

        for (char ch: word1) {
            word1Frequency[ch - 'a']++;
        }

        for (char ch: word2) {
            word2Frequency[ch - 'a']++;
        }

        for (int i = 0; i < 26; i++) {
            if (word1Frequency[i] > 0) {
                if (word2Frequency[i] > 0) {
                    continue;
                } else {
                    return false;
                }
            }
        }

        for (int i = 0; i < 26; i++) {
            int flag = 0;

            for (int j = 0; j < 26; j++) {
                if (word1Frequency[i] == word2Frequency[j]) {
                    word2Frequency[j] = 0;

                    flag = 1;

                    break;
                }
            }

            if (flag != 1) {
                return false;
            }
        }

        return true;

    }
};
```

**Time complexity:** O(N) on average, O($N^{2}$) = O($26^{2}$) = O(1) in worst case.

**Space complexity:** O(1)

**My 2nd solution**

```cpp
class Solution {
public:
    bool closeStrings(string word1, string word2) {
        if (word1.length() != word2.length()) {
            return false;
        }

        unordered_map<char, int> word1Map;
        unordered_map<char, int> word2Map;

        for (int i = 0; i < word1.length(); i++) {
            word1Map[word1[i]]++;
        }
        
        for (int i = 0; i < word2.length(); i++) {
            word2Map[word2[i]]++;
        }
        
        for (auto& [key, value]: word1Map) {
            if (word2Map.find(key) == word2Map.end()) {
                return false;
            }
        }

        vector<int> word1Values;
        vector<int> word2Values;

        for (auto& [key, value]: word1Map) {
            word1Values.push_back(value);
        }

        for (auto& [key, value]: word2Map) {
            word2Values.push_back(value);
        }

        for (int i = 0; i < word1Values.size(); i++) {
            int flag = 0;

            for (int j = 0; j < word2Values.size(); j++) {
                if (word1Values[i] == word2Values[j]) {
                    word2Values[j] = -1;

                    flag = 1;

                    break;
                }
            }

            if (flag == 0) {
                return false;
            }
        }

        return true;
    }
};
```

**Time complexity:** O(N) on average, O($N^{2}$) = O($26^{2}$) = O(1) in worst case.

**Space complexity:** O(1)

Both these solutions are the **optimized** solution. There is another way to solve this problem.

**Another approach**

```cpp
class Solution {
public:
    bool closeStrings(string word1, string word2) {
        if (word1.length() != word2.length()) {
            return false;
        }

        map<char, int> freq1, freq2;
        for (char c : word1) {
            freq1[c]++;
        }
        for (char c : word2) {
            freq2[c]++;
        }

        if (freq1.size() != freq2.size()) {
            return false;
        }

        vector<int> counts1, counts2;
        vector<char> chars1, chars2;

        for (auto const& [key, val] : freq1) {
            chars1.push_back(key);
            counts1.push_back(val);
        }
        for (auto const& [key, val] : freq2) {
            chars2.push_back(key);
            counts2.push_back(val);
        }

        sort(chars1.begin(), chars1.end());
        sort(chars2.begin(), chars2.end());
        sort(counts1.begin(), counts1.end());
        sort(counts2.begin(), counts2.end());

        return chars1 == chars2 && counts1 == counts2;
    }
};
```

**Time complexity:** O(N) on average, O($N^{2}$) = O($26^{2}$) = O(1) in worst case.

**Space complexity:** O(1)