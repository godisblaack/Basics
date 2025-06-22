# Simple Calculator in C

This is a simple calculator program written in C. It provides the following functionalities:

1. **Addition**: Add two numbers.
2. **Subtraction**: Subtract one number from another.
3. **Multiplication**: Multiply two numbers.
4. **Division**: Divide one number by another. If the divisor is zero, it will print an error message.
5. **Modulus**: Find the remainder of division of one number by another. If the divisor is zero, it will print an error message.
6. **Power**: Raise one number to the power of another.
7. **Exit**: Exit the program.

## How to Use

When you run the program, it will display a menu with the above options. Enter the number corresponding to the operation you want to perform.

After choosing an operation, you will be prompted to enter the first and second numbers. If you enter anything other than a number, the program will print an error message and prompt you to enter the number again.

Once you've entered two valid numbers, the program will perform the operation and display the result. If the operation is division or modulus and the second number is zero, the program will print an error message.

The program will continue to display the menu until you choose to exit.

## Building and Running

#### Windows OS users

You can download `Calculator.exe`, if you are using a `Windows` OS.

#### Other OS users:

To run this game, you need a C compiler and git. You can use gcc or any other C compiler. Here is how you can compile and run the program:

```bash
gcc Calculator.c -o Calculator
./calculator
```