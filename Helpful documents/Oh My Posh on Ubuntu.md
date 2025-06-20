# Oh My Posh on Ubuntu

This guide outlines the steps to install Oh My Posh, a customizable prompt engine for any shell, on your Ubuntu machine.

**Steps:**

1.  **Installing Oh My Posh:**
    ```bash
    curl -s https://ohmyposh.dev/install.sh | bash -s -- -d ~/.local/bin
    ```
    This command downloads and executes the Oh My Posh installation script directly from the official website. Let's break it down:
    * `curl -s https://ohmyposh.dev/install.sh`: This uses `curl` to silently (`-s`) download the installation script.
    * `| bash -s -- -d ~/.local/bin`: This pipes the downloaded script to the `bash` interpreter for execution.
        * `-s`: Instructs `bash` to read commands from standard input (the output of `curl`).
        * `--`: Separates options for `bash` from arguments passed to the script.
        * `-d ~/.local/bin`: This crucial argument tells the `install.sh` script to install the `oh-my-posh` executable in your user's local `bin` directory (`~/.local/bin`, which expands to `/home/<your_username>/.local/bin`).

2.  **Installing a Font:**
    ```bash
    oh-my-posh font install meslo
    ```
    Once Oh My Posh is installed, this command utilizes the `oh-my-posh` tool to download and install the "Meslo" Nerd Font. Nerd Fonts are specifically patched to include a wide variety of glyphs and symbols that Oh My Posh and other terminal enhancements use for visually appealing prompts. This assumes that `~/.local/bin` is in your system's PATH environment variable, which is usually the default.

3.  **Configuring Bash:**
    ```bash
    nano ~/.bashrc
    ```
    This command opens your Bash shell's configuration file, `.bashrc`, in the `nano` text editor. You need to add commands to this file once, to initialize Oh My Posh every time you start a new terminal session. Add the following lines **at the end** of the file:
    ```bash
    export PATH=$PATH:/home/<your_username>/.local/bin

    eval "$(oh-my-posh init bash)"

    # Set a specific theme. Replace 'paradox' with your desired theme name.
    eval "$(oh-my-posh init bash --config ~/.cache/oh-my-posh/themes/paradox.omp.js)">
    ```
    * `export PATH="$PATH:$HOME/.local/bin"`: This line ensures that your system knows where to find the `oh-my-posh` executable. While often already included, explicitly adding it here guarantees it's in your PATH.
    * `eval "$(oh-my-posh init bash)"`: This is the core command that initializes Oh My Posh for your Bash shell using the default configuration.
    * `eval "$(oh-my-posh init bash --config ~/.cache/oh-my-posh/themes/paradox.omp.json)"`: This is an **optional** line to set a specific theme. Replace `paradox.omp.json` with the name of the theme you want to use. Oh My Posh typically stores downloaded themes in `~/.cache/oh-my-posh/themes/`. **Note the `.json` extension for newer theme files.**

4.  **Applying Changes:**
    ```bash
    source ~/.bashrc
    ```
    After saving and closing the `.bashrc` file, this command reloads the configuration in your current terminal session. This should immediately activate the Oh My Posh prompt, if it doesn't load as expected, then for the changes to persist across new terminal windows, you should also **close all open terminal windows and open a new one.**

## Change path shown in terminal

To make your prompt display only the **current folder name** (instead of the full path), just tweak the `<THEME_NAME>.omp.json` theme you're referencing.

### Here's what to do:

1. **Open the Theme File**
   Use a text editor to open the theme:
   ```bash
   nano /home/<USERNAME>/.cache/oh-my-posh/themes/<THEME_NAME>
   ```

2. **Find the `path` Segment**
   Look for the section that looks like this (or similar):
   ```json
    {
        "background": "#91ddff",
        "foreground": "#100e23",
        "powerline_symbol": "\ue0b0",
        "properties": {
          "folder_icon": "\uf115",
          "folder_separator_icon": " \ue0b1 ",
          "style": "full"
        },
        "style": "powerline",
        "template": " {{ .Path }} ",
        "type": "path"
    },
   ```

3. **Modify the `properties`**
   Inside the `properties` block, add or change the `style` to `"folder"` like so:
   ```json
   "properties": {
     "style": "folder"
   }
   ```
   This tells Oh My Posh to display only the current folder name.

4. **Save and Exit**
   If you're using `nano`, press `Ctrl + X`, then `Y`, then `Enter`.

5. **Apply the Changes**
   Back in your terminal:
   ```bash
   source ~/.bash_profile
   ```

That’s it! Your prompt will now feel a lot cleaner and less cluttered.