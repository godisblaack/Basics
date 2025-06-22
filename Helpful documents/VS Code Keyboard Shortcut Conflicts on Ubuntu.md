# VS Code Keyboard Shortcut Conflicts on Ubuntu

Some keyboard shortcuts like `Ctrl+Alt+Arrow` may not work in VS Code on Ubuntu because they are silently reserved by GNOME for workspace switching—even if not visible in system settings.

## Check if Shortcut is Reserved

Run the following command in a terminal:

```bash
gsettings get org.gnome.desktop.wm.keybindings switch-to-workspace-down
````

If you see:

```bash
['<Control><Alt>Down']
```

Then the shortcut is intercepted by the system.

## Unbind the System Shortcut

To free the shortcut for use in VS Code, run:

```bash
gsettings set org.gnome.desktop.wm.keybindings switch-to-workspace-up "[]"
gsettings set org.gnome.desktop.wm.keybindings switch-to-workspace-down "[]"
```

After this, you can safely assign `Ctrl+Alt+Up` / `Ctrl+Alt+Down` to VS Code commands.

## Re-mapping the shortcut

Run the following command in a terminal:
```bash
gsettings set org.gnome.desktop.wm.keybindings switch-to-workspace-up "['<Control><Alt>Up']"
gsettings set org.gnome.desktop.wm.keybindings switch-to-workspace-down "['<Control><Alt>Down']"
```