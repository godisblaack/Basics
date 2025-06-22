# Real-Time Clock in C

This is a simple real-time clock program written in C. It displays the current date and time in both 24-hour and 12-hour formats.

## Features

- Displays the current time in 24-hour format.
- Displays the current time in 12-hour format.
- Displays the current date.
- The screen is refreshed every second to update the time.

## Functions

- `fillTime24(char *buffer, size_t size)`: Fills the buffer with the current time in 24-hour format.
- `fillTime12(char *buffer, size_t size)`: Fills the buffer with the current time in 12-hour format.
- `fillDate(char *buffer, size_t size)`: Fills the buffer with the current date.
- `clearScreen()`: Clears the console screen. It is compatible with both Windows (_WIN32) and Unix-like systems.

## Note

This program uses the `time.h` library to get the current time and `unistd.h` library for the sleep function. Make sure these libraries are available in your system.

## Building and Running

#### Windows OS users

You can download `Clock.exe`, if you are using a `Windows` OS.

#### Other OS users:

To run this game, you need a C compiler and git. You can use gcc or any other C compiler. Here is how you can compile and run the program:

```bash
gcc Clock.c -o Clock
./calculator
```
