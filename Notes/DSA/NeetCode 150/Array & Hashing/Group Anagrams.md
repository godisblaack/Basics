Link: https://leetcode.com/problems/group-anagrams/description/

**My solution** 

```cpp
class Solution {
public:
    vector<vector<string>> groupAnagrams(vector<string>& strs) {
        vector<vector<string>> anagramGroups;
        vector<string> anagramGroup;

        if (strs.size() == 0) {
            return anagramGroups;
        }

        if (strs.size() == 1) {
            anagramGroup.push_back(strs[0]);

            anagramGroups.push_back(anagramGroup);

            return anagramGroups;
        }

        while (strs.size() != 0) {
            string currentWord = strs[0];
            strs.erase(strs.begin() + 0);

            anagramGroup.push_back(currentWord);

            for (int i = 0; i < strs.size(); i++) {
                if (isAnagram(currentWord, strs[i])) {
                    anagramGroup.push_back(strs[i]);

                    strs.erase(strs.begin() + i);

                    i--; // Resetting the index because the size of the vector changed
                }
            }

            anagramGroups.push_back(anagramGroup);

            anagramGroup.clear();
        }

        return anagramGroups;
    }

    bool isAnagram(string word1, string word2) {
        if (word1.length() != word2.length()) {
            return false;
        }

        char chCount[26] = {0};

        for (int i = 0; i < word1.length(); i++) {
            chCount[word1[i] - 'a']++;
            chCount[word2[i] - 'a']--;
        }

        for (int c : chCount) {
            if(c != 0) {
                return false;
            }
        }

        return true;
    }
};
```

**Time complexity:** O($N^{2} K$), where $N^{2}$ is due to the nested loop and K is for the loop that runs while checking if two words are anagram or not.

**Space complexity:** O(N K)

I got TLE for the last 2 test cases, and I was not able to think of an optimized solution.

**Optimized solution**

```cpp
class Solution {
public:
    vector<vector<string>> groupAnagrams(vector<string>& strs) {
        unordered_map<string, vector<string>> map;

        for (const string& word : strs) {
            string sortedWord = word;
            sort(sortedWord.begin(), sortedWord.end());

            map[sortedWord].push_back(word);
        }

        vector<vector<string>> result;
        for (auto& entry : map) {
            result.push_back(entry.second);
        }

        return result;
    }
};
```

**Time complexity:** O(N * K log K), where time complexity for:  
sorting each string: O(K log K)  
for N strings: O(N * K log K)  
building the result vector: O(N)

**Space complexity:** O(N * K)