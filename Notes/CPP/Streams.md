# Streams
## Understanding streams
A stream is essentially a data source or destination, and streams in C++ provide a unified interface to work with different data sources. They allow us to read from or write to various sources such as files, strings, or the console. All stream types in C++ share a similar set of functions, enabling us to interact with them in a consistent manner.
- istream: input stream
    - ifstream: input file stream
    - istringstream: input string stream
- ostream: output stream (An abstraction for a stream to which we can write data.)
    - ofstream: ouput file stream 
    - ostringstream: output string stream
- iostream: input output stream (inherits from both istream and ostream)

The ios class (short for input-output stream) serves as the base class for all standard library stream classes. It extends the functionality of the ios_base class, which is the fundamental base class for all standard library in stream classes. In this way, stream classes inherit functionality from ios, and ios inherits from ios_base.

"Standard Library Stream Classes": This term is preferred because it encompasses all the classes related to input and output (I/O) operations provided by the C++ Standard Library, including istream (input stream), ostream (output stream), and iostream (input-output stream).

### cout
```cpp
extern ostream cout;
// cout is an instance of ostream class. cout is an object of type ostream.
```
### put
This inserts character c into the stream (only single character).
We say like: this method takes a single character and returns a output stream.
```cpp
ostream& put (char c);
```
### write
This method is used to write a block of data to a stream. 
```cpp
ostream& write (const char* s, streamsize n);
```
## Reading from streams
```cpp
int main() {
    cout << "first: ";
    int first;
    cin >> first;

    cout << "second: ";
    int second;
    cin >> second;

    cout << "You entered " << first << " and " << second;
}
/* When you enter [10 20] with a space, the code doesn't behave as expected because of how the system handles input buffers. After entering the values, cin reads the first number (10) and leaves the second number (20) in the input buffer. So when the program proceeds to the next cin, it immediately reads the 20 from the buffer, without waiting for you to enter the second value manually.

All this input streams has a method for clearing the buffer called cin.ignore(). It has 2 parameters, and both are optional because they have default values.
cin.ignore(streamsize n = 1, int_type dlm = traits_type::eof())
The "streamsize n" parameter represents the number of characters to ignore.
The "int_type dlm" (dlm is short for delimeter) parameter represents the character that we are looking for.
*/
```
```cpp
int main() {
    cout << "first: ";
    int first;
    cin >> first;
    cin.ignore(numeric_limit<streamsize>::max(), '\n'); // We are passing the size of largest value that we can represent using the streamsize, which is the type of the first parameter. numeric_limits<int>::max() represents the largest value an integer can store. Similarly numeric_limit<streamsize>::max() represents the largest value streamsize can store.

    cout << "second: ";
    int second;
    cin >> second;

    cout << "You entered " << first << " and " << second;
}
```
## Handling input errors
```cpp
int main() {
    cout << "first: ";
    int first;
    cin >> first;
    cin.ignore(numeric_limit<streamsize>::max(), '\n'); 

    cout << "second: ";
    int second;
    cin >> second;

    cout << "You entered " << first << " and " << second;
}
/* In the code above if the input is invalid then the program will misbehave as follows:
first: a
second: You entered 0 and <garbage_value>
This is called failed state. We can check we the program has entered into the failed state or not by using cin.fail() function.
*/
```
```cpp
int main() {
    int first;
    while(true) {
        cout << "first: ";
        cin >> first;
        if (cin.fail()) {
            cout << "Enter a valid number!" << endl;
            cin.clear(); // We are using this to clear the failed state flag. It is used to clear the fail state flag so that further input operations can be attempted.
            cin.ignore(numeric_limit<streamsize>::max(), '\n'); // We need to clear the buffer, otherwise the program will keep on reading the same value again and again, and we will get the same error message over and over without doing anything. Which is why we are using cin.ignore.
        }
    }

    cout << "second: ";
    int second;
    cin >> second;

    cout << "You entered " << first << " and " << second;
}
```
### Understanding `cin.clear()` and the Input Buffer

