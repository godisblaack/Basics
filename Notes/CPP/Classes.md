# Classes

## Object-oriented programming

A type of programming paragdigm (Style of programming).  
Programming paradigms:
- Procedural
- Functional (Centered on functions)
- Object-oriented (Centered on objects)
- Event-driven

### Object

A software entity that has attributes (properties) and functions (methods).

## Class

A blueprint for creating objects. As we can use a recipe for baking same type of cakes, similarly we can use a class to create same type of objects.

We can represent a class using a visual language called UML (unified modeling language). In UML we represent a class using a box with the following three sections. 
- Class name 
- Attributes (Data)
- Functions

Attributes and Functions are called members of a class. With this class we are defining a new data type, which we can do that with structures as well.

Structures: It is about data.  
Classes: It is about data and behaviour (functionality).

### Encapsulation

Combining the data and functions that operate on the data into one unit (which is a class or an object).  
The term class and object are used interchangeably but technically they are different. An object is an instance of a class.

### Defining a rectangle class

Class name

A member variable inside a class can be called:  
Attributes (Technically an attribute in cpp doesn't represeent a member variable. In UML attribute means member variable)  
Member variables (official term used in cpp)  
Fields  
Properties

Methods or Member functions (official term in cpp)

Rectangle.h: The header file represents the interface of the rectangle class. We include header file in the main file so that we can use the feature of the rectangle class in the main class. 

```cpp
#ifndef ADVANCED_RECTANLGE_H
#define ADVANCED_RECTANLGE_H
```

This two lines is known as `header guard`. We define this here to prevent this file to being included multiple times in the compilation process. It can be read as, if the constant ADVANCED_RECTANLGE_H is not defined (from `#ifndef ADVANCED_RECTANLGE_H`) then define it the constant ADVANCED_RECTANLGE_H.  
`#endif` is the end of the definition of the constant ADVANCED_RECTANLGE_H.

Rectanlge.cpp: It contains actual implementation of the class.

Rectangle.h 

```cpp
#ifndef ADVANCED_RECTANLGE_H
#define ADVANCED_RECTANLGE_H

class Rectangle {
    int width;
    int height;

    void draw();
    int getArea();
};

#endif
```

Rectangle.cpp

```cpp
#include "Rectangle.h" // Including the header file
#include <iostream>

using namespace std;

void Rectangle::draw() { // '::' is known as scope resolution operator
    cout << "Drawing a rectangle" << endl;
    cout << "Dimensions: " << width << " * " << height << endl;
}

int Rectangle::getArea() {
    return width * height;
}
```

### Creating an object

main.cpp 

```cpp
#include "Rectangle.h"

int main() {
    Rectangle rectangle; // rectangle is an instance of the Rectangle class

    return 0;
}
```

We created main.cpp, this sepeartion is to reduce the compilation time.  
If we make any changes in Rectangle.h, every file that is dependent on it will get recompiled, including Rectangle.h.  
If we make any changes to Rectangle.cpp, then only this file we be recomplied and it will be linked with the other compiled files.

main.cpp 

```cpp
#include "Rectangle.h"

int main() {
    Rectangle rectangle;
    rectangle.width = 10; // We cannot access width, because it is a private member of the class Rectangle.

    return 0;
}
```
**Note:** By default member variable is a private member of a class. This feature makes the member variable inaccessible outside the class, and this is the main difference between class and structure.

To fix the issue with the access of member variable, we need to make them  public. We can do that by the keyword `public:` in the class definition before the declaration of the member variables.

Rectangle.h

```cpp
#ifndef ADVANCED_RECTANLGE_H
#define ADVANCED_RECTANLGE_H

class Rectangle {
public:
    int width;
    int height;

    void draw();
    int getArea();
};

#endif
```

main.cpp

```cpp
#include "Rectangle.h"
#include <iostream>

using namespace std;

int main() {
    Rectangle rectangle;
    rectangle.width = 10;
    rectangle.height = 20;

    cout << rectangle.getArea(); // Output: 200
    return 0;
}
```

Both the objects `first` and `second` of the class Rectangle are different instances, they are indepentent from each other.

```cpp
int main() {
    Rectangle first;
    Rectangle second;
}
```