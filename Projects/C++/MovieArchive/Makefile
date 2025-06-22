# Compiler and Flags
CXX = g++
CXXFLAGS = -std=c++11 -Wall

# Directories for output
OBJDIR = obj
BINDIR = bin

# Source files
SRC = main.cpp printMenu.cpp addMovie.cpp addToDatabase.cpp displayMovie.cpp

# Object files - change the object files directory
OBJ = $(SRC:%.cpp=$(OBJDIR)/%.o)

# Output executable - change the executable directory
TARGET = $(BINDIR)/movieApp

# Default target: build the program
all: $(TARGET)

# Create the bin directory if it doesn't exist, then link object files
$(TARGET): $(OBJ)
	@mkdir -p $(BINDIR)          # Create the bin directory if it doesn't exist
	$(CXX) $(CXXFLAGS) -o $(TARGET) $(OBJ)

# Rule to compile .cpp files to .o object files inside the obj directory
$(OBJDIR)/%.o: %.cpp movie.h
	@mkdir -p $(OBJDIR)          # Create the obj directory if it doesn't exist
	$(CXX) $(CXXFLAGS) -c $< -o $@

# Clean the build files
clean:
	rm -rf $(OBJDIR) $(BINDIR)

# Run the program after building
run: $(TARGET)
	./$(TARGET)