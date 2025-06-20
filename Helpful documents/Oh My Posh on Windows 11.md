# Oh My Posh on Windows 11

This guide will walk you through the steps to install and configure Oh My Posh, a customizable prompt engine for any shell, in both PowerShell and MSYS2 environments on Windows.

## Prerequisites

* **PowerShell:** Comes pre-installed with Windows.
* **MSYS2:** You should have MSYS2 installed. If not, you can download it from [https://www.msys2.org/](https://www.msys2.org/).

## Step 1: Install Oh My Posh

We'll install Oh My Posh using `winget` in PowerShell and manually add its path for MSYS2.

### PowerShell

1.  **Install Oh My Posh:** Open PowerShell as an administrator and run the following command:

    ```powershell
    winget install JanDeDobbeleer.OhMyPosh -s winget
    ```

2.  **Add to Environment Variables:** After installation, you need to ensure PowerShell can find the Oh My Posh executable. The `winget` installer usually handles this, but let's verify.

    * Search for "Environment Variables" in the Windows search bar and open "Edit the system environment variables".
    * In the "System variables" section, find the variable named "Path" and select it.
    * Click "Edit...".
    * Ensure that a path similar to `C:\Users\<YourUsername>\AppData\Local\Programs\oh-my-posh\bin` exists in the list. If not, click "New..." and add it, replacing `<YourUsername>` with your actual username.
    * Click "OK" on all open windows to save the changes.

3.  **Restart PowerShell and Verify:** Close all PowerShell windows and open a new one. Run the following command to check if Oh My Posh is installed correctly:

    ```powershell
    oh-my-posh --version
    ```

    You should see the installed version of Oh My Posh if the installation was successful.

### MSYS2

1.  **Edit `.bash_profile`:** Open your MSYS2 terminal and use the `nano` text editor to edit the `.bash_profile` file:

    ```bash
    nano ~/.bash_profile
    ```

2.  **Paste Configuration:** Add the following lines to the end of the `.bash_profile` file:

    ```bash
    export PATH="$PATH:/c/Users/$(whoami)/AppData/Local/Programs/oh-my-posh/bin"

    if command -v oh-my-posh &>/dev/null; then
        eval "$(oh-my-posh init bash --config "/c/Users/$(whoami)/AppData/Local/Programs/oh-my-posh/themes/paradox.omp.json")"
    fi
    ```

    * The first line adds the Oh My Posh executable directory to your system's PATH.
    * The `if` block checks if the `oh-my-posh` command is available and then initializes it for Bash, applying the `paradox.omp.json` theme.

3.  **Save and Exit:** Press `Ctrl + X`, then `Y` to confirm saving, and finally `Enter` to exit `nano`.

4.  **Apply Changes and Verify:** Source the `.bash_profile` to apply the changes to your current session:

    ```bash
    source ~/.bash_profile
    ```

    Then, check the Oh My Posh version:

    ```bash
    oh-my-posh --version
    ```

    You should see the installed version if everything is set up correctly.

## Step 2: Download and Install a Nerd Font

Oh My Posh relies on "Nerd Fonts" to display special glyphs and icons in your terminal.

1.  **Download Nerd Font:** Download the "NerdFontsSymbolsOnly.zip" file from the following GitHub release page:

    [https://github.com/ryanosasis/nerd-fonts/releases/tags/v3.3.0](https://github.com/ryanosasis/nerd-fonts/releases/tags/v3.3.0)

2.  **Install the Font:**
    * Extract the contents of the downloaded ZIP file.
    * Browse through the extracted fonts and choose a Nerd Font you like (e.g., one with "Mono" in the name for better alignment).
    * Double-click on the font file (`.ttf` or `.otf`).
    * Click the "Install" button at the top of the preview window. Repeat this for any other Nerd Fonts you want to use.

## Step 3: Configure Terminal Font

Now, you need to tell your terminal to use the installed Nerd Font.

### PowerShell

1.  **Open Terminal Settings:** Right-click on the title bar of your PowerShell window and select "Defaults" or "Properties" (depending on your Windows version and terminal). Alternatively, if you are using Windows Terminal, open its settings.

2.  **Select Font:** Navigate to the "Font" tab or settings section. Choose one of the Nerd Fonts you installed from the dropdown list (it will likely have "NF" in its name).

3.  **Save Changes:** Click "OK" or "Save" to apply the new font. Your PowerShell prompt should now display the special glyphs from your Oh My Posh theme.

### MSYS2

1.  **Open Terminal Options:** Right-click on the title bar of your MSYS2 terminal window and select "Options...".

2.  **Navigate to Text:** In the "Options" window, select the "Text" category.

3.  **Choose Font:** Under the "Font" section, select one of the Nerd Fonts you installed from the dropdown list.

4.  **Apply Changes:** Click "Apply" and then "OK". Your MSYS2 prompt should now display the themed output.

## Step 4: Changing the Theme

Oh My Posh comes with a variety of themes. You can explore them in the following ways:

* **Browse Themes Folder:** Navigate to the Oh My Posh themes directory on your computer: `C:\Users\<YourUsername>\AppData\Local\Programs\oh-my-posh\themes`. You'll find various `.omp.json` files.
* **Preview Themes Online:** Visit the official Oh My Posh themes gallery at [https://ohmyposh.dev/docs/themes#dracula](https://ohmyposh.dev/docs/themes#dracula) to see previews of the available themes.

### Applying a Different Theme

**For MSYS2:**

1.  **Edit `.bash_profile`:** Open the `.bash_profile` file again using `nano`:

    ```bash
    nano ~/.bash_profile
    ```

2.  **Modify Theme Name:** Find the line that initializes Oh My Posh:

    ```bash
    eval "$(oh-my-posh init bash --config $HOME/.poshthemes/paradox.omp.json)"
    ```

    Replace `paradox.omp.json` with the filename of the theme you want to use (e.g., `jandedobbeleer.omp.json`).

3.  **Save and Exit:** Press `Ctrl + X`, then `Y`, and then `Enter`.

4.  **Apply Changes:** Source the `.bash_profile`:

    ```bash
    source ~/.bash_profile
    ```

    Your terminal prompt will now use the newly selected theme.

**For PowerShell:**

To change the theme in PowerShell, you'll typically modify your PowerShell profile file. This file is usually located at `$PROFILE`.

1.  **Open PowerShell Profile:** Open PowerShell and run:

    ```powershell
    notepad $PROFILE
    ```

    If the file doesn't exist, it will prompt you to create it. Click "Yes".

2.  **Add Oh My Posh Initialization:** Add the following line to your profile, replacing `<THEME_NAME>.omp.json` with the desired theme filename (e.g., `jandedobbeleer.omp.json`):

    ```powershell
    oh-my-posh init pwsh --config "$env:LOCALAPPDATA\Programs\oh-my-posh\themes\<THEME_NAME>.omp.json" | Invoke-Expression
    ```

3.  **Save and Close:** Save the changes to your PowerShell profile and close the file.

4.  **Restart PowerShell:** Close all PowerShell windows and open a new one. Your prompt should now reflect the new theme.

Enjoy your newly customized terminal with Oh My Posh!

## Change path shown in terminal

To make your prompt display only the **current folder name** (instead of the full path), just tweak the `<THEME_NAME>.omp.json` theme you're referencing.

### Here's what to do:

1. **Open the Theme File**
   Use a text editor to open the theme:
   ```bash
   nano /c/Users/$(whoami)/AppData/Local/Programs/oh-my-posh/themes/<THEME_NAME>.omp.json
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