To make the behavior of `cin.clear()` clearer, let's dive into how the input buffer works and why clearing it is essential for proper input handling in C++.

### **The Input Buffer and Stream Failure:**

When you use `cin` to take input, it doesn't directly interact with the variable you provide it for. Instead, it first reads the data from the input **buffer**, which stores the raw input until the program can process it.

#### **How the Buffer Works:**

1. **User Input:** 
   When the user enters a value (e.g., `10 20`), the input is stored in the input buffer, which is a temporary storage area.
   
   Example input: `10 20\n`
   
2. **Stream Reads the Data:**
   `cin >> first` reads from the input buffer:
   - It will take the first valid portion of data (e.g., `10`).
   - The remaining part (` 20\n`) stays in the buffer.

3. **Stream State:**
   If there is an error (e.g., the user tries to input a string when an integer is expected), the stream enters a **failed state** (marked by setting the **failbit**). Once this happens:
   - The buffer may still contain **leftover data** that the program hasn't processed yet.
   - The next `cin` operation won't behave as expected because the input stream is now in a **bad state** and cannot process more input.

#### **How the Buffer Affects Input:**

Let's consider this scenario with invalid input:

```cpp
int main() {
    int first;
    cout << "first: ";
    cin >> first; // Suppose user enters 'a' (invalid for int)
    cout << "You entered: " << first << endl; // This will not work properly

    int second;
    cout << "second: ";
    cin >> second; // This might directly read 'a' from the buffer
}
```

### **What Happens Behind the Scenes:**

1. **First Input:**  
   User enters `'a'` (a character instead of an integer), causing `cin >> first` to fail. Now, `cin` enters a **failed state** (`failbit` is set), and **the buffer still contains the invalid input** (`'a'`).

2. **Buffer State:**  
   The buffer now contains:
   ```
   a 20\n
   ```

3. **Failed State and Second Input:**  
   When the program reaches `cin >> second`, `cin doesn't prompt the user again for input`. Instead, it immediately grabs the **next value** from the buffer — in this case, it tries to read `'a'` as an integer. This fails again, and the program keeps failing because the stream is still in a bad state.

### **How `cin.clear()` Fixes This:**

To fix this, we use `cin.clear()` to **clear the error flags** and restore the stream to a valid state. However, this only resets the stream state and **does not remove the invalid input** from the buffer. To handle that, we use `cin.ignore()` to discard any leftover invalid input.

### **Visualizing the Process with `cin.clear()` and `cin.ignore()`**

Let's modify the code to include `cin.clear()` and `cin.ignore()`:

```cpp
int main() {
    int first;
    while (true) {
        cout << "first: ";
        cin >> first;

        if (cin.fail()) {  // If input fails
            cout << "Enter a valid number!" << endl;

            // Clear the fail state so cin can be used again
            cin.clear();  

            // Ignore the invalid input left in the buffer
            cin.ignore(numeric_limits<streamsize>::max(), '\n');  // Discards invalid data

        } else {
            break;  // Break the loop when valid input is entered
        }
    }

    int second;
    cout << "second: ";
    cin >> second;

    cout << "You entered: " << first << " and " << second << endl;
}
```

### **How the Code Works with Buffer and `cin.clear()`:**

1. **Input Failure (Invalid Data):**
   - If the user enters invalid input, `cin` enters a **failed state** and the buffer still holds that invalid input.
   - The program checks `cin.fail()`, and if it's true, it clears the error state using `cin.clear()`.

2. **Clearing the Buffer (`cin.ignore()`):**
   - After clearing the error state, we use `cin.ignore(numeric_limits<streamsize>::max(), '\n')` to discard the remaining invalid input from the buffer. The `numeric_limits<streamsize>::max()` ensures that all characters (including any spaces or newline characters) are removed from the buffer until the end of the line (`'\n'`).

