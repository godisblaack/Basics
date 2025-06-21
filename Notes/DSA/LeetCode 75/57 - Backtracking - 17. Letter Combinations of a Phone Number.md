Link: https://leetcode.com/problems/letter-combinations-of-a-phone-number/description/

**My solution**

```cpp
class Solution {
public:
    vector<string> letterCombinations(string digits) {
        vector<string> combinations;

        vector<int> numbers = digitConverter(digits);

        vector<vector<string>> mapping = {
            {}, {}, {"a", "b", "c"}, {"d", "e", "f"}, {"g", "h", "i"}, 
            {"j", "k", "l"}, {"m", "n", "o"}, {"p", "q", "r", "s"}, 
            {"t", "u", "v"}, {"w", "x", "y", "z"}
        };

        if (numbers.size() == 0) {
            return combinations;
        } else if (numbers.size() == 1) {
            combinations = mapping[numbers[0]];

            return combinations;
        } else if (numbers.size() == 2) {
            sizeTwo(numbers, mapping, combinations);
        } else if (numbers.size() == 3) {
            sizeThree(numbers, mapping, combinations);
        } else {
            sizeFour(numbers, mapping, combinations);
        }

        return combinations;
    }

    vector<int> digitConverter(string& digits) {
        vector<int> numbers;

        for (auto digit : digits) {
            numbers.push_back(digit - '0');
        }

        return numbers;
    }

    void sizeTwo(vector<int>& numbers, vector<vector<string>>& mapping, vector<string>& combinations) {
        for (int i = 0; i < mapping[numbers[0]].size(); i++) {
            for (int j = 0; j < mapping[numbers[1]].size(); j++) {
                combinations.push_back(mapping[numbers[0]][i] + mapping[numbers[1]][j]);
            }
        }
    }

    void sizeThree(vector<int>& numbers, vector<vector<string>>& mapping, vector<string>& combinations) {
        for (int i = 0; i < mapping[numbers[0]].size(); i++) {
            for (int j = 0; j < mapping[numbers[1]].size(); j++) {
                for (int k = 0; k < mapping[numbers[2]].size(); k++) {
                    combinations.push_back(mapping[numbers[0]][i] + mapping[numbers[1]][j] + 
                                           mapping[numbers[2]][k]);
                }
            }
        }
    }

    void sizeFour(vector<int>& numbers, vector<vector<string>>& mapping, vector<string>& combinations) {
        for (int i = 0; i < mapping[numbers[0]].size(); i++) {
            for (int j = 0; j < mapping[numbers[1]].size(); j++) {
                for (int k = 0; k < mapping[numbers[2]].size(); k++) {
                    for (int l = 0; l < mapping[numbers[3]].size(); l++) {
                        combinations.push_back(mapping[numbers[0]][i] + mapping[numbers[1]][j] + 
                                               mapping[numbers[2]][k] + mapping[numbers[3]][l]);
                    }
                }
            }
        }
    }
};
```

**Time complexity:** O($3^{N} 4^{M}$)

**Space complexity:** O($4^{N}$)

where N is the number of digits mapped to 3 letters and M is the number of digits mapped to 4 letters (digits 7 and 9).

This is **not** the optimized solution.

**Optimized solution**

```cpp
class Solution {
public:
    vector<string> letterCombinations(string digits) {
        if (digits.empty()) return {};

        vector<string> result;
        vector<string> mapping = {
            "", "", "abc", "def", "ghi", "jkl", 
            "mno", "pqrs", "tuv", "wxyz"
        };

        string current;
        backtrack(0, digits, mapping, current, result);
        return result;
    }

    void backtrack(int index, const string& digits, 
                   const vector<string>& mapping, 
                   string& current, vector<string>& result) {
        if (index == digits.size()) {
            result.push_back(current);
            return;
        }

        int num = digits[index] - '0';
        for (char c : mapping[num]) {
            current.push_back(c);
            backtrack(index + 1, digits, mapping, current, result);
            current.pop_back(); // backtrack
        }
    }
};
```

**Time complexity:** O($4^{N} N$)

**Space complexity:** O($N 4^{N}$)