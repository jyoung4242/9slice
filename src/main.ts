import './style.css';
import {UI} from '@peasy-lib/peasy-ui';
import { Engine, DisplayMode, TileMap, ImageSource, SpriteSheet, Camera, Vector } from "excalibur"; 
const model={};
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
await game.start(); 
