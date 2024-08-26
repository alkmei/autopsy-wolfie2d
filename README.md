# Autopsy

[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC_BY--NC--SA_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)

A typescript video game made in the Wolfie2D game engine developed by professors and students in Stony Brook University, with slight modifications by me.

## Run and Build Instructions

This project uses Vite instead of Gulp. The only big difference is that game assets are stored
in the /public folder, rather than the /dist folder.

Rather than starting the live server in VSCode, Vite automatically starts a live
server for you.

Install dependencies

```shell
npm install
```

Run project in dev mode (with auto-reloading). This is probably what you want if
you want to test and grade the project.

```shell
npm run dev
```

Build project for deployment.

```shell
npm run build
```
