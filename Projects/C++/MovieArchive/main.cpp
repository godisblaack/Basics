#include "movie.h"

int main() {
    while (true) {
        printMenu();

        int condition;

        cin >> condition;
        
        switch (condition) {
            case 1: 
                addMovie();
                break;

            case 2:
                displayMovie();
                break;

            case 3:
                cout << "\n" << "Bye Bye" << "\n" << endl;
                exit(0);
            
            default:
                cout << "\n" << "Invalid Input!" << "\n" << endl;
        }
    }

    return 0;
}