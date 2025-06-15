# Granting MSYS2 Access to System-Wide Compilers  

This guide enables **MSYS2** to recognize system-installed compilers (e.g., **JDK 21**) by passing their paths to the **MSYS2 terminal**.  

## **1️⃣ Locate the System-Wide Compiler Path**  
1. Open **System Environment Variables**:  
   - Press `Start` → Search **"Edit the system environment variables"** → Open it.  
   - Click **Environment Variables** → Locate `Path` under **System Variables** → Click **Edit**.  
   - Find the path for the required compiler, such as **Java**:  
     ```
     C:\Program Files\Common Files\Oracle\Java\javapath
     ```
   - This path is automatically added when installing **JDK** or other compilers.  

## **2️⃣ Check Compiler Availability in MSYS2**  
In the **MSYS2 terminal**, run:  
```bash
which java
```
If **Java** is not found, it means the compiler path is missing in **MSYS2**.  

## **3️⃣ Add Compiler Path to MSYS2 (Permanent Solution)**  
To permanently set **JDK 21** (or any compiler), run:  
```bash
echo 'export JAVA_HOME="/c/Program Files/Java/jdk-21"' >> ~/.bashrc
echo 'export PATH="$JAVA_HOME/bin:$PATH"' >> ~/.bashrc
```
> ⚠️ **Ensure the path matches your system's JDK installation directory.**  

## **4️⃣ Refresh the Terminal**  
Apply changes without restarting:  
```bash
source ~/.bashrc
```

## **5️⃣ Verify the Compiler Path**  
Check if MSYS2 now recognizes the compiler:  
```bash
which java
# Expected output: /c/Program Files/Java/jdk-21/bin/java
```
For **Python**, you can check similarly:  
```bash
which python
# Expected output: /usr/bin/python
```

### ✅ **Success!**  
MSYS2 now has access to system-wide compilers that were previously only available in Windows. 🚀
