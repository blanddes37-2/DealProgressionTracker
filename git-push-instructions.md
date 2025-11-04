# Instructions to Push Your Code to GitHub

Your repository: https://github.com/blanddes37-2/DealProgressionTracker.git

## Step 1: Open the Shell

Click on the "Shell" tab in your Replit workspace.

## Step 2: Initialize and Configure Git

Run these commands one by one:

```bash
# Initialize git repository
git init

# Set your git user info
git config user.name "Ben Landes"
git config user.email "your-email@example.com"

# Add the remote repository
git remote add origin https://github.com/blanddes37-2/DealProgressionTracker.git
```

## Step 3: Add and Commit All Files

```bash
# Add all files (respecting .gitignore)
git add .

# Create your first commit
git commit -m "Initial commit: Commercial Deal Tracker Dashboard

- Full-stack TypeScript/React application
- 10-stage deal progression system
- PostgreSQL database with Drizzle ORM
- Advanced filtering and sorting
- Threaded comment system
- Compact timeline visualization
- All data scrambled for portfolio demonstration"
```

## Step 4: Push to GitHub

Since you have your GitHub token and username stored as secrets, use this command:

```bash
# Push to GitHub using your stored credentials
git push https://$GITHUB_USERNAME:$GITHUB_TOKEN@github.com/blanddes37-2/DealProgressionTracker.git main
```

If you get an error about the branch not existing, use:

```bash
git push -u https://$GITHUB_USERNAME:$GITHUB_TOKEN@github.com/blanddes37-2/DealProgressionTracker.git main
```

## Alternative: Using Git URL Secret

For even more security, you can create a single secret called `GIT_URL` with the value:
```
https://blanddes37-2:YOUR_TOKEN_HERE@github.com/blanddes37-2/DealProgressionTracker.git
```

Then push simply with:
```bash
git push $GIT_URL main
```

## Troubleshooting

If you encounter any errors:
- Make sure your GitHub token has `repo` scope permissions
- Verify the repository URL is correct
- Check that you're pushing to the right branch (main vs master)

Your project is ready to showcase on GitHub!