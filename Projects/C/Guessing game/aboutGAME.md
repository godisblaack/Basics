# Number Guessing Game

This is a simple number guessing game implemented in C. The game generates a random number between 0 and 100 and the player has to guess it.

## How to Play

1. The game will prompt you to enter a number between 0 and 100.
2. If your guess is incorrect, the game will prompt you to try again.
3. If your guess is correct, the game will congratulate you and tell you how many attempts it took you to guess the number.
4. After guessing the number correctly, the game gives you two options:
   - To restart the game, enter 'r'.
   - To exit the game, enter 'e'.

## Code Structure

The code consists of several functions:

- `isNumber(char* str)`: Checks if the given string is a number.
- `checkInput(char c, int i)`: Checks if the input is valid.
- `main()`: Contains the main logic of the game.

## How to Run

#### Windows OS users

You can download `GuessingGame.exe` or `GuessingGameBySecondMethod.exe` as per you choice, if you are using a `Windows` OS.

#### Other OS users:

To run this game, you need a C compiler and git. You can use gcc or any other C compiler. Here is how you can compile and run the game:

```bash
gcc game.c -o game
./game
```

There are 2 versions of the game, as per your choice of version, replace the keyword `game` with `GuessingGame` or `GuessingGameBySecondMethod` as per your choice of version.