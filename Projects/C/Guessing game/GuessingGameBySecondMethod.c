#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>

int isNumber(char* str) {
  if (strlen(str) == 1 && str[0] == '\n') {
    return 0;
  }
  
  for(int i = 0; i < strlen(str) - 1; i++) {
    if(str[i] < '0' || str[i] > '9' || str[i] == ' ') {
      return 0;
    }
  }
  return 1;
}

// Checks if the input is greater than 1 or not
char checkInput(char c, int i) {
  char buffer[3];
  fgets(buffer, 3, stdin);

  if (strlen(buffer) > 1) {
    printf("\nInvalid input!\n");
    printf("\nNerd, enter a valid input.\n");

    if(i == 1) {
      return 1;
    } else {
      return 2;
    }
  }
}

int main() {
    
  srand(time(NULL)); // Seed the random number generator

  restart:

  printf("\n**************************************************\n");
  printf("\nWelcome to the world of Gussing numbers\n");
  printf("\nGuess a number between 0 to 100.\n");
  printf("\n*** You can close the game anytime by using \" ctrl + c \". ***\n");

  char input[100];
  int number, randomNumber, numberOfGuess = 0;
  
  do {
    goOn:
    printf("\n**************************************************\n");
    
    printf("\nAttempt %d\n", ++numberOfGuess);

    printf("\nPlease enter a number: ");
    fgets(input, sizeof(input), stdin);

    if (isNumber(input)) {
      number = atoi(input);

      if (number < 0 || number > 101) {
        printf("\n*** Nerd, I told you to enter a number between 0 to 100. ***\n\n");
      } else {
        randomNumber = (rand() % 101);

        printf("\n\nThis time the number is %d.\n", randomNumber);

        printf("\n**************************************************\n");
      }
    } else {
      printf("\n*** Nerd, I told you to enter a number between 0 to 100. ***\n\n");
    }
    

    if (numberOfGuess % 50 == 0) {
      char c;

      invalid2:

      printf("\nDo you accept defeat? (y/n): ");
      scanf(" %c", &c);

      int i = 0;

      i = checkInput(c, 2);

      if (i ==2) {
        goto invalid2;
      }

      if (c == 'n') {
        goto goOn;
      } else if (c == 'y') {
        return 0;
      } else {
        printf("\nInvalid input!\n");
        printf("\nNerd, enter a valid input.\n");
        goto invalid2;
      }
    }
    
  } while (number != randomNumber);

  if (numberOfGuess == 1) {
    printf("\nCongratulaitons\nYou have gussed the number in 1 attempt.\n");
  } else {
    printf("\nCongratulaitons\nYou have gussed the number in %d attempts.\n", numberOfGuess);
  }

  char c;

  invalid1:

  printf("\nNow you have 2 choices:\n\n1. To restart enter 'r'.\n\n2. To exit enter 'e'.\n\nEnter your choice: ");
  scanf(" %c", &c);

  int i;

  while (((i = getchar()) != '\n') && i != EOF) { // Checks if there is any more character(s) in the input buffer
    printf("\nInvalid input!\n");
    printf("\nNerd, enter a valid input.\n");

    while (((i = getchar()) != '\n') && i != EOF); // Clear the input buffer

    goto invalid1;
  }

  if (c == 'r') {
    goto restart;
  } else if (c == 'e') {
    return 0;
  } else {
    printf("\nInvalid input!\n");

    goto invalid1;
  }

  return 0;
}