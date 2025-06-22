#ifndef MOVIE_H
#define MOVIE_H

#include <iostream>
#include <string>
#include <cstdlib> // For exit()
#include <fstream>

using namespace std;

struct Movie {
    string title;
    int releaseYear;
};

void printMenu();
void addMovie();
void addToDatabase(const Movie& movie);
void displayMovie();

#endif