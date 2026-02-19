# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.20] - 2024-08-01

### Changed
- **Default Username**: Updated the default user's name from "Vexel" and "ProGamer_42" to "YUV-X" across all components, contexts, and mock data for a consistent identity.

## [1.0.19] - 2024-08-01

### Changed
- **Branding**: Updated the application name from "YUV-X" to "VORT-X" across all relevant files for consistent branding.

## [1.0.18] - 2024-08-01

### Fixed
- **Theme Switching**: Fixed a persistent bug where the theme was not being applied correctly by refactoring the layout to use a `useEffect` hook that reliably toggles the theme class on the root `<html>` element.
- **Sidebar Visibility**: Restored the main sidebar to all authenticated pages (Social, DMs, Communities) by simplifying layout visibility rules.
- **Redundant Header**: Removed a duplicate header from the Community pages to create a consistent UI.

## [1.0.17] - 2024-08-01

### Fixed
- **Theme Switching**: Fixed a bug where the light/dark theme toggle in the Settings page was not applying the selected theme globally across the application.

## [1.0.16] - 2024-08-01

### Changed
- **UI Unification**: Removed the mobile-specific bottom navigation bar and custom header from the social feed, integrating it into the main app layout with the standard sidebar for a consistent user experience.

### Fixed
- **CSS Build Error**: Fixed a build error related to `@layer` usage by consolidating social feed styles into `globals.css` and removing the redundant `social.css` file.

### Added
- **Revamped Social Feed**: Overhauled the social feed to mirror Instagram's UI, featuring a stories bar, tournament-centric posts with rich data overlays, and a familiar mobile-first layout with a dark, neon-accented gaming aesthetic.

## [1.0.15] - 2024-08-01

### Changed
- **Landing Page Icon**: Replaced the gaming controller icon with a modern gaming console icon to better align with the desired aesthetic for the interactive background.

## [1.0.14] - 2024-08-01

### Changed
- **Icon Simplification**: Replaced the gaming gear icon on the landing page with a single, clean game controller icon for a more focused and iconic look.

## [1.0.13] - 2024-08-01

### Added
- **Dynamic Background**: Replaced the landing page's single console icon with a more detailed gaming gear setup (controller, keyboard, mouse) and added more floating doodles to create a richer, more dynamic background.

## [1.0.12] - 2024-08-01

### Added
- **Interactive Background**: Added a dynamic, neon-outlined gaming console icon and floating doodles to the landing page background that tilts in response to mouse movement, creating an immersive and engaging visual effect.

## [1.0.11] - 2024-08-01

### Changed
- **Social Feed UI**: Overhauled the social feed design to be sleeker and more modern, with redesigned post cards, minimalist icons, improved typography, and subtle neon accents for a premium, gamer-centric feel. Updated both the main feed and individual post pages for a consistent experience.

### Fixed
- **CSS Build Error**: Fixed a build error related to `@layer` usage by consolidating social feed styles into `globals.css` and removing the redundant `social.css` file.

## [1.0.10] - 2024-08-01

### Fixed
- **Create Tournament Dialog**: Made the "Host a Tournament" dialog more compact by reducing vertical spacing and adding a scrollbar to prevent overflow on smaller screens, ensuring all content is accessible without zooming.

## [1.0.9] - 2024-08-01

### Fixed
- **Create Tournament Dialog**: Reduced the maximum width of the "Host a Tournament" dialog box from `2xl` to `lg` to ensure it fits comfortably on smaller screen sizes and avoids layout issues.

## [1.0.8] - 2024-08-01

### Changed
- **Notification UI**: Changed the hover highlight color on notifications from the bright `accent` color to a more subtle `secondary/50` dark gray, improving visual comfort and consistency with the dark theme.

## [1.0.7] - 2024-08-01

### Fixed
- **Dashboard Layout**: Fixed content overflow issues on the dashboard by ensuring long tournament names in both the "Hosted Tournaments" and "Registered Tournaments" cards wrap correctly instead of breaking the layout.