3. **Successful Input:**
   - The program then prompts the user again for valid input. Once valid data is entered, the loop exits, and the program continues to read the second value.

### **Why Both `cin.clear()` and `cin.ignore()` Are Necessary:**

- **`cin.clear()`** resets the stream's error state, allowing further input operations to work.
- **`cin.ignore()`** is necessary to remove invalid characters from the input buffer, ensuring that subsequent inputs are not affected by the leftover invalid data.

### **In Summary:**
- The input buffer holds all the data the user types, and even if the stream enters a failed state, the buffer may still contain **unprocessed data**.
- **`cin.clear()`** resets the error flags, while **`cin.ignore()`** clears the invalid data from the buffer, allowing the program to proceed with clean and valid input.
---
## File stream
- ifstream: input file stream
- ofstream: output file stream
- fstream: It combines the functionality of both ifstream and ofstream. It can be used for both reading and writing data to and from a file.

## Writing to text files
```cpp
#include <iostream>
#include <fstream> // All the file stream classes are defined in this file.
#include <iomanip> // iomanip is short for input output manipulator.

using namespace std;

int main() {
    ofstream file; // 'file' is an object of ofstream class.
    file.open("data.txt"); // If the file data.txt does not exist then it is gonna created and if it does exist then it's content is going to be overwritten.
    if (file.is_open()) {
        file << "Hello World" << endl; // All the streams have the same interface so we can work with them the same way, e.g.: cout << "<text>";
        file << setw(20) << "Hello" << setw(20) << "World" << endl; // We can also use stream manipulator.
        file.close(); // We should always call .close() function because it will release the resource allocated by operating system to work with this file. If we don't do so our file may not be accessible to other programs.
    }
}
```
```cpp
int main() {
    ofstream file; 
    file.open("data.csv");
    if (file.is_open()) {
        file << "id,title,year" << endl;
        file << "1,Terminator 1,1984" << endl;
        file << "2,Terminator 2,1991" << endl;
        // output stream first stores the data into the buffer and then it writes the data into the file specified, and after every line we have 'endl' which will flush the buffer, this may cause performance issue is some cases. We can use '\n' instead of endl, beacuse it will flush the buffer at the end once.
        file << "id,title,year\n"
             << "1,Terminator 1,1984\n"
             << "2,Terminator 2,1991\n";
        file.close();
    }
}
```

### Understanding `endl` and Buffer Flushing

When you write to a file in C++ (or to the console, for that matter), the data isn't immediately written out to the file. Instead, it is stored temporarily in a memory buffer. The reason for using a buffer is to improve performance. Writing to the file can be a relatively slow operation, and using a buffer allows the program to continue running without waiting for each write operation to be completed.

