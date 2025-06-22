# Adding the SSH Key to GitHub

### 1. Log in to GitHub
- Open your web browser and go to [GitHub](https://github.com).
- Log in with your GitHub credentials.

### 2. Access SSH and GPG Keys Settings
- In the top-right corner of the page, click your profile picture and select **Settings** from the dropdown menu.
- On the left-hand sidebar, click **SSH and GPG keys** under the "Access" section.

### 3. Add a New SSH Key
- On the SSH and GPG keys page, click the **New SSH key** button.

### 4. Add Your Public Key
- In the "Title" field, provide a name for the key (e.g., "My Laptop Key" or "Work Laptop Key").
- In the "Key" field, paste the SSH public key that you copied earlier (the entire output from the `cat ~/.ssh/id_ed25519.pub` command).
- Click the **Add SSH key** button to save it.

### 5. Confirm Your Action
- If prompted, confirm your GitHub password to finalize the process.

Once the key is added to your GitHub profile, you will be able to use SSH to authenticate when pushing, pulling, or cloning repositories.

## Conclusion
You have successfully added your SSH public key to your GitHub account, enabling secure authentication for your interactions with GitHub repositories.