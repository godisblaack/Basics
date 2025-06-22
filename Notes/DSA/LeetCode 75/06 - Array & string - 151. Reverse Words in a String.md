Link: https://leetcode.com/problems/reverse-words-in-a-string/description/

**My solution**

```cpp
class Solution {
public:
    string reverseWords(string s) {
        string reversedWords;

        if (s.length() == 0) {
            return "";
        } else if (s.length() == 1) {
            return s;
        }

        int i = s.length() - 1;
        int j = s.length() - 1;

        while (i > 0) {
            while (s[i] == ' ' && i > 0) {
                i--;
            }

            j = i;

            while (s[i] != ' ' && i > 0) {
                i--;
            }

            if (i == 0 && s[i] != ' ') {
                i = -1;
            }

            reversedWords = reversedWords + s.substr(i + 1, j - i) + " ";
        }

        j = reversedWords.length() - 1;

        while (reversedWords[j] == ' ' && j > 0) {
            j--;
        }

        reversedWords = reversedWords.substr(0, j + 1);

        return reversedWords;
    }
};
```

**Time complexity:** O(N)

**Space complexity:** O(N)

This is the **optimized** solution. There is a better way to write it.

**Optimized solution**

```cpp
class Solution {
public:
    string reverseWords(string s) {
        std::istringstream iss(s);
        std::string word;
        std::vector<std::string> words;
        while (iss >> word) {
            words.push_back(word);
        }
        std::reverse(words.begin(), words.end());
        std::string result = "";
        for (size_t i = 0; i < words.size(); ++i) {
            result += words[i];
            if (i < words.size() - 1) {
                result += " ";
            }
        }
        return result;
    }
};
```

**Time complexity:** O(N)

**Space complexity:** O(N)