Link: https://leetcode.com/problems/reverse-vowels-of-a-string/description/

**My 1st solution**

```cpp
class Solution {
public:
    string reverseVowels(string s) {
        char* front = &s.front();
        char* back = &s.back();

        while(front < back) {
            while (isVowel(*front) && front < back) {
                front++;
            }

            while (isVowel(*back) && front < back) {
                back--;
            }

            if (front < back) {
                swap(*front, *back);
                
                front++;
                back--;
            } else {
                break;
            }
        }

        return s;
    }

    bool isVowel(char ch) {
        return (tolower(ch) != 'a' && tolower(ch) != 'e' && tolower(ch) != 'i' && tolower(ch) != 'o' && tolower(ch) != 'u');
    }

    void swap(char& front, char& back) {
        char temp = front;
        front = back;
        back = temp;
    }
};
```

**Time complexity:** O(N)

**Space complexity:** O(1)

This is the **optimized** solution.

**My 2nd solution**

```cpp
class Solution {
public:
    string reverseVowels(string s) {
        vector<char> vowelsInString;

        for (int i = 0; i < s.length(); i++) {
            if (tolower(s[i]) == 'a' || tolower(s[i]) == 'e' || tolower(s[i]) == 'i' || tolower(s[i]) == 'o' || tolower(s[i]) == 'u') {
                vowelsInString.push_back(s[i]);
            }
        }

        for (int i = 0; i < vowelsInString.size() / 2; i++) {
            char temp = vowelsInString[i];
            vowelsInString[i] = vowelsInString[vowelsInString.size() - i - 1];
            vowelsInString[vowelsInString.size() - i - 1] = temp;
        }

        int pointerToVowelsInString = 0;

        for (int i = 0; i < s.size(); i++) {
            if (tolower(s[i]) == 'a' || tolower(s[i]) == 'e' || tolower(s[i]) == 'i' || tolower(s[i]) == 'o' || tolower(s[i]) == 'u') {
                s[i] = vowelsInString[pointerToVowelsInString];
                pointerToVowelsInString++;
            }
        }

        return s;
    }
};
```

**Time complexity:** O(N)

**Space complexity:** O(N)

**My 3rd solution**

```cpp
class Solution {
public:
    string reverseVowels(string s) {
        int left = 0;
        int right = s.length() - 1;
        
        while (left < right) {
            while (left < right && !isVowel(s[left]))  {
                left++;
            }
            
            while (left < right && !isVowel(s[right]))  {
                right--;
            }
            
            if (left < right) {
                swap(s[left], s[right]);
                
                left++;
                right--;
            }
        }

        return s;
    }

    bool isVowel(char ch) {
        return (tolower(ch) == 'a' || tolower(ch) == 'e' || tolower(ch) == 'i' || tolower(ch) == 'o' || tolower(ch) == 'u');
    }
};
```
**Time complexity:** O(N)

**Space complexity:** O(N)

This is the **optimized** solution.

**Another solution**

```cpp
class Solution {
public:
    string reverseVowels(string s) {
        string vowels = "aeiouAEIOU";
        int left = 0;
        int right = s.length() - 1;

        while (left < right) {
            while (left < right && vowels.find(s[left]) == string::npos) {
                left++;
            }
            while (left < right && vowels.find(s[right]) == string::npos) {
                right--;
            }

            if (left < right) {
                swap(s[left], s[right]);
                left++;
                right--;
            }
        }
        return s;
    }
};
```

**Time complexity:** O(N)

**Space complexity:** O(1)