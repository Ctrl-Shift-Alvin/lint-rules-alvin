# lint-rules-alvin

[My](https://github.com/Ctrl-Shift-Alvin) personal repo containing configs for code linters. Some of my public repos use this, so it's public. A generalized config makes managaing configs much easier (once they're working, of course).

All dependencies are optional, but you need to install the correct ones depending on which files you use.

`eslint/configs` contains all different configs for each plugin. Sometimes there are multiple configs for the same plugin.

`eslint/custom_rules` contains custom rules that are used by the `eslint/configs/custom.js` file.

`eslint/presets` contains full configs that are mostly sets of configs from `eslint/configs`.

Feel free to fork and customize. In case anybody is insane (or too lazy to change to another config) and actually uses this, please only submit actual issues, not style changes, since... you know... it's my personal repo.