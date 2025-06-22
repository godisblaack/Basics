# Makefile

## Basics

How after running `make`, it knows that a file is updated or not?
- By comparing the timestamps.

Run `vim Makefile` on git bash.

```bash
# Press I, and write the following code
a:
    echo "Hello, World"
# Exit using esc followed by :wq
```

Run `make` on msys terminal.

```bash
# Output
echo "Hello, World"
Hello, World
```

After running `make` it gives the above shown output, but it doesn't create any file, so no matter how many times we run `make`, the output will be same.

```makefile
a: a.o
        cc a.o -o a
a.o: a.c
        cc -c a.c -o a.o
a.c:
        echo "int main() {return 0;}" > a.c
```

You can use `make` command on msys to run the `Makefile` and then `./a (the executable file)` command to execute the `a (the executable file)` to see the output.

`a` means `a (the executable file)`. 
`a (the executable file)` is dependent on `a.o`, interpreted by the first line. On the second line we are saying make `a (the executable file)` using `a.o`. Similarly, we are defining how to make `a.o` from `a.c`, and how to make `a.c`.

`a` requires `a.o`, so make searches fo the `a.o` target. `a.o` requires `a.c`, so make searches for the `a.c` target. `a.c` has no dependencies, so the echo command is run. 

The `cc -c` command is then run, because all of the `a.o` dependencies are finished. The top `cc` command is run, because all the `a` dependencies are finished. If you delete `a.c`, all the three targets will be rerun. If you edit it (or change the timestamp to newer than `a.o`), the first two target will run.

If we want to write multiple line of code using echo, we can do that by using `-e` with `echo` as show below:

```makefile
a: a.o
        cc a.o -o a
a.o: a.c
        cc -c a.c -o a.o
a.c:
        echo -e "#include <stdio.h> \nint main() { \nreturn 0; \n}" > a.c
```

If you write any part of the code on the same line with the preprocessor directive the code will not compile anywhere. For example:

```c 
#include <stdio.h> int main() { return 0; }
```

## Makefile Syntax

A Makefile consists of a set of rules. A rule generally looks like this:

```makefile
targets: prerequisites
	command
	command
	command
```

The `targets` are file names, separated by spaces. Typically, there is only one per rule.
The `commands` are a series of steps typically used to make the target(s). These need to start with a `tab character, not spaces`.
The `prerequisites` are also file names, separated by `spaces`. These files need to `exist before` the commands for the target are run. These are also called `dependencies`.

## The essence of Make

Let's start with a hello world example:

```makefile
hello:
	echo "Hello, World"
	echo "This line will print if the file hello does not exist."
```

There's already a lot to take in here. Let's break it down:

We have one target called `hello`. This target has two commands, and has no prerequisites. We'll then run make `hello`. As long as the `hello` file does not exist, the commands will run. If `hello` does exist, no commands will run.

It's important to realize that I'm talking about `hello` as both a target and a file. That's because the two are directly tied together. Typically, when a target is run (aka when the commands of a target are run), the commands will create a file with the same name as the target. In this case, the `hello` target does not create the `hello` file.

Let's create a more typical Makefile - one that compiles a single C file. But before we do, make a file called blah.c that has the following contents:

```makefile
// blah.c
int main() { return 0; }
```

Then create the Makefile (called Makefile, as always):

```makefile
blah:
	cc blah.c -o blah
```

This time, try simply running make. Since there's no target supplied as an argument to the make command, the first target is run. In this case, there's only one target (blah). The first time you run this, blah will be created. The second time, you'll see make: 'blah' is up to date. That's because the blah file already exists. But there's a problem: if we modify blah.c and then run make, nothing gets recompiled.

We solve this by adding a prerequisite:

```makefile
blah: blah.c
	cc blah.c -o blah
```

When we run make again, the following set of steps happens:

The first target is selected, because the first target is the default target. This has a prerequisite of blah.c. Make decides if it should run the blah target. It will only run if blah doesn't exist, or blah.c is newer than blah. 

This last step is critical, and is the essence of make. What it's attempting to do is decide if the prerequisites of blah have changed since blah was last compiled. That is, if blah.c is modified, running make should recompile the file. And conversely, if blah.c has not changed, then it should not be recompiled.

To make this happen, it uses the filesystem timestamps as a proxy to determine if something has changed. This is a reasonable heuristic, because file timestamps typically will only change if the files are modified. But it's important to realize that this isn't always the case. You could, for example, modify a file, and then change the modified timestamp of that file to something old. If you did, Make would incorrectly guess that the file hadn't changed and thus could be ignored.

Whew, what a mouthful. Make sure that you understand this. It's the crux of Makefiles, and might take you a few minutes to properly understand. Play around with the above examples or watch the video above if things are still confusing.

### More quick examples

The following Makefile ultimately runs all three targets. When you run make in the terminal, it will build a program called blah in a series of steps:

- Make selects the target blah, because the first target is the default target
- blah requires blah.o, so make searches for the blah.o target
- blah.o requires blah.c, so make searches for the blah.c target
- blah.c has no dependencies, so the echo command is run
- The cc -c command is then run, because all of the blah.o dependencies are finished
- The top cc command is run, because all the blah dependencies are finished
- That's it: blah is a compiled c program

```makefile
blah: blah.o
	cc blah.o -o blah # Runs third

blah.o: blah.c
	cc -c blah.c -o blah.o # Runs second

# Typically blah.c would already exist, but I want to limit any additional required files
blah.c:
	echo "int main() { return 0; }" > blah.c # Runs first
```

If you delete blah.c, all three targets will be rerun. If you edit it (and thus change the timestamp to newer than blah.o), the first two targets will run. If you run touch blah.o (and thus change the timestamp to newer than blah), then only the first target will run. If you change nothing, none of the targets will run. Try it out!

This next example doesn't do anything new, but is nonetheless a good additional example. It will always run both targets, because some_file depends on other_file, which is never created.

```makefile
some_file: other_file
	echo "This will always run, and runs second"
	touch some_file

other_file:
	echo "This will always run, and runs first"
```

## Make clean

clean is often used as a target that removes the output of other targets, but it is not a special word in Make. You can run make and make clean on this to create and delete some_file.

Note that clean is doing two new things here:

- It's a target that is not first (the default), and not a prerequisite. That means it'll never run unless you explicitly call make clean
- It's not intended to be a filename. If you happen to have a file named clean, this target won't run, which is not what we want. See .PHONY later in this tutorial on how to fix this

```makefile
some_file: 
	touch some_file

clean:
	rm -f some_file
```

## Variables

Variables can only be strings. You'll typically want to use :=, but = also works. See Variables Pt 2.

Here's an example of using variables:

```makefile
files := file1 file2
some_file: $(files)
	echo "Look at this variable: " $(files)
	touch some_file

file1:
	touch file1
file2:
	touch file2

clean:
	rm -f file1 file2 some_file
```

Single or double quotes have no meaning to Make. They are simply characters that are assigned to the variable. Quotes are useful to shell/bash, though, and you need them in commands like printf. In this example, the two commands behave the same:

```makefile
a := one two# a is set to the string "one two"
b := 'one two' # Not recommended. b is set to the string "'one two'"
all:
	printf '$a'
	printf $b
```

Reference variables using either ${} or $()

```makefile
x := dude

all:
	echo $(x)
	echo ${x}

	# Bad practice, but works
	echo $x 
```