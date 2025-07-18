Link: https://leetcode.com/problems/evaluate-reverse-polish-notation/description/

**My solution**

```cpp
class Solution {
public:
    int evalRPN(vector<string>& tokens) {
        stack<int> digits;

        int currentResult;

        for (const string& token : tokens) {
            if (token != "+" && token != "-" && token != "*" && token != "/") {
                digits.push(stoi(token));
            } else {
                int b = digits.top();
                digits.pop();

                int a = digits.top();
                digits.pop();

                currentResult = evaluate(a, b, token[0]);

                digits.push(currentResult);
            }
        }

        return digits.top();
    }

    int evaluate(int a, int b, char operand) {
        switch (operand) {
        case '+':
            return a + b;

            break;
        case '-':
            return a - b;

            break;
        case '*':
            return a * b;

            break;
        case '/':
            return a / b;

            break;
        default:
            cout << "Invalid operator" << endl;

            return 0;
        }
    }
};
```

**Time complexity:** O(N) where N is the number of tokens in the input.

**Space complexity:** O(N)

This is the **optimized** solution.

**Cleaner code**

```cpp
class Solution {
public:
    int evalRPN(vector<string>& tokens) {
        stack<int> digits;

        for (const string& token : tokens) {
            if (token == "+" || token == "-" || token == "*" || token == "/") {
                int b = digits.top();
                digits.pop();

                int a = digits.top();
                digits.pop();

                digits.push(applyOperation(a, b, token));
            } else {
                digits.push(stoi(token));
            }
        }

        return digits.top();
    }

    int applyOperation(int a, int b, const string& operand) {
        if (operand == "+") {
            return a + b;
        }

        if (operand == "-") {
            return a - b;
        }

        if (operand == "*") {
            return a * b;
        }

        return a / b;
    }
};
```

**Time complexity:** O(N) where N is the number of tokens in the input.

**Space complexity:** O(N)