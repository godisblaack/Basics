# User Management System

This project is a simple user management system written in C. It allows users to register and login with a username and password. The system supports up to 10 users and features password masking for better security during input.

## Features

- Register a new user with a username and password.
- Login using the registered username and password.
- Password input is masked to hide the characters being typed.
- Supports up to 10 users.

## Code Overview

The code is written in C and utilizes the following components:

- **User Struct**: Defines a `User` struct that holds the username and password.
- **Array of Users**: An array `users` to store the registered users.
- **User Count**: An integer `user_count` to keep track of the number of registered users.
- **Register User**: A function `register_user()` to register a new user.
- **Login User**: A function `login_user()` to authenticate a user.
- **Input Credentials**: A function `input_credentials()` to handle user input for username and password with masking for password input.
- **Fix fgets Input**: A helper function `fix_fgets_input()` to remove the newline character added by `fgets`.

## Functions

### `main()`
The main function displays a menu and handles user input to select options for registering, logging in, or exiting the program.

### `register_user()`
This function handles the registration process. It checks if the maximum number of users is reached, prompts for username and password, and stores the new user in the `users` array.

### `login_user()`
This function handles the login process. It prompts for username and password, checks the credentials against the registered users, and returns the index of the user if the login is successful or -1 if it fails.

### `input_credentials()`
This function prompts the user to input a username and password. Password input is masked to hide the characters being typed.

### `fix_fgets_input()`
This helper function removes the newline character from the string read by `fgets`.

## How to Use

#### Windows OS users

You can download `UserManagement.exe`, if you are using a `Windows` OS.

#### Other OS users:

1. Compile the program using a C compiler. For example, if you're using the GCC compiler, you can compile the program using the following command:

```bash
gcc UserManagement.c -o UserManagement
```

2. Run the compiled program:

```bash
./UserManagement
```


3. Follow the on-screen instructions to register or login.

### Sample Output

```
Welcome to User Management
1. Register
2. Login
3. Exit
Select an option: 1

Register a new user
Enter username: user1
Enter password (masking enabled): ******
Registration successful!

Welcome to User Management
1. Register
2. Login
3. Exit
Select an option: 2

Enter username: user1
Enter password (masking enabled): ******
Login successful! Welcome, user1!

Welcome to User Management
1. Register
2. Login
3. Exit
Select an option: 3

Exiting Program.
```

## Limitations

- The system supports a maximum of 10 users.
- Passwords are stored in plain text within the program.
- Username and password length are limited to 30 characters.

## Future Enhancements

- Implement password encryption for better security.
- Increase the maximum number of supported users.
- Improve the user interface for better user experience.
