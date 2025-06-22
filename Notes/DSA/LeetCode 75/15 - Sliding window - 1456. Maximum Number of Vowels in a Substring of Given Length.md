Link: https://leetcode.com/problems/maximum-number-of-vowels-in-a-substring-of-given-length/description/

**My solution**

```cpp
class Solution {
public:
    int maxVowels(string s, int k) {
        int vowelsCount = 0;

        for (int i = 0; i < k; i++) {
            if (isVowel(s[i])) {
                vowelsCount++;
            }
        }

        int maxVowelsCount = vowelsCount;

        for (int i = 0; i + k < s.length(); i++) {
            if(isVowel(s[i])) {
                vowelsCount--;
            }

            if (isVowel(s[i + k])) {
                vowelsCount++;
            }

            if (vowelsCount > maxVowelsCount) {
                maxVowelsCount = vowelsCount;
            }
        }

        return maxVowelsCount;
    }

    bool isVowel(char ch) {
        if (ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u') {
            return true;
        }

        return false;
    }
};
```

**Time complexity:** O(N)

**Space complexity:** O(1)

This is the **optimzied** solution.