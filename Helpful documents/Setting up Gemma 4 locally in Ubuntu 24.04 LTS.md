# Setting up Gemma 4 locally in Ubuntu 24.04 LTS

## 1. System prep
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install python3 python3-pip git -y python3.12-venv -y
```
## 2. Install Ollama
```bash
curl -fsSL https://ollama.com/install.sh | sh
```
## 3. Python project
```bash
python3 -m venv gemma_env
source gemma_env/bin/activate
```

## 4. Pull smallest Gemma 4 model
```bash
ollama pull gemma:2b
```
## 5. Run interactively
```bash
ollama run gemma:2b
```

# Running a session later

## Activate python environment
```bash
source gemma_env/bin/activate
```

## Run interactively
```bash
ollama run gemma:2b
```

## Exit
```bash
# exit ollama
Ctrl+C
# or
/bye

# Close python environment
deactivate
```

# Clean up

## If you want to clean up the pulled model
```bash
ollama rm gemma:2b
```
## To clean up everything 
```bash
rm -rf gemma_env
```