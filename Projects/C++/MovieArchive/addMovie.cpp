#include "movie.h"

void addMovie() {
    Movie movie;
    
    cout << "\n" << "Enter the title of the movie: ";
    cin.ignore(); // To ignore the leftover newline character from previous input
    getline(cin, movie.title);

    cout << "\n" << "Enter the releaseYear of the movie: ";
    cin >> movie.releaseYear;

    addToDatabase(movie);
}