# Task Management Dashboard

A small, responsive task dashboard built with React and Vite.

## Features

- Dashboard summary: Total, Pending and Completed counts that update automatically
- Add tasks (title required, description optional, priority Low/Medium/High); blank or whitespace-only titles are rejected and the form clears after a successful submit
- Task cards showing title, description, priority and status
- Mark tasks as Completed or back to Pending, and delete tasks
- All / Pending / Completed filters with friendly empty-state messages
- Responsive layout (desktop and mobile) using plain CSS
- Optional extra: tasks are saved in `localStorage` so they survive a page refresh

## Setup

Requires Node.js 18 or newer.

```bash
npm install
npm run dev
```

Open the address shown in the terminal (usually http://localhost:5173).

To create a production build:

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  main.jsx                  Entry point
  App.jsx                   Holds task state and all handlers
  styles.css                Layout and responsive styles
  components/
    DashboardSummary.jsx    Total / Pending / Completed counters
    TaskForm.jsx            Add-task form with validation
    FilterBar.jsx           All / Pending / Completed buttons
    TaskList.jsx            Renders the cards or the empty state
    TaskCard.jsx            One task with toggle and delete actions
```

## Task data structure

```js
{ id, title, description, priority, status }
```

Each task gets a unique id (`crypto.randomUUID()`), never an array index.

## Resetting saved tasks

Tasks are stored in the browser under the key `task-dashboard.tasks`. To go back
to the sample tasks, clear that key in DevTools > Application > Local Storage.
# task-management
