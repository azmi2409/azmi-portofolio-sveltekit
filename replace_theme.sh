#!/bin/bash
FILES=$(find src/routes/admin src/lib/components/admin -type f -name "*.svelte")

for file in $FILES; do
    # Backgrounds
    sed -i '' 's/bg-white/bg-card/g' "$file"
    sed -i '' 's/bg-gray-50/bg-muted\/30/g' "$file"
    sed -i '' 's/bg-gray-100/bg-muted/g' "$file"
    sed -i '' 's/dark:bg-gray-900/bg-card/g' "$file"
    sed -i '' 's/dark:bg-gray-800/bg-muted/g' "$file"
    sed -i '' 's/bg-gray-200/bg-muted/g' "$file"

    # Text
    sed -i '' 's/text-gray-900/text-foreground/g' "$file"
    sed -i '' 's/text-gray-800/text-foreground/g' "$file"
    sed -i '' 's/text-gray-700/text-muted-foreground/g' "$file"
    sed -i '' 's/text-gray-600/text-muted-foreground/g' "$file"
    sed -i '' 's/text-gray-800/text-muted-foreground/g' "$file"
    sed -i '' 's/text-gray-400/text-muted-foreground/g' "$file"
    sed -i '' 's/text-gray-300/text-muted-foreground/g' "$file"
    sed -i '' 's/dark:text-white/text-foreground/g' "$file"
    sed -i '' 's/dark:text-gray-300/text-muted-foreground/g' "$file"
    sed -i '' 's/dark:text-gray-400/text-muted-foreground/g' "$file"
    sed -i '' 's/dark:text-gray-800/text-muted-foreground/g' "$file"

    # Borders
    sed -i '' 's/border-gray-200/border-border/g' "$file"
    sed -i '' 's/border-gray-300/border-border/g' "$file"
    sed -i '' 's/border-gray-700/border-border/g' "$file"
    sed -i '' 's/dark:border-gray-700/border-border/g' "$file"
    sed -i '' 's/dark:border-gray-800/border-border/g' "$file"

    # Blue -> Primary
    sed -i '' 's/bg-blue-600/bg-primary/g' "$file"
    sed -i '' 's/bg-blue-500/bg-primary/g' "$file"
    sed -i '' 's/bg-blue-100/bg-primary\/10/g' "$file"
    sed -i '' 's/bg-blue-50/bg-primary\/5/g' "$file"
    sed -i '' 's/text-blue-600/text-primary/g' "$file"
    sed -i '' 's/text-blue-700/text-primary/g' "$file"
    sed -i '' 's/text-blue-400/text-primary/g' "$file"
    sed -i '' 's/border-blue-500/border-primary/g' "$file"
    sed -i '' 's/focus:border-blue-500/focus:border-ring/g' "$file"
    sed -i '' 's/focus:ring-blue-500\/20/focus:ring-ring\/20/g' "$file"
    sed -i '' 's/dark:bg-blue-900\/20/bg-primary\/10/g' "$file"
    sed -i '' 's/dark:bg-blue-900\/30/bg-primary\/10/g' "$file"
    sed -i '' 's/dark:text-blue-400/text-primary/g' "$file"
    sed -i '' 's/dark:text-blue-300/text-primary/g' "$file"
    sed -i '' 's/dark:bg-blue-500/bg-primary/g' "$file"
    sed -i '' 's/hover:bg-blue-700/hover:bg-primary\/90/g' "$file"
    
     # Red -> Destructive
    sed -i '' 's/text-red-700/text-destructive/g' "$file"
    sed -i '' 's/text-red-600/text-destructive/g' "$file"
    sed -i '' 's/bg-red-50/bg-destructive\/10/g' "$file"
    sed -i '' 's/border-red-300/border-destructive/g' "$file"
    sed -i '' 's/hover:bg-red-50/hover:bg-destructive\/10/g' "$file"
    sed -i '' 's/dark:text-red-400/text-destructive/g' "$file"
    sed -i '' 's/dark:bg-red-900\/20/bg-destructive\/10/g' "$file"
    sed -i '' 's/dark:border-red-700/border-destructive/g' "$file"
    sed -i '' 's/dark:hover:bg-red-900\/20/hover:bg-destructive\/10/g' "$file"
    sed -i '' 's/hover:text-red-700/hover:text-destructive/g' "$file"
    
    # Green -> Primary
    sed -i '' 's/text-green-600/text-primary/g' "$file"
    sed -i '' 's/text-green-700/text-primary/g' "$file"
    sed -i '' 's/bg-green-100/bg-primary\/10/g' "$file"
    sed -i '' 's/dark:text-green-400/text-primary/g' "$file"
    sed -i '' 's/dark:text-green-300/text-primary/g' "$file"
    sed -i '' 's/dark:bg-green-900\/30/bg-primary\/10/g' "$file"

    # Cleanup redundant dark classes (only remove if they are exact duplicates of base theme now)
    # Be careful with this, but since we replaced dark:bg-gray-900 with bg-card, and light bg-white with bg-card, we might have `bg-card bg-card`.
    # It's ugly but valid CSS. If we want to clean it up:
    sed -i '' 's/bg-card bg-card/bg-card/g' "$file"
    sed -i '' 's/text-foreground text-foreground/text-foreground/g' "$file"
    sed -i '' 's/text-muted-foreground text-muted-foreground/text-muted-foreground/g' "$file"
    sed -i '' 's/border-border border-border/border-border/g' "$file"
    
    # Remove some remaining dark: classes that are now matched to theme vars which handle dark mode automatically
    sed -i '' 's/dark:bg-card//g' "$file"
    sed -i '' 's/dark:bg-muted//g' "$file"
    sed -i '' 's/dark:bg-background//g' "$file"
    sed -i '' 's/dark:text-foreground//g' "$file"
    sed -i '' 's/dark:text-muted-foreground//g' "$file"
    sed -i '' 's/dark:border-border//g' "$file"
    
done
