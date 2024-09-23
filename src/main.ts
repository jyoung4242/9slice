import "./style.css";
import { UI } from "@peasy-lib/peasy-ui";
import {
  Engine,
  DisplayMode,
  TileMap,
  ImageSource,
  SpriteSheet,
  Camera,
  Vector,
  ScreenElement,
  Color,
  Actor,
  Debug,
  Label,
  Font,
} from "excalibur";
import { NineSlice, NineSliceStretch } from "./9slice";
import { loader, Resources } from "./resources";
const model = {
  showHud: false,
  hstretch: "0",
  vstretch: "0",
  targetWidth: "128",
  targetHeight: "100",
  zoom: "1.0",
  update9slice: (e: any, m: any) => {
    switch (m.hstretch) {
      case "0":
        myNewNineSlice.setStretch("Horizontal", NineSliceStretch.Stretch);
        break;
      case "1":
        myNewNineSlice.setStretch("Horizontal", NineSliceStretch.Tile);
        break;
      case "2":
        myNewNineSlice.setStretch("Horizontal", NineSliceStretch.TileFit);
        break;
    }

    switch (m.vstretch) {
      case "0":
        myNewNineSlice.setStretch("Vertical", NineSliceStretch.Stretch);
        break;
      case "1":
        myNewNineSlice.setStretch("Vertical", NineSliceStretch.Tile);
        break;
      case "2":
        myNewNineSlice.setStretch("Vertical", NineSliceStretch.TileFit);
        break;
    }
    myNewNineSlice.setTargetWidth(parseInt(m.targetWidth));
    myNewNineSlice.setTargetHeight(parseInt(m.targetHeight));
    myNewNineSlice.initialize();
  },
  updatezoom: (e: any, m: any) => {
    game.currentScene.camera.zoom = parseFloat(m.zoom);
    game.currentScene.camera.strategy.lockToActor(testActor);
  },
};
const template = `
<style> 
    canvas{ 
        position: fixed; 
        top:50%; 
        left:50%; 
        transform: translate(-50% , -50%); 
    }
    hud-layer{
        position: fixed; 
        width: 800px;
        height: 600px;
        top:50%; 
        left:50%; 
        transform: translate(-50% , -50%);
        gap: 10px;
    }

    .hudcontainer{
        width: 15%;
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-left: 10px;
        margin-top: 10px;
    }
</style> 
<div> 
    <canvas id='cnv'> </canvas> 
    <hud-layer>
      <div class="hudcontainer" \${===showHud}>
        <div>
            <div>H stretch</div>
            <select >
              
              <option value="1" \${'1' ==> hstretch} >Tile</option>
              <option value="2" \${'2' ==> hstretch}>TileFit</option>
              <option selected value="0" \${'0' ==> hstretch} >Stretch</option>
            </select>
        </div>
          
        <div>
          <div>V stretch</div>
          <select >
              
              <option value="1" \${'1' ==> vstretch}>Tile</option>
              <option value="2" \${'2' ==> vstretch}>TileFit</option>
              <option selected value="0" \${'0' ==> vstretch} selected>Stretch</option>
            </select>
          
        </div>

        <div>
          <div>Target Width</div>
          <div>
            <input type="number" id="targetWidth" value="128" min="1" max="800" step="1"  \${value==>targetWidth} />
          </div>
        </div>

        <div>
          <div>Target Height</div>
          <div>
            <input type="number" id="targetheight" value="100" min="1" max="800" step="1" \${value==>targetHeight} />
          </div>
        </div>

        <div>
          <div>Zoom</div>
          <div>
            <input \${change@=>updatezoom} type="number" id="targetheight" value="1.0" step="0.1" \${value==>zoom} min="0.1" max="4.0"/>
          </div>
        </div>

        <div>
          <button id="start" \${click@=>update9slice}>Draw</button>
        </div>

      </div>
    </hud-layer>
</div>`;
await UI.create(document.body, model, template).attached;
const game = new Engine({
  width: 800, // the width of the canvas
  height: 600, // the height of the canvas
  canvasElementId: "cnv", // the DOM canvas element ID, if you are providing your own
  displayMode: DisplayMode.Fixed, // the display mode
  pixelArt: true,
  backgroundColor: Color.fromHex("11111170"),
});

await game.start(loader);

let startingH = NineSliceStretch.Stretch;
let startingV = NineSliceStretch.Stretch;

//Setup Graphics
const myNewNineSlice = new NineSlice({
  width: parseInt(model.targetWidth),
  height: parseInt(model.targetHeight),

  sourceConfig: {
    width: 64,
    height: 64,
    topMargin: 5,
    leftMargin: 6,
    bottomMargin: 5,
    rightMargin: 6,
  },
  source: Resources.nineSliceImage3,
  destinationConfig: {
    drawCenter: true,
    stretchH: startingH,
    stretchV: startingV,
  },
});
const testSprite = Resources.nineSliceImage3.toSprite();

//Test Actor
const testActor = new Actor({
  width: parseInt(model.targetWidth),
  height: parseInt(model.targetHeight),
  x: 0,
  y: 0,
  anchor: Vector.Zero,
});
testActor.graphics.use(myNewNineSlice);
testActor.onInitialize = () => {
  const label = new Label({
    text: "Target Nine Slice",
    x: 0,
    y: -15,
    font: new Font({
      family: "Arial",
      size: 12,
      color: Color.White,
    }),
  });
  testActor.addChild(label);
};

//Control Actor
const controlActor = new Actor({
  width: 64,
  height: 64,
  x: 0,
  y: -80,
  anchor: Vector.Zero,
});
controlActor.graphics.use(testSprite);
//add label to control actor
controlActor.onInitialize = () => {
  const label = new Label({
    text: "Original Tile",
    x: 0,
    y: -15,
    font: new Font({
      family: "Arial",
      size: 12,
      color: Color.White,
    }),
  });
  controlActor.addChild(label);
};

game.add(testActor);
game.add(controlActor);
game.currentScene.camera.strategy.lockToActor(testActor);
game.currentScene.camera.zoom = parseInt(model.zoom);

model.showHud = true;