- **`endl`**: When you use `endl`, it does two things:
  1. It adds a newline character (`\n`) to the output, which tells the system to move to the next line.
  2. **It flushes the buffer**, which means the data in the buffer is immediately written to the file (or screen, or whatever output stream you're working with).
  
   Flushing the buffer means the data is immediately written to disk. While this ensures that data is "committed" right away, it comes with a performance cost. Writing data to disk is a relatively slow process, and flushing the buffer after every line means you're performing this slow disk write operation multiple times.

- **Performance Implication**:  
   If you write a large amount of data (such as writing many lines to a file), using `endl` will cause the program to pause after each line, waiting for the data to be written to the file. This can significantly slow down the process because of the repeated flushing.

### Alternative: `\n`

- **`\n`**: On the other hand, when you use `\n` (just a newline character), it **doesn't flush the buffer**. It simply adds a new line to the output. The data remains in the buffer, and the program continues running without waiting for the file write operation to complete.
  
  The data will only be written to the file when the buffer is full or when the program explicitly closes the file. This allows the program to keep writing data without waiting for disk writes after each line.

- **Benefit**: This is more efficient when you're writing a lot of data. The program can keep processing data and only perform the relatively slow disk write operation once at the end (or at specific points), rather than after each line.

### When to Use `endl` vs. `\n`

- **Use `endl`** when you need to ensure that data is immediately written to the file, such as when you're dealing with critical data where it's important to be sure that it's saved right away, or when writing to a terminal where you want to see the output immediately.
  
- **Use `\n`** when you're writing a large amount of data and performance is a concern, since it avoids the unnecessary overhead of frequent disk writes.

### Summary
- `endl` causes the buffer to be flushed after every line, leading to slower performance when writing a lot of data because the system writes to disk after each line.
- `\n` simply adds a new line and does **not** flush the buffer, allowing the program to continue running and writing data without the performance penalty of flushing after each line.
---
## Reading from text files
```cpp
int main() {
    ifstream file; 
    file.open("data.csv");
    /* Content of data.csv:
    id,ti tle,year
    1,Terminator 1, 1984
    2,Terminator 2, 1991
    */
    if (file.is_open()) {
        string str;
        file >> str; // String extraction operator (>>) read from a file untill it find a delimeter (whitespace or backslash n (\n, a new line)).
        cout << str; // Output: id,ti

        getline(file, str); // It reads from the file until it finds backslash n (\n). getline(file, str, '\n'); The third parameter is delimeter, it is there by default.
        cout << str; // Output: id,ti tle,year
        file.close();
    }
```
```cpp
int main() {
    ifstream file; 
    file.open("data.csv");
    /* Content of data.csv:
    id,title,year
    1,Terminator 1, 1984
    2,Terminator 2, 1991
    */
    if (file.is_open()) {
        string str;
        while (!file.eof()) { // file.eof() function returns true if program reaches the end of the file.
        getline(file, str); 
        cout << str << endl; // To print each line in a new line just as it is in the file we are reading from. This function doesn't print the data in a new line if it is in a new line in the reading file. We have to explicitly put endl or \n for that.
        }
        file.close();
    }
```
```cpp
struct Movie {
    int id;
    string title;
    int year;
};

int main() {
    ifstream file; 
    file.open("data.csv");
    if (file.is_open()) {
        string str;
        while (!file.eof()) {
        getline(file, str, ','); 
        
        if (str.empty()) {
            continue;
        } // The program will crash without this line, because when we were storing the data in the file, we used \n after every line, so after the last line of data we use \n which entered an empty line in the file. Now, after reading all the data from the file the program is going to the last empty line and getting crashed. So, this line will check if the line is empty or not, if it is empty then it will skip it.

        Movie movie;
        movie.id = stoi(str); // id is stored as string in the file so we have to explicitly convert it.
        getline(file, str, ',');
        movie.title = str;

        getline(file, str); // There is no comma after the year in the data file, so we will go with \n implementation which is the default implementation.
        movie.year = stoi(str);
        
        cout << str << endl;
        }
        file.close();
    }
```
## Writing to a binary file
There are two types of files text files, and binary files (images, audio files, PDFs, etc).
```cpp
int main() {
    int numbers[] = {1000000, 2000000, 3000000};

    ofstream file("numbers.txt");
    if (file.is_open()) {
        for (auto number: numbers) {
            file << number << endl;
        }

        file.close();
    }
    /*
    File content:
    1000000
    2000000
    3000000

    Each line has \n which is not visible when we open text file. There are 8 characters in each line of this file, each character has size of 1B so the total size of the txt file will be 24B.
    */
}
```
```cpp
int main() {
    int numbers[] = {1000000, 2000000, 3000000};

    ofstream file("numbers.dat", ios::binary); // .dat (short for data) or .bin (short for binary) is the binary file extension. 2nd argument is the mode of the file, which is binary from the ios class.
    if (file.is_open()) {
        file.write(reinterpret_cast<char*>(&numbers), sizeof(numbers)); 
        /* This method has 2 parameters.
        1st is constant character pointer, this is the part of the memory we want to write to the disk. We want to go in the part of the memory where we have stored the array we want to grab the bytes allocated to the array and write them to the disk exactly the same way they are stored in the memory. We cannot use &numbers because it is an integer pointer, so we have to convert it to character pointer, and to do so we will use operator called reinterpret_cast<pointer_type>(pointer_address); 
        2nd parameter is the size of the bytes we want to read from the memory, which we can resolve using sizeof() operator.
        */
        file.close();
    }
    /*
    File content: We cannot open and see the content of binary file. It is for the machine to read.

    The size of the file we be based of the size of the integer on a machine. If in a machine an integer takes 4B then the file size will be 12B, because there are 3 integers. 
    */
}
```
## Reading from binary file
```cpp
int main() {
    int numbers[3]; // We hard coded 3 because we knew the number of integers we want to read. The next implementation is more generalized.

    ifstream file("numbers.dat", ios::binary);

    if (file.is_open()) {
        file.read(reinterpret_cast<char*>(&numbers), sizeof(numbers));

        file.close();
    }
}
```
```cpp
int main() {
    int numbers[3];

    ifstream file("numbers.dat", ios::binary);

    if (file.is_open()) {
        int number;
        while(file.read(reinterpret_cast<char*>(&number), sizeof(number))) {
            cout << number;
        } // Here we are printing numbers to the console while we can read it from the file number.

        file.close();
    }
}
```
```cpp
int main() {
    int numbers[3];

    ifstream file("numbers.dat", ios::binary);

    if (file.is_open()) {
        int number;
        int i = 0;
        while(file.read(reinterpret_cast<char*>(&number), sizeof(number))) {

            numbers[i] = number;
            i++;
        }

        // Printing in reverse
        while(i > 0) {
            cout << numbers[i-1] << '\n';
            i--;
        }

        file.close();
    }
}
```

## Working with file streams (fstream)

```cpp
int main() {
    fstream file;
    file.open("file.txt", ios::in | ios::out | ios:: app | ios::binary);
    /* Here in the second argument we specify one or more opening mode. If the file doesn't exists then this function will create it. 
    ios::in -> Input
    ios::out -> output
    ios::app -> append
    ios::binary -> binary mode
    */
    if (file.is_open()) {
        // Does some work;
        file.close();
    }
    
}
```

## String streams
We have three different types of streams:
- istringstream: reading
- ostringstream: writing
- stringstream: reading and writing

We use this when we need to convert some value to a string and vice versa.

## Converting values to strings
```cpp
int main() {
    double number = 12.34;
    string str = to_string(number);
    cout << str; // Output: 12.340000, we use string stream to have the control over how the value is getting converted to the string.
}
```

```cpp
#include <sstream>
#include <iomanip> // for manipulation of numbers

int main() {
    double number = 12.34;
    stringstream stream; // we can use "stream" with the extraction operator (>>).
    stream << fixed << setprecision(2) << number;
    string str = stream.str();

    cout << str; // Output: 12.34

    stream << fixed << setprecision(1) << number;
    string str = stream.str();

    cout << str; // Output: 12.3 
}
```

### Overloading the to_string function
```cpp
string to_string(double number, int precision) {
    stringstream stream;
    stream << fixed << setprecision(precision) << number;
    string str = stream.str();

    return str;
}
```

## Parsing strings

```cpp
int main() {
    string str = "10 20";
    stringstream stream;
    stream.str(str); // This is same as "string str = stream.str();"

    int first;
    stream >> first; // first will start reading the string str and it will read untill it finds a whitespace. The value of first will be 10, after this line.

    int second;
    stream >> second;

    cout << first + second; // Output: 30
}
```

### Parsing a string and storing it into movie structure

```cpp
struct Movie {
    string title;
    int year;
};

Movie parseMovie(string str) {
    stringstream stream;
    stream.str(str);

    Movie movie;
    getline(stream, movie.title, ','); // stream: we passed our stream and movie.title: target variable.
    stream >> movie.year;

    return movie;
}
```