# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Commands

- `npm run serve`: Starts the development server.
- `npm run build`: Compiles and minifies for production.

## Code Architecture

This is a Vue.js 2 project built with Vue CLI.

- **Routing**: Handled by `vue-router`. The routes are defined in `src/router/index.js`.
- **State Management**: Uses `vuex` for global state management. The store is configured in `src/store/index.js`.
- **UI Components**: The project uses `element-ui` as a component library.
- **Main Entrypoint**: The application's entry point is `src/main.js`.
- **Root Component**: The main App component is `src/App.vue`.
- **Views**: Application views (pages) are located in the `src/views` directory.
- **Reusable Components**: Reusable UI components are located in the `src/components` directory.