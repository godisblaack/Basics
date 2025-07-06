Link: https://leetcode.com/problems/merge-strings-alternately/description/

**My solution**

```cpp
class Solution {
public:
    string mergeAlternately(string word1, string word2) {
        int maxWordLength = 0;
        string result;

        if (word1.length() > word2.length()) {
            maxWordLength = word1.length();
        } else {
            maxWordLength = word2.length();
        }

        for (int i = 0; i < maxWordLength; i++) {
            if (i < word1.length()) {
                result = result + word1[i];
            }

            if (i < word2.length()) {
                result = result + word2[i];
            }
        }

        return result;
    }
};
```

**Time Complexity:** O(L1 + L2)  
Since maxLength is either L1 or L2, and in the worst case (e.g., word1 is very long and word2 is very long), the loop will run approximately L1 + L2 times (considering both strings are fully traversed by the loop). More precisely, the number of operations within the loop is proportional to L1 + L2 because each character from word1 and word2 is processed exactly once.

**Space Complexity:** O(L1 + L2)  

This is the **optimized** solution. The other way to do it is as follows:

```cpp
class Solution {
public:
    std::string mergeAlternately(std::string word1, std::string word2) {
        std::string merged = "";
        int i = 0, j = 0;
        int n1 = word1.length();
        int n2 = word2.length();

        while (i < n1 && j < n2) {
            merged += word1[i++];
            merged += word2[j++];
        }

        while (i < n1) {
            merged += word1[i++];
        }

        while (j < n2) {
            merged += word2[j++];
        }

        return merged;
    }
};
```

**Time Complexity:** O(L1 + L2)  

**Space Complexity:** O(L1 + L2)