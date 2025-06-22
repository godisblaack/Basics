#include "movie.h"

void addToDatabase(const Movie& movie) {
    ofstream file;

    file.open("../database/movieData.csv", ios::app);

    if (file.is_open()) {
        file << movie.title << ", " << movie.releaseYear << "\n";

        file.close();

        cout << "\n" << "Movie added successfully!" << "\n" << endl;
    } else {
        cout << "\n" << "Error while opening the file!" << "\n" << endl;
    }
}