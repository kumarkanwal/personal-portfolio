# Adding a project

1. Copy `public/projects/_template/`.
2. Rename the copied folder to the project slug, for example `my-new-project`.
3. Edit `project.json`. Use `YYYY-MM` for `date`. `cat` must be one of: `AI agents`, `N8N & Automation`, `Websites`, `Products`, or `Plugins`.
4. Add the required card image as `cover.jpg`.
5. Optionally add `shot-1.jpg`, `shot-2.jpg`, and `demo.mp4`.
6. Run `npm run dev` and check the card, filters, metrics, and project detail page.
7. Push the new folder with the rest of your changes.

No application code changes are needed.

## Media sizes

- `cover.jpg`: 1200×760
- `shot-1.jpg` and `shot-2.jpg`: 1600×1000
- `demo.mp4`: under 6MB
