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

const spriteArray = [
  { src: Resources.nineSliceImage, top: 13, left: 13, right: 13, bottom: 13 },
  { src: Resources.nineSliceImage2, top: 5, left: 5, right: 5, bottom: 5 },
  { src: Resources.nineSliceImage3, top: 5, left: 6, right: 5, bottom: 6 },
];
let spriteIndex = 2;

const model = {
  showHud: false,
  hstretch: "0",
  vstretch: "0",
  targetWidth: "128",
  targetHeight: "100",
  topMargin: "5",
  leftMargin: "6",
  bottomMargin: "5",
  rightMargin: "6",
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
    myNewNineSlice.setMargins(parseInt(m.leftMargin), parseInt(m.topMargin), parseInt(m.rightMargin), parseInt(m.bottomMargin));
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
        pointer-events: none;
    }

    .hudcontainer{
        width: 18%;
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-left: 10px;
        margin-top: 10px;
        pointer-events: auto;
    }
</style> 
<div> 
    <canvas id='cnv'> </canvas> 
    <hud-layer>
      <div class="hudcontainer" \${===showHud}>
        <div>
            <div>H stretch</div>
            <select \${change@=>update9slice}>
              
              <option value="1" \${'1' ==> hstretch} >Tile</option>
              <option value="2" \${'2' ==> hstretch}>TileFit</option>
              <option selected value="0" \${'0' ==> hstretch} >Stretch</option>
            </select>
        </div>
          
        <div>
          <div>V stretch</div>
          <select \${change@=>update9slice} >
              
              <option value="1" \${'1' ==> vstretch}>Tile</option>
              <option value="2" \${'2' ==> vstretch}>TileFit</option>
              <option selected value="0" \${'0' ==> vstretch} selected>Stretch</option>
            </select>
          
        </div>

        <div>
          <div>Top Slice Margin</div>
          <div>
            <input \${change@=>update9slice} type="number" id="targetWidth" value="5" min="1" max="64" step="1"  \${value<=>topMargin} />
          </div>
        </div>

        <div>
          <div>Right Slice Margin</div>
          <div>
            <input \${change@=>update9slice} type="number" id="targetWidth" value="6" min="1" max="64" step="1"  \${value<=>rightMargin} />
          </div>
        </div>

        <div>
          <div>Bottom Slice Margin</div>
          <div>
            <input \${change@=>update9slice} type="number" id="targetWidth" value="5" min="1" max="64" step="1"  \${value<=>bottomMargin} />
          </div>
        </div>


        <div>
          <div>Left Slice Margin</div>
          <div>
            <input \${change@=>update9slice} type="number" id="targetWidth" value="6" min="1" max="64" step="1"  \${value<=>leftMargin} />
          </div>
        </div>

        <div>
          <div>Target Width</div>
          <div>
            <input \${change@=>update9slice} type="number" id="targetWidth" value="128" min="1" max="800" step="1"  \${value==>targetWidth} />
          </div>
        </div>

        <div>
          <div>Target Height</div>
          <div>
            <input \${change@=>update9slice} type="number" id="targetheight" value="100" min="1" max="800" step="1" \${value==>targetHeight} />
          </div>
        </div>

        <div>
          <div>Zoom</div>
          <div>
            <input \${change@=>updatezoom} type="number" id="targetheight" value="1.0" step="0.1" \${value==>zoom} min="0.1" max="4.0"/>
          </div>
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
let myNewNineSlice = new NineSlice({
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

const leftButton = new Actor({
  width: 16,
  height: 64,
  x: -24,
  y: 0,
  anchor: Vector.Zero,
});
leftButton.graphics.use(Resources.arrow.toSprite());
leftButton.onInitialize = () => {
  leftButton.on("pointerup", () => {
    changeImage("left");
  });
};
const rightButton = new Actor({ width: 16, height: 64, x: 64 + 8, y: 0, anchor: Vector.Zero });
rightButton.onInitialize = () => {
  rightButton.on("pointerup", () => {
    changeImage("right");
  });
};
const flippedSprite = Resources.arrow.toSprite();
flippedSprite.flipHorizontal = true;
rightButton.graphics.use(flippedSprite);
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
  controlActor.addChild(leftButton);
  controlActor.addChild(rightButton);
};

game.add(testActor);
game.add(controlActor);
game.currentScene.camera.strategy.lockToActor(testActor);
game.currentScene.camera.zoom = parseInt(model.zoom);

model.showHud = true;

function changeImage(who: "left" | "right") {
  console.log("change image", who);
  if (who === "left") {
    if (spriteIndex === 0) {
      spriteIndex = 2;
    } else {
      spriteIndex--;
    }
  } else {
    if (spriteIndex === 2) {
      spriteIndex = 0;
    } else {
      spriteIndex++;
    }
  }
  const nextImage = spriteArray[spriteIndex];
  controlActor.graphics.use(nextImage.src.toSprite());
  let hstretch, vstretch;

  if (model.hstretch === "0") hstretch = NineSliceStretch.Stretch;
  else if (model.hstretch === "1") hstretch = NineSliceStretch.Tile;
  else hstretch = NineSliceStretch.TileFit;

  if (model.vstretch === "0") vstretch = NineSliceStretch.Stretch;
  else if (model.vstretch === "1") vstretch = NineSliceStretch.Tile;
  else vstretch = NineSliceStretch.TileFit;

  model.topMargin = nextImage.top.toString();
  model.rightMargin = nextImage.right.toString();
  model.bottomMargin = nextImage.bottom.toString();
  model.leftMargin = nextImage.left.toString();

  myNewNineSlice = new NineSlice({
    width: parseInt(model.targetWidth),
    height: parseInt(model.targetHeight),
    sourceConfig: {
      width: 64,
      height: 64,
      topMargin: nextImage.top,
      leftMargin: nextImage.left,
      bottomMargin: nextImage.bottom,
      rightMargin: nextImage.right,
    },
    source: nextImage.src,
    destinationConfig: {
      drawCenter: true,
      stretchH: hstretch,
      stretchV: vstretch,
    },
  });

  testActor.graphics.use(myNewNineSlice);
}
