# Python dev Project IDX environment kickstart

## 1. Nix Development Shell

Create a file at `.idx/dev.nix` with:

```nix
{ pkgs }: {
  # nixpkgs channel
  channel = "stable-24.05";

  # default packages available in the shell
  packages = [
    pkgs.python312Full
  ];

  # global environment variables (if any)
  env = { };

  # IDX editor integration
  idx = {
    extensions = [
      "GitHub.github-vscode-theme"
      "ms-python.python"
      "ms-toolsai.jupyter"
    ];

    previews = {
      enable = true;
      previews = { };
    };

    workspace = {
      onCreate = {
        default.openFiles = [ "README.md" ];
      };
      onStart = { };
    };
  };
}
```

**Usage:**  
Rebuild the environment.

---

## 2. VS Code Settings

In `.vscode/settings.json`, replace with:

```json
{
  // Editor behavior
  "editor.stickyScroll.enabled": false,
  "files.autoSave": "afterDelay",
  "editor.wordWrap": "on",
  "editor.minimap.showSlider": "always",
  "notebook.editorOptionsCustomizations": {
    "editor.tabSize": 4,
    "editor.indentSize": 4,
    "editor.insertSpaces": true
  },

  // Theme & customization
  "workbench.colorTheme": "GitHub Dark Default",
  "workbench.colorCustomizations": {
    "[GitHub Dark High Contrast]": {
      "editor.lineHighlightBorder": "#00000000"  // make the highlight border transparent
    }
  },

  // IDX Code Intelligence
  "IDX.aI.enableInlineCompletion": true,
  "IDX.aI.enableCodebaseIndexing": true
}
```

---

## 3. Python Virtual Environment & Dependencies

1. **Create a virtual environment**  
   ```bash
   python -m venv <VENV_NAME>
   ```

2. **Activate it**   
     ```bash
     source <VENV_NAME>/bin/activate
     ```

3. **Define dependencies**  
   In your project root, create `requirements.txt` and enter your requirements for example:

   ```txt
   pandas
   numpy
   matplotlib
   seaborn
   plotly
   tensorflow
   scikit-learn
   ipython
   ```

4. **Install**  
   ```bash
   pip install --upgrade pip
   pip install -r requirements.txt
   ```

---

## 4. Ready to Go!

- Your Nix shell provides Python 3.12; your virtualenv isolates project packages.
- Jupyter notebooks and the Python extension are installed and configured.

Now you can focus on developing—everything else is wired up!