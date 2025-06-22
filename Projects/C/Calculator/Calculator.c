#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <math.h>

double isNumber(char* str) {
  for(int i = 0; i < strlen(str) - 1; i++) {
    if(str[i] < '0' || str[i] > '9' || str[i] == ' ') {
      return 0;
    }
  }
  return 1;
}

double division(double a, double b) {
  if (b == 0) {
    printf("\n*** Invalid Argument for Division. ***\n");
    return 0;
  } else {
    return a / b;
  }
}

double modulus(double a, double b) {
  if (b == 0) {
    printf("\n*** Invalid Argument for Modulus. ***\n");
    return 0;
  } else {
    return (int)a % (int)b;
  }
}

void printMenu() {
  printf("\n\n--------------------------------------------------\n");
  printf("\nWelcome to Simple Calculator\n");
  printf("\nChoose one of the following options:");
  printf("\n1. Add");
  printf("\n2. Subtract");
  printf("\n3. Multiply");
  printf("\n4. Divide");
  printf("\n5. Modulus");
  printf("\n6. Power");
  printf("\n7. Exit");
  printf("\nEnter your input: ");
}

int main() {
  char input[100], sFirst[100], sSecond[100];
  double first, second, result;
  int number;

  while(1) {
    printMenu();

    fgets(input, sizeof(input), stdin);

    if (isNumber(input)) {
      number = atoi(input);
      
      if (number == 7) {
        break;
      }

      if (number < 1 || number > 7) {
        printf("\nEnter a valid choice, which is a number between 1 to 7.\n");
        printMenu();
      } else {
        firstNumber:

        printf("\nEnter the first number: ");
        fgets(sFirst, sizeof(sFirst), stdin);

        if (isNumber(sFirst)) {
          first = atoi(sFirst);
        } else {
          printf("\n*** Invlaid input! ***\n\n");

          goto firstNumber;
        }
        
        secondNumber:

        printf("\nEnter the second number: ");
        fgets(sSecond, sizeof(sSecond), stdin);

        if (isNumber(sSecond)) {
          second = atoi(sSecond);
        } else {
          printf("\n*** Invlaid input! ***\n\n");

          goto secondNumber;
        }

        switch (number)
        {
          case 1: 
            result = first + second;
            break;

          case 2: 
            result = first - second;
            break;

          case 3: 
            result = first * second;
            break;

          case 4: 
            result = division(first, second);
            break;

          case 5: 
            result = modulus(first, second);
            break;

          case 6: 
            result = pow(first, second);
            break;
        }

        if (result) {
          printf("\nResult of operation is: %.2f.\n", result);
        }
      };
    } else {
      printf("\n*** Invlaid input!, enter a valid choice which is betweeen 1 to 7. ***\n\n");
    }
  }
  return 0;
}