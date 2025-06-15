# Multiple SSH keys on same device

## Overview
This document outlines the steps to generate an SSH key using the Ed25519 algorithm and how to view the public key using the `cat` command. SSH keys are used for secure authentication when connecting to remote servers and services.

## Prerequisites
- A terminal or command line interface (CLI) access.
- OpenSSH installed on your system (usually pre-installed on Linux and macOS).

## Steps to Generate an SSH Key

### 1. Open Terminal
- **Linux/macOS**: Open the Terminal application.
- **Windows**: Use Git Bash or Windows Subsystem for Linux (WSL).

### 2. Generate the SSH Key
Run the following command in the terminal:
```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```
- **Parameters Explained**:
  - `-t ed25519`: Specifies the type of key to create (Ed25519).
  - `-C "your_email@example.com"`: Adds a comment (usually your email) to the key for identification.

### 3. Specify the File Location
When prompted:
```
Enter a file in which to save the key (/home/username/.ssh/id_ed25519): 
```
```
/home/username/.ssh/id_ed25519_UserName1
```
- Press **Enter** to accept the default location or specify a different path if desired.

### 4. Set a Passphrase (Optional)
You will be prompted to enter a passphrase:
```
Enter passphrase (empty for no passphrase):
```
- You can enter a passphrase for added security or leave it empty and press **Enter**.

### 5. Completion Message
After confirming the passphrase, you will see a message indicating that the keys have been generated:
```
Your identification has been saved in /home/username/.ssh/id_ed25519.
Your public key has been saved in /home/username/.ssh/id_ed25519.pub.
The key fingerprint is:
SHA256:...
```

## Steps to View the SSH Public Key

### 1. Use the `cat` Command
To view the contents of your SSH public key, run the following command:
```bash
cat ~/.ssh/id_ed25519_UserName1.pub
```

### 2. Output
The command will display the public key, which looks similar to:
```
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIJXqXuDI9I9VVVe2c9+IfkbFjt6jlVGKDk5eid1KXmqV your_email@example.com
```

### 3. Copying the Key
- Select and copy the entire output, including the `ssh-ed25519` prefix and the email address at the end. This key can be added to services like GitHub, GitLab, or any server that supports SSH authentication.

## Configuring the config file

At `~/.ssh` create a file named `config` and edit it in the following way:

```txt
Host github-UserName1
	HostName github.com
	User git
	IdentityFile ~/.ssh/id_ed25519_iitdh

Host github-UserName2
	HostName github.com
	User git
	IdentityFile ~/.ssh/id_ed25519_UserName2
```

## Example of creating and setting up a repo

Creating and setting up a repository with the `UserName1` account:

```sh
git remote set-url origin git@github-UserName1:username/repo.git
```

## Example of cloning a repo

Cloning a repository with the `UserName1` account:

```sh
git clone git@github-UserName1:UserName1/repo.git
```

Cloning a repository with the `UserName2` account:

```sh
git clone git@github-UserName2:UserName2/repo.git
```


## Important Notes
- **Keep Your Private Key Secure**: The private key (`~/.ssh/id_ed25519`) should never be shared or exposed. It is crucial for maintaining the security of your SSH connections.
- **Adding the Public Key to Services**: To use your SSH key for authentication, you will need to add the public key to the relevant services or servers.
- Before pushing to a repo remember to change the global user and email:

  `git config --global user.name "username"`

  `git config --global user.email "useremail"`


## Conclusion
You have successfully generated and viewed your SSH key using the Ed25519 algorithm. This key will facilitate secure connections to remote servers and services.