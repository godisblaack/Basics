Link: https://leetcode.com/problems/generate-parentheses/description/

I was not able to solve it. I thought the exact same solution as the Brute force - With recursion solution but I was not able to code it up.

**Brute force - With recursion**

```cpp
class Solution {
public:
    bool isValid(const string& s) {
        int balance = 0;
        
        for (char c : s) {
            if (c == '(') {
                balance += 1;
            } else {
                balance += -1;
            }

            if (balance < 0) {
                return false;
            }
        }

        return balance == 0;
    }

    void generateAll(string current, int n, vector<string>& result) {
        if (current.length() == 2 * n) {
            if (isValid(current)) {
                result.push_back(current);
            }

            return;
        }

        generateAll(current + '(', n, result);
        generateAll(current + ')', n, result);
    }

    vector<string> generateParenthesis(int n) {
        vector<string> result;
        
        generateAll("", n, result);
        
        return result;
    }
};
```

**Time complexity:** O($2^{2n} * n$)

**Space complexity:** O($2^{2n}$)

**Brute force - Using stack**

```cpp
class Solution {
public:
    bool isValid(const string& s) {
        int balance = 0;
        
        for (char c : s) {
            if (c == '(') {
                balance += 1;
            } else {
                balance += -1;
            }

            if (balance < 0) {
                return false;
            }
        }

        return balance == 0;
    }

    vector<string> generateParenthesis(int n) {
        vector<string> result;

        stack<string> stk;

        stk.push("");

        while (!stk.empty()) {
            string current = stk.top();

            stk.pop();

            if (current.length() == 2 * n) {
                if (isValid(current)) {
                    result.push_back(current);
                }

                continue;
            }
            
            stk.push(current + '(');
            stk.push(current + ')');
        }

        return result;
    }
};
```

**Time complexity:** O($2^{2n} * n$)

**Space complexity:** O($2^{2n}$), , where n is recursion depth + output size.

**Optimized solution - Doing backtracking without stack**

```cpp
class Solution {
public:
    void backtrack(string current, int open, int close, int n, vector<string>& result) {
        if (current.length() == 2 * n) {
            result.push_back(current);

            return;
        }

        if (open < n) {
            backtrack(current + '(', open + 1, close, n, result);
        }

        if (close < open) {
            backtrack(current + ')', open, close + 1, n, result);
        }
    }

    vector<string> generateParenthesis(int n) {
        vector<string> result;

        backtrack("", 0, 0, n, result);
        
        return result;
    }
};
```

**Time complexity:** O($4^{n} / \sqrt{n}$)

**Space complexity:** O(n), where n is recursion depth + output size.

**Optimized solution - Doing backtracking with stack**

```cpp
class Solution {
public:
    vector<string> generateParenthesis(int n) {
        vector<string> result;

        stack<tuple<string, int, int>> stk;

        stk.push({"", 0, 0}); // current string, open count, close count

        while (!stk.empty()) {
            auto [current, open, close] = stk.top();

            stk.pop();

            if (current.length() == 2 * n) {
                result.push_back(current);

                continue;
            }

            if (open < n) {
                stk.push({current + '(', open + 1, close});
            }

            if (close < open) {
                stk.push({current + ')', open, close + 1});
            }
        }

        return result;
    }
};
```

**Time complexity:** O($4^{n} / \sqrt{n}$)

**Space complexity:** O(n), where n is recursion depth + output size.