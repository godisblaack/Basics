# Strings 
## C string / C style string
```c
// Functions starting with 'str' prefix are part of the library called cstring. #include <cstring> is included in #include <iostream>

char name1[5] = {'N', 'a', 'm', 'e', '\0'}; // When we define string like this (where '<character>' is know as character literals) we have to explicitly add the Null terminator. If we don't add the null terminator then we are defining array of characters not a c string.

// Null terminator '\0', is automatically added when we use "string literal"
char name2[5] = "Name"; // "Name" is a string literal, literal means value.

// '<character>' is known as character literal below 'm' is a character literal. 
name1[0] = 'm';

cout << strlen(name1); // Output: 4
```

## Concatinating and copying strings
```c
firstName[50] = "firstName";
lastName[50] = "secondName";

strcat(firstName, lastName); // value of the second argument will be added after the value of the first argument in the first argument itself. Remember to give first argument of strcat enough memory to store the value of second argument.

cout << firstName; // Output: firstNamesecondName

strcpy(firstName, lastName); // first argument will be overwritten by the value of second argument. Value of the variable firstName will be in the output. Output: secondName.
```

## C string strcmp() function
```c
// Example
// Compare two strings to see which is greater:

char myStr1[] = "ABCD";
char myStr2[] = "ABCE";
int cmp = strcmp(myStr1, myStr2);
if (cmp > 0) {
  printf("%s is greater than %s\n", myStr1, myStr2);
} else if (cmp < 0) {
  printf("%s is greater than %s\n", myStr2, myStr1);
} else {
  printf("%s is equal to %s\n", myStr1, myStr2);
}
/*
Definition and Usage
The strcmp() function compares two strings and returns an integer indicating which one is greater.

For this comparison characters at the same position from both strings are compared one by one, starting from the left until one of them does not match or the end of a string has been reached. There are three possible scenarios:

If the end of both strings has been reached without any mismatches then the function returns zero.
At the first mismatch, if the ASCII value of the character in the first string is greater then the function returns a positive number.
At the first mismatch, if the ASCII value of the character in the second string is greater then the function returns a negative number.
The strcmp() function is defined in the <string.h> header file.

Syntax
strcmp(const char* str1, const char* str2);
Parameter Values
Parameter	Description
str1	Required. One of the strings to be compared.
str2	Required. One of the strings to be compared.
Technical Details
Returns:	An int value which is positive if the first string is greater, negative if the second string is greater and 0 if the two strings are equal.
*/
```

# C++ string

## Length function
```cpp
// string class is in "#include <string>" is included in #include <iostream>
string name = "Name";
cout << name.length(); // Output: 4
```

## Concatination

```cpp
string name = "Name";
name = name + "test"; // We can concatenate another string directly using "+" operator.
```

## Copying string

```cpp
string name = "Name";
string anotherName = name; // We can directly copy one string to another.
```

## Comparing strings

We can use comparison operators with `string` in cpp, like <, >, =, etc.

## String functions (usecase: variableName.function())

- length(): Returns the length of the string.
- starts_with("argument")
- ends_with("argument")
- empty(): Returns boolean value.
- front(): Returns the first character.
- back(): Returns the last character, it is as same as variableName[variableName.length() - 1].
- append(count of characters, "argument")
- insert(position, "string to insert")
- erase(start position, number of characters to delete)
- clear()
- replace(position, number of characters to replace, "string to be replace with")
- find("argument", starting position(optional)): With this we can find the first occurrence of the argument in the content. Returns size_type value which is an alias for size_t which is an alias for unsigned long long. So when this function don't find the argument then it will return -1, but size_t is unsigned so it will return the largest integer value.
- rfind("argument"): Starts the search from the end.
- find_first_of("argument"): Returns the first occurrence of any of the thing from argument which is present in the content.
- find_last_of("argument")
- find_first_not_of("argument"): This finds the first occurrence of a character which is not present in the argument.
- find_last_not_of("argument"): This finds the last occurrence of a character which is not present in the argument.

## Substring function
```cpp
string name = "Name";
string copy = name.substr(starting position, number of characters (optional))
```

## Working with character
```cpp
int main() {
  string name = "Mosh Hamedani";
  cout << islower(name[0]); // Output: 0 - meaning false.
  cout << isupper(name[0]); // Output: 1 - meaning false.
  cout << isalpha(name[0]); // Output: 1 - this function returns true if the character is an alphabet.
  cout << isdigit(name[0]); // Output: 0 - this function returns true if the character is a digit.
  cout << isspace(name[0]); // Output: 0 - this function returns true if the character is a space.

  cout << toupper('a'); // Output: 65 - ASCII value of A.
  cout << tolower('A'); // Output: 97 - ASCII value of a.
  cout << (char) toupper('a'); // Output: A - we used c style casting.
  cout << (char) toupper('-'); // Output: - - if we give non-alphabetic character we will get that character itself as output.
}
```

## String maipulation: string to digits
```cpp
// String to digit
double price = stod("19.99"); // Output: 19.99
double price = stod("19.x99"); // Output: 19
double price = stod("19.99x45"); // Output: 19.99
double price = stod("x19.99"); // Output: error
// Other available functions: stoi, stod, stof, stol
```
## String maipulation: digits to string
```cpp
string str = to_string(19.9); // Output: 19.900000
```

## Escape sequence
```cpp
char ch = '\''; // Output: '
string str = "\"Hello World\""; // Output: "Hello World"
string str = "\"Hello\nWorld\""; 
/*
Output: 
"Hello 
World"
*/
string str = "\"Hello\tWorld\""; // Output: "Hello   World"
```

## Raw string

```cpp
string str = R"("c:\folder\path")"; // Output:"c:\folder\path"
```

## Passing char pointers pointing to a string to a function
```cpp
#include <iostream>

using namespace std;

// Function to swap two characters
void swap(char* front, char* back) {
    char temp = *front;
    *front = *back;
    *back = temp;  // Corrected swap logic
}

int main() {
    string s = "Hello";

    // Use pointers to the first and last character
    char* front = &s[0];  // Pointer to the first character
    char* back = &s[s.length() - 1];  // Pointer to the last character

    cout << "Before swap: " << s << endl;
    
    // Swap the characters at front and back
    swap(front, back);

    cout << "After swap: " << s << endl;  // Print the string after swap

    return 0;
}
```
## Passing string pointer to function
```cpp
string reverseVowels(string s) {
        char* front = &s[0];
        char* back = &s[s.length() - 1];

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
    ```