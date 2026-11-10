# BacklogTrap

A simple game backlog tracker built with React+Javascript, Bootstrap, and CSS. Keep track of the games you own, rate them, and (hopefully) finish them.

![alt text](<Screenshot From 2026-11-10 10-37-09.png>)

## Features

- **Add a game** with a name, platform, star rating (1-5), and an optional artwork URL
- **Platform choices:** PC, PlayStation, Xbox, Nintendo Switch, and Mobile
- **Search** your games by name
- **Filter** the list by platform
- **Remove** a game from your backlog with one click
- **Game cards** show the artwork, name, platform badge, and star rating
- **Placeholder image** is shown when a game has no artwork
- **Live counter** shows how many games are visible out of your total
- **Responsive layout** that adjusts from mobile to desktop using Bootstrap's grid

## Built With

- [React]
- [React-Bootstrap]
- [Bootstrap]
- [Javascript]
- [CSS]

## Getting Started

1. Clone the repository
   ```bash
   git clone <your-repo-url>
   cd backlogtrap
   ```
2. Install the dependencies
   ```bash
   npm install
   ```
   In case needed, also install the following
   ```bash
   npm install react-bootstrap bootstrap
   ```
3. Start the app
   ```bash
   npm run dev
   ```
4. Open the link shown in your terminal in your browser.

## How to Use

1. Fill in the "Add a Game" form and click **Add**.
2. Use the search bar or platform dropdown to find a game.
3. Click **Remove** on a card when you've finished or no longer want a game.

## Notes

- Games are stored in React state, so the list resets when you refresh the page.
