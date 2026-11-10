# Promptcraft

A lightweight, browser-based prompt studio for composing and reusing practical AI prompt templates.

## Run it

Open `index.html` in a modern browser. No build step, dependencies, account, or API key is required.

## Use it

Choose a template, fill in its fields, and refine the generated prompt in the live preview. Copy the finished prompt with **Copy prompt**. Search and category filters help you find templates; `/` focuses search, and `Ctrl+Enter` (or `Cmd+Enter`) copies the prompt.

Templates cover learning, creative work, writing, summarizing, code review, and project planning. Selected templates, filled fields, and edited prompts are saved in the current browser using local storage. Nothing is sent to a server.

## Customize templates

Edit the `templates` array at the top of `app.js`. Each template defines its `id`, name, category, icon, fields, defaults, and a prompt string. Use `{{field_key}}` placeholders in the prompt to insert values from the matching field keys.
