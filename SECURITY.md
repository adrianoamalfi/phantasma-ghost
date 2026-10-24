# Security policy

If you believe you have found a security issue in this theme (for example a way to inject script through a setting or a template), please do not open a public issue. Write to adrianoamalfi@gmail.com with the details and a way to reproduce it. You will get a reply as soon as possible.

The theme bundles its fonts locally and does not add third-party scripts. Ghost may inject its own platform scripts through `{{ghost_head}}` and `{{ghost_foot}}`. The theme stores nothing on the server; in the browser it stores one preference (the colour scheme) in `localStorage`.

Ghost serves a post's feature image to everyone, including for members-only and paid posts. The theme only avoids advertising the full-size file of a gated photograph (it ships a 30px stand-in); it cannot make the original private. See "Premium photographs" in the README.
