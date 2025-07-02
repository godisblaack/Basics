Link: https://neetcode.io/problems/string-encode-and-decode?list=neetcode150

I was not able to solve it.

**Optimized solution**

```cpp
class Solution {
public:
    string encode(vector<string>& strs) {
        string endcodedString;

        for (const string& str : strs) {
            endcodedString += to_string(str.length()) + "#" + str;
        }

        return endcodedString;
    }

    vector<string> decode(string s) {
        vector<string> decodedString;

        int i = 0;

        while (i < s.length()) {
            int j = i;

            while (s[j] != '#') j++;

            int len = stoi(s.substr(i, j - i));

            decodedString.push_back(s.substr(j + 1, len));

            i = j + 1 + len;
        }

        return decodedString;
    }
};
```

**Time complexity:** O(L), where L is the total number of characters across all strings.  
Encoding: O(L): Each character from every input string is processed and appended once, including the length prefix and separator.  
Decoding: O(L): Each character in the encoded string is parsed exactly once to extract lengths and reconstruct original strings.

**Space complexity:** O(L), proportional to the total size of the data being handled.  
Encoding: O(L): The final encoded string stores all characters from the input strings, plus their length indicators and separator #.  
Decoding: O(L): A vector of strings is constructed to hold the original strings, totaling the same number of characters as the encoded version.