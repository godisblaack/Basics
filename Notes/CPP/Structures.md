# Structures
Abstract data type (ADT): We can define custom data type using this. Another term is Abstraction which means a general model of something.
We use Pascal naming convention for naming a structure.

## Defining structures
```cpp
struct Movie {
    string title;
    int releaseYear;
};

int main() {
    Movie movie; // movie is an object. Object means an instance of a type. movie object is an instance of Movie type.
    // We can access the member of this object using the dot operator.
    movie.title = "Terminator"; 
    movie.releaseYear = 1984;

    cout << movie; // << is known as stream insertion operator. It has function for int, double and other predefined data types but in this case we made a data type called Moive, and there is no predefined function to print movie object, so the compiler doesn't know how to send movie object to output stream. So, this line will give error.

    cout << movie.title << " " << movie.releaseYear; // movie.title is an string and movie.year is an integer, so the compiler can send these to the output stream.
}
```

## Initializing structures
```cpp
struct Movie {
    string title;
    int releaseYear;
};

int main() {
    // If we don't initialize this instance it will hold some garbage value. There are two ways of initializing an instance.
    // 1st method
    Movie movie {"Terminator"};

    // 2nd method
    Movie movie = {"Terminator"};
    // It is not necessary to initialize all the member of the structure. We have to initialize members in order, but if we don't initialize one member then we cannot initialize any member after that, like if we don't give any value for movie.title then we cannot give value for movie.releaseYear. We are not allowed to do Movie movie = {"1984"};.
```
Giving defalut values to members:
```cpp
struct Movie {
    string title; // We don't need to initialize string title = ""; because strings are by default initialized to an empty string.
    int releaseYear = 0;
};
```

## Unpacking structures
```cpp
struct Movie {
    string title;
    int releaseYear;
    bool isPopular;
};

int main() {
    Movie movie = {"Terminator", 1984};
    // 1st method
    string title = movie.title;
    int releaseYear = movie.releaseYear;
    bool isPopular = movie.isPopular;

    /* 2nd method: 
    C++: structured binding
    JS: destructuring
    Python: unpacking
    */
   // We type variable name one for each member of the structure in order, we cannot leave anyone.
   auto [title, releaseYear, isPopular] {movie};
}
```

## Array of structures
```cpp
struct Movie {
    string title;
    int releaseYear;
    bool isPopular;
};

int main() {
    Movie movie[5]; // This is fixed size array of structure Movie.
}
```
Using vector to declare dynamic array of structure Movie. We will discuss about vector in detail in the next part.
```cpp
struct Movie {
    string title;
    int releaseYear;
    bool isPopular;
};

int main() {
    vector<Movie> movies; // This is a dynamic size array of structure Movie.
    // Method 1 for adding element
    Movie movie {"Terminator 1", 1984};
    movies.push_back(movie);

    // Method 2 for adding element
    movies.push_back({"Terminator 2", 1991});

    // Looping to the title of the elements
    for (Movie movie: movies) {
        cout << movie.title << endl;
    }
}
```

## Nesting structures
```cpp
struct Date {
    short year = 1900;
    short month = 1;
    short day = 1;

};

struct Movie {
    string title;
    Date releaseDate; // Nested structure
    bool isPopular;
};

int main() {
    // 1st Method
    Movie movie {"Terminator 1", 1984}; // Here Date.year = 1984;

    // 2nd method
    Date date {1984, 6, 1};
    Movie movie {"Terminator 1", date};

    // 3rd method
    Movie movie {
        "Terminator 1",
        {1984, 6, 1}
    };
}
```

## Comparing structures
```cpp
struct Date {
    short year = 1900;
    short month = 1;
    short day = 1;

};

struct Movie {
    string title;
    Date releaseDate; // Nested structure
    bool isPopular;
};

int main() {
    Movie movie1 {
        "Terminator 1",
        {1984, 6, 1},
        true
    };

    Movie movie2 {
        "Terminator 1",
        {1984, 6, 1},
        true
    };

    // Equality == operator is not defined for structures, so we have to compare individual elements.
    
    if (movie1.title == movie2.title && movie1.releaseDate.year == movie2.releaseDate.year && movie1.releaseDate.month == movie2.releaseDate.month && movie1.releaseDate.day == movie2.releaseDate.day && movie1.isPopular == movie2.isPopular) {
        return 1;
    } else {
        return 0;
    }
}
```

