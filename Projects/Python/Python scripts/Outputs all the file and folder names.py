import os

def list_files_and_folders(directory, output_file):
    # Open the output file for writing
    with open(output_file, 'w') as file:
        # Walk through the directory
        for root, dirs, files in os.walk(directory):
            file.write(f"Current directory: {root}\n")
            file.write("Directories:\n")
            for dir_name in dirs:
                file.write(f"  - {dir_name}\n")
            file.write("Files:\n")
            for file_name in files:
                file.write(f"  - {file_name}\n")
            file.write("\n")
    print(f"Output written to {output_file}")

if __name__ == "__main__":
    # Change this to the path of your project folder
    project_directory = "<path_of_the_folder>"  
    # This will create an output.txt file in the same directory as the script
    output_file = "output.txt"  
    
    # Check if the provided directory exists
    if not os.path.exists(project_directory):
        print(f"The directory {project_directory} does not exist.")
    else:
        list_files_and_folders(project_directory, output_file)
