# Passing Access to System for Compilers Installed via MSYS2 Terminal  

We will first install a compiler using **pacman** (the package manager) from the **MSYS2 terminal** and then make it available to the system by adding its path to the system environment variables.

---

## 1️⃣ Install the Compiler  
Open the **MSYS2 terminal** and type:  

```bash
pacman -S python
# This installs Python. Press 'Y' and 'Enter' to confirm the installation.
```

Similarly, you can install other compilers like **Java** and **GCC**:

```bash
pacman -S mingw-w64-x86_64-gcc   # Install GCC (C/C++ Compiler)
pacman -S mingw-w64-x86_64-openjdk  # Install OpenJDK (Java)
```

---

## 2️⃣ Find the Installation Path  
After installation, check where the compiler is installed by running:  

```bash
which python   # For Python
which java     # For Java
which gcc      # For GCC
```

### Example Output:
```
/usr/bin/python
/c/Program Files/Java/jdk-21/bin/java
/mingw64/bin/gcc
```

This is a **partial** path. Locate the **actual folder** in `C:\` and copy the **full** path.

---

## 3️⃣ Add the Path to System Variables  
1. **Open System Environment Variables:**
   - Press `Win + R`, type **sysdm.cpl**, and hit `Enter`.
   - Go to the **Advanced** tab and click **Environment Variables**.

2. **Locate the "Path" variable** under **System Variables**, then:
   - Click **Edit** > **New**.
   - Paste the paths you found earlier. For example:
     ```
     C:\msys64\usr\bin
     C:\msys64\mingw64\bin
     ```

3. **Click "OK"** to save the changes.

---

## 4️⃣ Verify the Changes  
Open **PowerShell** or **Command Prompt** and type:

```powershell
python --version
java -version
gcc --version
```

If the installation was successful, you should see the respective version numbers.

---

## ⚠️ Important Note:
- When installing **Python** from the official website, the installer **automatically adds Python to the user account PATH**.
- However, when installing Python using **MSYS2** (`pacman -S python`), the system **does not automatically recognize it**.
- To fix this, **manually add the MSYS2 `bin` folder to the system variables**, not the **user variables**, otherwise, PowerShell and other system-wide applications **won't detect Python**.

Now your system can access the compilers installed via the MSYS2 terminal! 🚀

