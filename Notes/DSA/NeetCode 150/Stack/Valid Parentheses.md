Link: https://leetcode.com/problems/valid-parentheses/description/

**My solution**

```cpp
class Solution {
public:
    bool isValid(string s) {
        stack<char> brackets;

        for (char ch : s) {
            if (ch == '(' || ch == '[' || ch == '{') {
                brackets.push(ch);
            } else {
                if (ch == ')') {
                    if (brackets.empty() || brackets.top() != '(') {
                        return false;
                    } else {
                        brackets.pop();
                    }
                } else if (ch == ']') {
                    if (brackets.empty() || brackets.top() != '[') {
                        return false;
                    } else {
                        brackets.pop();
                    }
                } else if (ch == '}') {
                    if (brackets.empty() || brackets.top() != '{') {
                        return false;
                    } else {
                        brackets.pop();
                    }
                }
            }
        }

        if (brackets.empty()) {
            return true;
        } else {
            return false;
        }
    }
};
```

**Time complexity:** O(n)

**Space complexity:** O(n)

This is the **optimized** solution.

**Optimized solution**

```cpp
class Solution {
public:
    bool isValid(string s) {
        stack<char> brackets;

        unordered_map<char, char> matching = {{')', '('}, {']', '['}, {'}', '{'}};

        for (char ch : s) {
            if (matching.count(ch)) {
                if (brackets.empty() || brackets.top() != matching[ch]) {
                    return false;
                }

                brackets.pop();
            } else {
                brackets.push(ch);
            }
        }

        return brackets.empty();
    }
};
```

**Time complexity:** O(n)

**Space complexity:** O(n)