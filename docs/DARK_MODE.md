# Dark Mode Implementation in StoryMagic

This document provides an overview of the dark mode implementation in the StoryMagic application, which uses Tailwind CSS v4.

## How Dark Mode Works

StoryMagic uses Tailwind CSS's dark mode with the 'class' strategy. This allows the application to toggle dark mode without relying solely on the system preference, while still supporting system settings as a default.

### Key Components

1. **Theme Context** (`src/renderer/src/hooks/useTheme.jsx`): 
   - Manages dark mode state across the application
   - Provides `darkMode` state and `toggleDarkMode` function
   - Respects user's explicit preference (stored in localStorage)
   - Falls back to system preference if no stored preference

2. **Initial Theme Loading** (`src/renderer/index.html`):
   - Contains an inline script that applies the theme immediately on page load
   - Prevents flash of incorrect theme when the application starts

3. **Tailwind Configuration** (`tailwind.config.js`):
   - Sets `darkMode: 'class'` to use HTML class for dark mode
   - Configures content paths for the utility class scanning

4. **CSS Variables** (`src/renderer/src/assets/main.css`):
   - Uses Tailwind CSS v4's CSS variables for theme colors
   - Sets `color-scheme` for proper scrollbar and form control styling

5. **Settings UI** (`src/renderer/src/pages/SettingsPage.jsx`):
   - Allows users to explicitly select their theme preference
   - Options include Light Mode, Dark Mode, and System Default

## Debugging Dark Mode

If you encounter issues with dark mode:

1. Check the HTML element for the 'dark' class
2. Verify localStorage for a 'theme' key
3. Test the system preference detection
4. Review component styling to ensure dark mode variants are properly defined

## How to Use Dark Mode Classes

When creating new components, use Tailwind's dark mode variant:

```jsx
<div className="bg-white text-gray-900 dark:bg-gray-800 dark:text-white">
  Dark mode compatible content
</div>
```

## Customizing Dark Mode Colors

To add or modify colors for dark mode:

1. Add your custom colors to the `@theme` block in `src/renderer/src/assets/main.css`
2. Use them in your components with Tailwind's dark mode variant

## Known Limitations

- Image assets need separate dark mode versions if they should change with theme
- Third-party components may need additional styling for proper dark mode support
