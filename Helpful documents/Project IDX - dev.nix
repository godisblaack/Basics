{ }: {
    # nixpkgs channel.
    channel = "stable-24.05";

    packages = [ ];

    env = { };

    idx = {
        extensions = [
            "GitHub.github-vscode-theme"
        ];

        previews = {
            enable = true;
            previews = { };
        };

        workspace = {
            onCreate = {
            default.openFiles = [ "README.md"];
            };
            onStart = { };
        };
    };
}