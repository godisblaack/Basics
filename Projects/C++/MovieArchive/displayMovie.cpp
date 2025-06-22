#include "movie.h"

void displayMovie() {
    cout << "\n" << "List of movies:" << "\n" << "\n";

    ifstream file;
    file.open("../database/movieData.csv");

    if (file.is_open()) {
        string str;

        while (!file.eof()) {
            
            getline(file, str, ',');
            
            if (str.empty()) {
                continue;
            }
            // The program will crash without the "if (str.empty())" check, because when we were storing the data in the file, we used \n after every line, so after the last line of data we use \n which entered an empty line in the file. Now, after reading all the data from the file the program is going to the last empty line and getting crashed. So, this line will check if the line is empty or not, if it is empty then it will skip it.

            Movie movie;

            movie.title = str;

            getline(file, str);

            try {
                movie.releaseYear = stoi(str);
            } catch (const invalid_argument&) {
                cout << "Error converting release year for movie: " << movie.title << endl;
                break;
            }

            cout << movie.title << ", " << movie.releaseYear << "\n";
        }
    } else {
        cout << "\n" << "Error opening file!" << "\n" << endl;
    }

    cout << "\n" << "End of the list!" << '\n' << endl;
}