## [1.0.6] - 2024-08-01

### Fixed
- **Banner Upload**: Corrected an issue where the "Change Banner" button in the profile edit mode was not functional. The `onClick` handler has been properly wired to the button to trigger the file input.

## [1.0.5] - 2024-08-01

### Added
- **Image Upload Functionality**: Enabled the "Change Profile Picture" and "Change Banner" buttons in the profile edit mode.
- **Image Previews**: Implemented immediate client-side previews for newly selected images, allowing users to see their changes before saving.
- **File Input Integration**: Added hidden file inputs triggered by the camera icon buttons for a seamless upload experience.

## [1.0.4] - 2024-08-01

### Added
- **Edit Profile Button**: Added an "Edit Profile" button to the `PlayerProfileCard`.
- **Edit Mode**: Implemented an edit mode on the profile card that allows users to update their username and bio directly. Save and Cancel buttons are shown in this mode.

### Changed
- **Profile Page Actions**: The "Follow" and "Message" buttons on the `PlayerProfileCard` are now hidden when the user is in edit mode, replaced by "Save" and "Cancel" actions.

## [1.0.3] - 2024-08-01

### Changed
- **Profile Navigation**: Replaced the user avatar dropdown in the header with a direct link to the profile page for a cleaner UI.
- **Profile Actions**: Moved the "Settings," "Support," and "Log Out" actions from the old header dropdown to a new action bar directly on the `/profile` page.

## [1.0.2] - 2024-08-01

### Changed
- **Sidebar Icon**: Updated the icon for the "Social" tab in the main sidebar from a "Home" icon to a "Newspaper" icon to better represent an activity feed.
- **Social Page Layout**: Modified the social feed page to include the "Create Post" component directly on the page instead of in a floating dialog, improving user workflow.
- **Dashboard Layout**: Adjusted grid column spans on the dashboard to better balance the layout.

## [1.0.1] - 2024-08-01

### Added
- Created `CHANGELOG.md` to track project updates.
- Populated the changelog with all historical changes made during the development session.

## [1.0.0] - 2024-08-01

### Added
- **Profile Page**: Created a dedicated user profile page at `/profile` to display user details and activity.
- **Events Page**: Created a new page at `/events` to show a comprehensive list of all live events, making the "View All" button on the dashboard functional.
- **Welcome Message**: Added a personalized "Welcome back, YUV-X!" message to the top of the `/dashboard` page.

### Changed
- **UI Layout**:
    - Adjusted padding on several pages (`dashboard`, `profile`, `games`, `social`, etc.) to be slightly smaller for a more compact feel.
    - Constrained the `max-width` of the activity feed on the `profile` and `posts` pages to `max-w-2xl` for better readability on large screens.
- **Dashboard Layout**:
    - Restructured the dashboard grid into a more flexible, masonry-style layout to prevent empty spaces on wide screens.
    - Adjusted column spans for cards to create a more balanced and visually appealing arrangement.
    - Removed the large `PlayerProfileCard` from the top of the dashboard for a more direct, data-focused view.
- **Live Events Card**:
    - Widened the "Live Events" card on the dashboard to ensure long tournament names are clearly visible without excessive wrapping.
    - Limited tournament names in the card to a maximum of three lines to maintain a clean appearance.
- **Navigation**:
    - Promoted the "Games" tab to be the primary item in the main sidebar navigation.
    - Renamed the "Home" tab to "Social" and updated its associated routes (`/home` to `/social`) to better reflect its purpose as an activity feed.
    - Updated the user avatar dropdown in the header to link to the new `/profile` page instead of `/dashboard`.

### Fixed
- **Dashboard Alignment**: Corrected an issue where cards in the right column of the dashboard were not stretching to fill the available width, leaving empty space.
- **Missing "Message Host" Button**: Re-added the "Message Host" button to the "My Tournaments" section, restoring the ability for users to contact tournament organizers.
- **Module Not Found Error**: Fixed a "Module not found" build error on the profile page by correcting the import path for the `RegisteredTournamentsCard` component.
