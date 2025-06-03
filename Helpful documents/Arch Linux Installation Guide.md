# Installing Arch Linux on a pendrive using an HP Laptop: A Detailed Guide

This document provides a comprehensive, step-by-step tutorial for installing Arch Linux on a pendrive using an HP laptop, focusing on a clean installation with a minimal CLI environment.

**Prerequisites:**

* An HP laptop with internet access.
* A USB drive (at least 8GB).
* A stable internet connection.

**1. Preparing the Installation Media:**

* **Download the Arch Linux ISO:**
    * Visit the official Arch Linux download page: [https://archlinux.org/download/](https://archlinux.org/download/)
    * Download the ISO file from one of the available options.
* **Create a Bootable USB Drive using Rufus:**
    * Download and install Rufus from [https://rufus.ie/](https://rufus.ie/).
    * Insert your USB drive.
    * Open Rufus.
    * In the "Device" dropdown, select your USB drive.
    * Click "SELECT" and choose the downloaded Arch Linux ISO file.
    * Leave all other settings at their defaults (typically: Partition scheme: MBR or GPT, Target system: BIOS or UEFI, File system: FAT32, Cluster size: Default).
    * Click "START" and confirm any warnings.
    * Wait for the process to complete.

**2. Configuring the BIOS/UEFI:**

* **Access the Boot Menu:**
    * Restart your laptop.
    * As soon as the HP logo appears, press the esc key to enter the Startup Menu.
* **Disable Secure Boot and Legacy Support:**
    * In the BIOS setup option, navigate to the "Advanced" option then to the "Secure Boot Configuration" option. There's a dropdown menu for "Configure Legacy Support and Secure Boot", there select "Legacy Support Disable and Secure Boot Disable".
    * Go back using "Esc".
* **Prioritize USB Boot:**
    * Go to "Boot Options". In there turn of "Fast boot" and change the order of "UEFI Boot order", keep you usb drive on the top of the list.
    * Save the changes and exit the BIOS/UEFI.

**3. Booting into the Arch Linux Live Environment:**

* Your laptop will restart.
* The Arch Linux boot menu should appear.
* Don't press anything it will boot into the Arch Linux itself.

**4. Connecting to Wi-Fi using `iwctl`:**

* **Open `iwctl`:**
    * Once the live environment loads, you'll be at a root prompt.
    * Type `iwctl` and press Enter.
* **List Devices:**
    * To see the available wireless devices, type `device list` and press Enter.
    * Identify your wireless interface (e.g., `wlan0`).
* **Scan for Networks:**
    * Type `station wlan0 scan` (replace `wlan0` with your interface name) and press Enter.
* **List Networks:**
    * To see the available Wi-Fi networks, type `station wlan0 get-networks` and press Enter.
* **Connect to a Network:**
    * Type `station wlan0 connect "<network_name>"` (replace `<network_name>` with the name of your Wi-Fi network) and press Enter.
    * You'll be prompted to enter the Wi-Fi password. Enter it and press Enter.
    * **Note:** This method is for simple WPA/WPA2 networks. For enterprise Wi-Fi (e.g., requiring username, password, and certificate), you will need more advanced `iwctl` commands and potentially `wpa_supplicant`.
* **Exit `iwctl`:**
    * Press Ctrl+C.

**5. Installing Arch Linux using `archinstall`:**

* **Run `archinstall`:**
    * Type `archinstall` and press Enter.
* **Mirror Selection:**
    * Select your region to download packages from a nearby mirror for faster downloads.
* **Disk Configuration:**
    * Choose "Use a best-effort default partition layout."
    * Select the disk where you want to install Arch Linux (be careful to select the correct disk).
    * Choose "ext4" as the file system type.
    * Select "No" when asked to create a separate /home partition.
* **Swap:**
    * Select "false" or "disable" to disable swap.
* **Root Password:**
    * Set a strong root password.
* **User Account:**
    * Select "Add a user."
    * Enter a username and password.
    * Select "sudo" to grant the user administrative privileges.
* **Profile:**
    * Select "minimal" for a CLI-only installation.
* **Network Configuration:**
    * Select "Use NetworkManager."
* **Bootloader:**
    * Leave the bootloader as the default choice.
* **Optional packages:**
    * Leave optional packages as default if you are unsure.
* **Timezone:**
    * Select your correct timezone.
* **Locale:**
    * Select your correct locale.
* **Installation:**
    * Review your settings and confirm the installation.
    * Wait for the installation to complete.
* **Chroot:**
    * When asked about chroot, select "No."
* **Reboot:**
    * Type `reboot` and press Enter to restart your laptop.
    * Remove the USB drive.

**6. Post-Installation:**

* **Login:**
    * After the reboot, you'll be at a login prompt.
    * Log in with the username and password you created during installation.
* **Connecting to wifi:**  
    Configure Wifi with NetworkManager:
    * `nmcli device wifi connect "YourWifiSSID" password "YourWifiPassword"`  
    If the above command doesn't work use:
    * `nmcli device wifi connect "<netwrokName>" --ask`

**7. Post-Installation Configuration and Desktop Environment Setup:**

* **Updating the System:**
    * After logging in, it's crucial to update your system to ensure you have the latest packages.
    * Run the following command:
        * `sudo pacman -Syy`
        * **Explanation:**
            * `sudo` grants administrative privileges.
            * `pacman` is the Arch Linux package manager.
            * `-Syy` forces a full database download from the mirrors and updates all installed packages.
* **Installing Text Editors:**
    * Install text editors for configuration and general use.
    * Run the following command:
        * `sudo pacman -S nano vim`
        * **Explanation:**
            * `nano` is a simple, user-friendly text editor.
            * `vim` is a powerful, highly configurable text editor.
* **Installing Essential X Window System and Window Manager Components:**
    * To have a graphical user interface, you'll need the X Window System and a window manager.
    * Run the following commands:
        * `sudo pacman -S xterm`
            * **Explanation:** Installs xterm, a terminal emulator for the X Window System.
        * `sudo pacman -S xorg-server xorg-xinit`
            * **Explanation:** Installs the Xorg server (the display server) and xinit (a program to start the X server).
        * `sudo pacman -S openbox i3-wm i3status`
            * **Explanation:** Installs Openbox (a light weight window manager), i3-wm (a tiling window manager), and i3status (a status bar for i3).
* **Configuring i3 Window Manager:**
    * Configure i3 to start xterm when you press the mod key (usually the Windows key) and Enter.
    * Edit the `~/.xinitrc` file:
        * `nano ~/.xinitrc`
        * Add the following line:
            * `exec i3`
        * Save and exit (Ctrl+X, Y, Enter).
        * **Explanation:** This line tells xinit to start i3 when the X server starts.
    * Configure i3 to open xterm with the mod+Enter keybind.
        * `nano ~/.config/i3/config`
        * Find the line that starts with `bindsym $mod+Return exec <i3_something>` and change the command to `xterm`. It should look like this:
            * `bindsym $mod+Return exec xterm`
        * save and exit.
    * Set xterm as your default terminal.
        * `nano ~/.bashrc`
        * Add the following line:
            * `export TERMINAL=/usr/bin/xterm`
        * Save and exit.
        * Run the command to apply the changes:
            * `source ~/.bashrc`
        * **Explanation:** This sets the environment variable `TERMINAL` to tell applications to use xterm as the default terminal.
* **Starting the i3 Desktop Environment:**
    * Start the i3 window manager with the following command:
        * `startx`
    * You can exit i3 by pressing Mod+Shift+E (Mod is usually the Windows key).
* **Installing Microsoft Edge Browser:**
    * Install the necessary tools and clone the Microsoft Edge AUR package.
    * Run the following commands:
        * `sudo pacman -S base-devel git`
            * **Explanation:** Installs base development tools and Git.
                * **git** is needed to retrieve the necessary files.
                * **base-devel** is needed to compile those files into an installable package.
        * `git clone https://aur.archlinux.org/microsoft-edge-stable-bin.git`
        * `cd microsoft-edge-stable-bin`
        * `makepkg -si`
            * **Explanation:** Builds and installs the Microsoft Edge package from the AUR.
    * Start i3 with `startx` and then start Microsoft Edge by running the command (user have to do this evertime for launching Microsoft Edge):
        * `microsoft-edge-stable`
        * To maximize the window, click on the Microsoft Edge window and press Ctrl+F.
* **Installing NetworkManager Applet (GUI for Network Management):**
    * Install the NetworkManager applet to provide a graphical interface for managing network connections.
    * Run the following command:
        * `sudo pacman -S network-manager-applet`
    * Configure i3 to start the NetworkManager applet on startup.
        * `nano ~/.config/i3/config`
        * Add the following line to the end of the file:
            * `exec --no-startup-id nm-applet`
        * Save and exit.
    * Restart i3 with `startx`.
    * You should now see a network icon in the bottom right corner of the screen. Clicking on it will allow you to manage your network connections using a GUI.
    * If you need to connect to a wifi network via the command line use:
        * `nmcli device wifi connect "YourWifiSSID" password "YourWifiPassword"`
        * or if you need to be prompted for the password.
        * `nmcli device wifi connect "<netwrokName>" --ask`
