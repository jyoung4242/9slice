import { ImageSource, Loader } from "excalibur";
import nineSliceImage from "./assets/9slice.png";

export const Resources = {
  nineSliceImage: new ImageSource(nineSliceImage),
};

export const loader = new Loader();

for (let res of Object.values(Resources)) {
  loader.addResource(res);
}
