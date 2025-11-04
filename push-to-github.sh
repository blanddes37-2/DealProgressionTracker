#!/bin/bash

# Fix GitHub Push Script for blanddes37-2 account

echo "🔧 Fixing GitHub remote configuration..."

# Remove the old remote
git remote remove origin 2>/dev/null

# Add the correct remote
git remote add origin https://github.com/blanddes37-2/DealProgressionTracker.git

# Show current remotes
echo "📋 Current remotes:"
git remote -v

# Push using the stored credentials
echo "🚀 Pushing to GitHub..."
git push -u https://$GITHUB_USERNAME:$GITHUB_TOKEN@github.com/blanddes37-2/DealProgressionTracker.git main

# Check if push was successful
if [ $? -eq 0 ]; then
    echo "✅ Successfully pushed to GitHub!"
    echo "🔗 Your repository is now live at: https://github.com/blanddes37-2/DealProgressionTracker"
else
    echo "❌ Push failed. Please check your credentials and try again."
fi