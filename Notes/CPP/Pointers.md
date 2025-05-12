# Pointer

## Pointer

Use of pointer

- Efficiently passing large object
- Dynamic memory allocation
- Enabling polymorphism

```cpp
int main() {
    int number = 11;
    int* ptr;

    cout << *ptr; // Output: Accessing an uninitialized pointer leads to undefined behavior, which could result in a garbage value being printed, a crash, or something else entirely.
    // While using uninitialized pointers, we may end up accessing a part of memory which we are not suppose to access, and the operating system will terminate our program and it will say memory access violation. 

    ptr = nullptr; // We can assign a null value to a pointer, so that we do not accidently access a memory which we are not supposed to. This is a null pointer which is a pointer which doesn't point to anything. In older versions of cpp, we used 'NULL' or '0', to initialize the pointer, and make it a null pointer.
    
    ptr = &number; // Here we have used the address of operator
    cout << ptr; // Output: Address of the variable number

    cout << *ptr; // Output: 10
    // Here we used de-referencing (Indirection) operator

    *ptr = 20; // Changed the value stored in the variable number
    cout << number << " " << *ptr; // Output: 20 20
}
```

## Constant variable and pointer

### Pointer to constant variable

```cpp
int main() {
    const int x = 10;
    const int* ptr = &x; // We read this as pointer to a constant integer. This will give compilation error if we do int* ptr = &x; Here the data is constant but pointer is not, so later we can use the same pointer to point to some other memory location. const int* ptr allows the pointer to point to different locations, but the values being pointed to cannot be modified through this pointer.
    *ptr = 20; // This is not allowed.

    int y = 20;
    ptr = &y; // This is allowed.
}
```

### Constant pointer to a variable

```cpp
int main() {
    int x = 10;
    int* const ptr = &x; // We should initialize the constant pointer after declaring because later we cannot change it and it will be assigned to some garbage memory.

    int y = 20;
    ptr = &y; // This will give an error because we are trying to change the value of constant pointer.
}
```

### Constant pointer to constant variable

```cpp
int main() {
    const int x = 10;
    const int* const ptr = &x; // We read this as constant pointer to a constant integer.
}
```

## Passing pointers to function

### Passing variable by reference

```cpp
void increasePrice(double& price) {
    price *= 1.2;
}

int main() {
    double price = 100;
    increasePrice(price);
    cout << price;
}
```

### Passing pointer to function

```cpp
void increasePrice(double* price) {
    *price *= 1.2;
}

int main() {
    double price = 100;
    increasePrice(&price);
    cout << price;
}
```

## Relationship between arrays and pointers

```cpp
void printNumbers(int numbers[]) {
    // numbers is treated as integer pointer.
    sizeof(numbers); // numbers holds a memory address, so we cannot pass integer array numbers to the size function.

    for (int number: numbers) {}// We cannot loop over a memory address.
}

int main() {
    int numbers[] = {10, 20, 30};
    int* ptr = numbers;
    cout << numbers << " " << ptr;  // Output: hexa-decimal address hexa-decimal address - this hexa-decimal address is the address of the 1st element of the array (&numbers[0]).
    
    cout << *numbers << " " << *ptr;  // Output: 10 10 - first element of the array.

    cout << numbers[2] << " " << ptr[2]; // Output: 30 - third element of the array.
}

// Function parameters that are arrays are passed using reference. This is done for efficiency.
```

### Pointer arithmetic

```cpp
int main() {
    int numbers[] = {10, 20, 30};
    int* ptr = numbers;
    ptr++; // This will point to the 2nd element of the array. The increment happens as follows: current address + size of the data type stored in the array.
    ptr--; // The decrement happens as follows: current address - size of the data type stored in the array.

    cout << *(ptr + 1) << " " << ptr[1] << " " << numbers[1]; // Output: 20 20 20 - *(prt + 1) == ptr[1] == numbers[1]
```

### Comparing pointers

```cpp
int main() {
    int x = 10;
    int y = 20;

    int* ptrX = &x;
    int* ptrY = &y;

    if (ptrX == ptrY) // Here we are comparing two memory addresses.

    if (*ptrX == *ptrY) // Here we are comparing values at the memory location where both the pointers are pointing. 
}
```

## Dynamic memmory allocation

```cpp
// Stack implementation, here we don't need clean up.
int numbers[1000];

// Heap implementation
int* numbers = new int[10];
// Once we used this variable we have to free up the memory or the system will consume more and more memory and eventually system will crash. This is known as memory leak.
delete[] numbers; // Deallocating memory

// Single integer on heap
int* number = new int;
delete number; // Deallocating memory

// Resetting pointers
number = nullptr;
numbers = nullptr;
```

## Dynamic resizing an array

```cpp
int main() {
    int capacity = 5;
    int* numbers = new int [capacity];
    int entries = 0;

    while (true) {
        cout << "Number: ";
        cin >> numbers[entries];
        
        if (cin.fail()) {
            break;
        }

        entries++;

        if (entries == capacity) {
            capacity *= 2;
            int* temp = new int[capacity];
            for (int i = 0; i < entries; i++) {
                temp[i] = numbers[i];
            }

            delete[] numbers;
            numbers = temp;
        }
    }

    for (int i = 0; i < entries; i++) {
        cout << numbers[i] << endl;
    }

    delete[] numbers;
}
```

## Smart pointers

### Unique pointers

Unique pointers owns the memory it is pointing to, no other unique pointer can point to that same memory loaction.
```cpp
#include <iostream>
#include <memory>

using namespace std;

int main() {
    unique_ptr<int> x(new int);
    // We are creating an integer pointer with 'new int' and passing it to the object 'x'. The object is an instance of an unique_ptr class. That class has a function which will be responsible for deleting the integer pointer.

    *x = 10; 
    // x++; We cannot do pointer arithmetics
    cout << x;

    // Helper function which is an generic function (we can tell this by angle brackets (<>)). This function can work with different data types.
    unique_ptr<int> y = make_unique<int>();
    // make_unique<int>() will return an instance of an unique_ptr class. We decleared a variable y of type unique_ptr<int> to store the return of the function unique_ptr<int>.

    auto numbers = make_unique<int[]>(10); // We have to specify the initial size of the array. We cannot use make_unique for an array and then directly dereference it like a normal pointer. You need to access elements using the array index.
    numbers[0] = 5;  // Accessing elements of the array.
}
```

### Shared pointers

```cpp
#include <iostream>
#include <memory>

using namespace std;

int main() {
    shared_ptr<int> x(new int);
    shared_ptr<int> y(x); // Both x and y now share ownership of the memory, and when both go out of scope, the memory will be freed.
}
```

## Passing char pointers pointing to a string to a function

```cpp
#include <iostream>

using namespace std;

// Function to swap two characters
void swap(char* front, char* back) {
    char temp = *front;
    *front = *back;
    *back = temp;
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