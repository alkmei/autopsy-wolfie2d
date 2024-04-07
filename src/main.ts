import Game from "./Wolfie2D/Loop/Game";
import MainMenu from "./Autopsy/Scenes/MainMenu";
import { Action } from "./globals";

// The main function is your entrypoint into Wolfie2D. Specify your first scene and any options here.
(function main() {
  // Run any tests
  runTests();

  // Set up options for our game
  let options = {
    canvasSize: { x: 1200, y: 800 }, // The size of the game
    clearColor: { r: 34, g: 28, b: 41 }, // The color the game clears to
    inputs: [
      { name: Action.Left, keys: ["a"] },
      { name: Action.Right, keys: ["d"] },
      { name: Action.Up, keys: ["w"] },
      { name: Action.Down, keys: ["s"] },
      { name: Action.Jump, keys: ["space"] },
      { name: Action.Attack, keys: ["j"] },
      { name: Action.Dash, keys: ["shift"] },
      { name: Action.Pause, keys: ["escape"] },
    ],
    useWebGL: false, // Tell the game we want to use webgl
    showDebug: true, // Whether to show debug messages. You can change this to true if you want
  };

  // Create a game with the options specified
  const game = new Game(options);

  // Start our game
  game.start(MainMenu, {});
})();

function runTests() {}
