# California Polo Index

Static GitHub Pages site for the California Polo Index.

## Deploy with GitHub Pages

1. Create a new GitHub repository.
2. Upload all files in this folder to the repository root.
3. Go to **Settings → Pages**.
4. Under **Build and deployment**, select:
   - Source: Deploy from a branch
   - Branch: main
   - Folder: /root
5. Save.

Your site will publish at:
`https://<your-username>.github.io/<repo-name>/`

## Data

The rankings are stored at:

`data/rankings.json`

To update the site, replace that JSON file with a newly generated CPI export.

## Logos

This first version uses generated team monograms instead of club logos.

Use:

`data/logo_map.csv`

to track verified club logos before adding them to `assets/logos/`.

Do not add logos unless you have verified the correct club identity and usage is appropriate.