## Working with methods
```cpp
struct Date {
    short year = 1900;
    short month = 1;
    short day = 1;

};

struct Movie {
    string title;
    Date releaseDate;
    bool isPopular;

    // We are going to refer this functions as methods.
    // Methods is a function that is part of an object which can be an instance of a structure of a class.
    bool equals(const Movie& movie) {
        return (
            title == movie.title && 
            releaseDate.year == movie.releaseDate.year && 
            releaseDate.month == movie.releaseDate.month && 
            releaseDate.day == movie.releaseDate.day && 
            isPopular == movie.isPopular
        );
    }
};

int main() {
    Movie movie1 {
        "Terminator 1",
        {1984, 6, 1},
        true
    };

    Movie movie2 {
        "Terminator 1",
        {1984, 6, 1},
        true
    };

    // equals method, method is a function which is part of an object.
    if (movie1.equals(movie2)) {
        return 0;
    } else {
        return 1;
    }
    
}
```

### Operator overloading
We cannot compare to struct object which are not predefined using equality operatror like object1 == object2. To solve this problem we overload the equality operator. This is because this operators are implemented for basic objects like int, float, double etc. Same reason why we cannot use << with cout for structure object.

### Operator overloading inside the structure
```cpp
struct Date {
    short year = 1900;
    short month = 1;
    short day = 1;

};

struct Movie {
    string title;
    Date releaseDate;
    bool isPopular;

    bool operator==(const Movie& movie) const {
        // We were not able to change movie.<member>, but we can change curret <member>, such as title = "a", that's why we put const at the end of the method declaration (which is before curly braces), to make the current object a constant.
        return (
            title == movie.title && 
            releaseDate.year == movie.releaseDate.year && 
            releaseDate.month == movie.releaseDate.month && 
            releaseDate.day == movie.releaseDate.day && 
            isPopular == movie.isPopular
        );
    }
};

int main() {
    Movie movie1 {
        "Terminator 1",
        {1984, 6, 1},
        true
    };

    Movie movie2 {
        "Terminator 1",
        {1984, 6, 1},
        true
    };

    // Now we can do
    if (movie1 == movie2) {
        return 0;
    }

    return 1;
}
```
### Operator overloading outside the structure
This method is good because we can overload stream insertion operator only outside the structure, so if we follow this approach for other operatores, our code will be consistent.
```cpp
struct Date {
    short year = 1900;
    short month = 1;
    short day = 1;

};

struct Movie {
    string title;
    Date releaseDate;
    bool isPopular;

};

bool operator==(const Movie& first, const Movie& second) {
    // We don't need to put const at the end of the method declaration because we have declared both the objects as constant.
    return (
        first.title == second.title && 
        first.releaseDate.year == second.releaseDate.year && 
        first.releaseDate.month == second.releaseDate.month && 
        first.releaseDate.day == second.releaseDate.day && 
        first.isPopular == second.isPopular
    );
}

int main() {
    Movie movie1 {
        "Terminator 1",
        {1984, 6, 1},
        true
    };

    Movie movie2 {
        "Terminator 1",
        {1984, 6, 1},
        true
    };

    if (movie1 == movie2) {
        return 0;
    }
    
    return 1;
}
```

### Overloading stream insertion operator
```cpp
struct Date {
    short year = 1900;
    short month = 1;
    short day = 1;

};

struct Movie {
    string title;
    Date releaseDate;
    bool isPopular;

};
// ostream is short for output stream.
// This operator/function take a Movie and writes it to a stream and returns a new stream.
// We have access to stream which can be our standard output stream like cout. At runtime depending on where we use << operator the stream is going to be different, e.g: we can also use this operator with files, so using the same implementation we can write same object to a file.
// ostream is just an abstraction for an output stream. 
ostream& operator<<(ostream& stream, const Movie& movie) {
    stream << movie.title; // Here we are writing just one member of the object.
    return stream; // We have to return the stream because we have to chain the stream insertion operator.
}

int main() {
    Movie movie1 {
        "Terminator 1",
        {1984, 6, 1},
        true
    };

    Movie movie2 {
        "Terminator 1",
        {1984, 6, 1},
        true
    };

    cout << movie1;
}
```

