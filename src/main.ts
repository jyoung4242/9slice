import "./style.css";
import { UI } from "@peasy-lib/peasy-ui";
import { Engine, DisplayMode, TileMap, ImageSource, SpriteSheet, Camera, Vector, ScreenElement } from "excalibur";
import { NineSlice, NineSliceStretch } from "./9slice";
import { loader, Resources } from "./resources";
const model = {};
const template = `
<style> 
    canvas{ 
        position: fixed; 
        top:50%; 
        left:50%; 
        transform: translate(-50% , -50%); 
    }
</style> 
<div> 
    <canvas id='cnv'> </canvas> 
</div>`;
await UI.create(document.body, model, template).attached;
const game = new Engine({
  width: 800, // the width of the canvas
  height: 600, // the height of the canvas
  canvasElementId: "cnv", // the DOM canvas element ID, if you are providing your own
  displayMode: DisplayMode.Fixed, // the display mode
});

class MyTestUI extends ScreenElement {
  constructor() {
    super({
      name: "MyTestUI",
      width: 256,
      height: 256,
      x: 0,
      y: 0,
    });

    this.graphics.use(myNewNineSlice);
  }
}

await game.start(loader);

const myNewNineSlice = new NineSlice({
  width: 256,
  height: 256,
  sourceConfig: {
    width: 256,
    height: 256,
    topMargin: 52,
    leftMargin: 53,
    bottomMargin: 52,
    rightMargin: 53,
  },
  source: Resources.nineSliceImage,
  destinationConfig: {
    drawCenter: true,
    stretchH: NineSliceStretch.Stretch,
    stretchV: NineSliceStretch.Stretch,
  },
});

const ui = new MyTestUI();

game.add(ui);
console.log(ui);
game.currentScene.camera.strategy.lockToActor(ui);
console.log(myNewNineSlice);
