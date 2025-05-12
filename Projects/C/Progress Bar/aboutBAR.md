# Task Progress Bar in C

This is a simple C program that simulates the progress of multiple tasks using a progress bar.

## Program Overview

The program creates a set of tasks, each with a unique ID and a random progress step. Each task's progress is updated at each iteration and displayed as a progress bar. The program continues to update and display the progress of each task until all tasks are complete.

## Features

- Simulates up to 5 tasks concurrently.
- Each task has a unique ID and a random progress step.
- Displays the progress of each task as a progress bar.
- Continues to update and display progress until all tasks are complete.

## How to Use

#### Windows OS users

You can download `ProgressBar.exe`, if you are using a `Windows` OS.

#### Other OS users:

1. Compile the program using a C compiler. For example, if you're using the GCC compiler, you can compile the program using the following command:

```bash
gcc ProgressBar.c -o ProgressBar
```

2. Run the compiled program:

```bash
./ProgressBar
```

3. The program will display the progress of each task as a progress bar until all tasks are complete.

## Note

The `clearScreen` function uses the `system` function to clear the console. The command to clear the console depends on the operating system. The program uses `cls` for Windows and `clear` for other systems.
