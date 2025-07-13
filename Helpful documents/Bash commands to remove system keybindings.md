# Bash commands to remove system keybindings

Run these in your terminal to unbind the workspace shortcuts:

```bash
gsettings set org.gnome.desktop.wm.keybindings move-to-workspace-up "[]"
gsettings set org.gnome.desktop.wm.keybindings move-to-workspace-down "[]"
gsettings set org.gnome.desktop.wm.keybindings switch-to-workspace-up "[]"
gsettings set org.gnome.desktop.wm.keybindings switch-to-workspace-down "[]"
```

This clears the system-level bindings so VS Code can use them freely.

## Want to reset all GNOME window manager shortcuts?

You can do a full reset like this:

```bash
gsettings reset-recursively org.gnome.desktop.wm.keybindings
```