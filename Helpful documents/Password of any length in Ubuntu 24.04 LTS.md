# Password of any length in Ubuntu 24.04 LTS

Ubuntu 24.04 LTS enforces a default password policy that recommends a minimum length (typically 8 characters). However, you can bypass this restriction using a simple override. This guide explains the **Quick Method** to set a password of any length—even shorter than the default minimum.

## Quick Method: Using `passwd` with `sudo`

Ubuntu may display a warning like:

```
BAD PASSWORD: The password is shorter than 8 characters
```

But this is **just a warning**, not a block. You can still set the password if you confirm it correctly.

### Steps

1. Open a terminal.
2. Run the following command to change the password for a user:
   ```bash
   sudo passwd your_username
   ```
3. Enter the current password.
4. Enter the desired password (even if it's short).
5. Re-enter the password to confirm.

If both entries match, the password will be accepted—even if it triggers a warning.

### Example

```bash
$ sudo passwd testuser
$ [sudo] password for terminal:
$ New password: 123
$ BAD PASSWORD: The password is shorter than 8 characters
$ Retype new password: 123
$ passwd: password updated successfully
```

Even though `123` is shorter than 8 characters, it will be accepted.df