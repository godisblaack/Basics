Link: https://leetcode.com/problems/string-compression/description/

**My 1st solution**

```cpp
```cpp
class Solution {
public:
    int compress(vector<char>& chars) {
        string s;
        char temp = chars[0];
        int count = 0;

        for (char ch: chars) {
            if (ch == temp) {
                count++;
            } else if (count == 1) {
                s += temp;
                temp = ch;
                count = 1;
            } else if (count > 1) {
                s += temp;
                s += to_string(count);
                temp = ch;
                count = 1;
            }
        }

        if (count == 1) {
            s += temp;
        } else {
            s += temp;
            s += to_string(count);
        }

        for (int i = 0; i < s.length(); i++) {
            chars.insert(chars.begin() + i, s[i]);
        }

        return s.length(); 
    }
};
```

**Time complexity:** O($N^{2}$)

**Space complexity:** O(N)

**My 2nd solution**

```cpp
class Solution {
public:
    int compress(vector<char>& chars) {
        int count = 0;
        string s;

        char match = chars[0];

        for (int i = 0; i < chars.size(); i++) {
            if (match == chars[i]) {
                count++;

            } else {
                match = chars[i];

                if (count == 1) {
                    s = s + chars[i - 1];
                } else {
                    s = s + chars[i - 1] + to_string(count);
                }

                count = 1;
            }
        }

        if (count == 1) {
            s = s + chars[chars.size() - 1];
        } else {
            s = s + chars[chars.size() - 1] + to_string(count);
        }

        for (int i = 0; i < s.length(); i++) {
            chars[i] = s[i];
        }

        return s.length();
    }
};
```

**Time complexity:** O(N)

**Space complexity:** O(N)

Both the solutions are **not** optimized.

**Optimized solution**

```cpp
class Solution {
public:
    int compress(vector<char>& chars) {
        int write_index = 0;
        int read_index = 0;

        while (read_index < chars.size()) {
            char current_char = chars[read_index];
            int count = 0;

            // Count consecutive occurrences of the current character
            while (read_index < chars.size() && chars[read_index] == current_char) {
                read_index++;
                count++;
            }

            // Write the character to the compressed array
            chars[write_index++] = current_char;

            // If the count is greater than 1, write the count as digits
            if (count > 1) {
                string count_str = to_string(count);
                for (char c : count_str) {
                    chars[write_index++] = c;
                }
            }
        }

        return write_index;
    }
};
```

**Time complexity:** O(N)

**Space complexity:** O(1)