## Structures and functions
```cpp
struct Date {
    short year = 1900;
    short month = 1;
    short day = 1;

};

struct Movie {
    string title;
    Date releaseDate;
    bool isPopular;

};

ostream& operator<<(ostream& stream, const Movie& movie) {
    stream << movie.title; 
    return stream; 
}

Movie getMovie() {
    Movie movie = {"Terminator", 1984};
    return movie; // We can also write this in a single line as: return {"Terminator", 1984};'
}

void showMovie(Movie& movie) {
    cout << movie.title; // This function is completely unnecessary because we already overloaded stream insertion operator.
}

int main() {
    auto movie = getMovie();
    showMovie(movie);
}
```

## Pointer to structures
```cpp
struct Date {
    short year = 1900;
    short month = 1;
    short day = 1;

};

struct Movie {
    string title;
    Date releaseDate;
    bool isPopular;

};

ostream& operator<<(ostream& stream, const Movie& movie) {
    stream << movie.title; 
    return stream; 
}

Movie getMovie() {
    Movie movie = {"Terminator", 1984};
    return movie; 
}

void showMovie(Movie* movie) {
    cout << (*movie).title; // Dot operator has higher priority than dereference operator.

    // Structure pointer operator
    cout << movie->title; 
    // Both ways are correct.
}

int main() {
    auto movie = getMovie();
    showMovie(&movie);
}
```

## Enumerations
This is an anohter way of creating custom data type.

Replacing magic number
```cpp
int main() {
    cout <<
        "1: List invoices" << endl <<
        "2: Add invoice" << endl <<
        "3: Update invoice" << endl <<
        "Select: ";

    int input;
    cin >> input;

    if (input == 1) { // We should avoide this magin number (1).
        cout << "List invoices";
    }
}
```
```cpp
int main() {
    const int list = 1;
    const int add = 2;
    const int update = 3;

    cout <<
        "1: List invoices" << endl <<
        "2: Add invoice" << endl <<
        "3: Update invoice" << endl <<
        "Select: ";

    int input;
    cin >> input;

    if (input == list) { // Replaced 1 with list variable
        cout << "List invoices";
    }
}
```
Replaceing magic numbers with enum members (Enumerator)
```cpp
enum Action {
    /* By default, the compiler assigns consecutive integer values starting from 0 to each member.
    list,  // list = 0
    add,   // add = 1
    update // update = 2

    Alternatively, we can explicitly assign values to the enumeration members. 
       For example:
       list = 1,
       add = 2,
       update = 3

       If we assign a value to the first member, the compiler will automatically increment
       the subsequent members. For instance:
       list = 1,  // list = 1
       add,       // add = 2
       update     // update = 3
    */

    list = 1,
    add = 2,
    update = 3

};

int main() {
    cout << "1: List invoices" << endl
         << "2: Add invoice" << endl
         << "3: Update invoice" << endl
         << "Select: ";

    int input;
    cin >> input;

    // Using the enumeration to check user input
    if (input == Action::list) {
        cout << "List invoices"; // When the input matches Action::list, we perform the "list invoices" action
    }
}
```

## Strongly typed enum
```cpp
// With our current definition we cannot have another enum with same members.
// Traditional enum definition
enum Action {
    list = 1,
    add = 2,
    update = 3
};

// Attempting to define another enum with the same names results in a compilation error.
enum Operation {
    list = 1,  // Error: Redefinition of enumerator 'list'
    add = 2,
    update = 3
};
```
C++ 11 introduced a new type of enum called `strongly typed enum`.
```cpp
enum class Action {
    list = 1,
    add = 2,
    update = 3

};

enum class Operation {
    list = 1,
    add = 2,
    update = 3

};

int main() {
    cout << "1: List invoices" << endl
         << "2: Add invoice" << endl
         << "3: Update invoice" << endl
         << "Select: ";

    int input;
    cin >> input;

    /* We can't directly compare input with Action::list anymore. The strongly typed enum doesn't implicitly convert to an integer.
    if (input == Action::list) {
        cout << "List invoices";
    }
    */

   // We need to explicitly cast the enum value to an integer for comparison.
   if (input == static_cast<int> (Action::list))   {
        cout << "List invoices";
    }
}
```