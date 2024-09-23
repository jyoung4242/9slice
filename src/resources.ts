import { ImageSource, Loader } from "excalibur";
import nineSliceImage from "./assets/9slice.png";
import nineSliceImage2 from "./assets/9slicetest2.png";
import nineSliceImage3 from "./assets/9slicetest3.png";

export const Resources = {
  nineSliceImage: new ImageSource(nineSliceImage),
  nineSliceImage2: new ImageSource(nineSliceImage2),
  nineSliceImage3: new ImageSource(nineSliceImage3),
};

export const loader = new Loader();

for (let res of Object.values(Resources)) {
  loader.addResource(res);
}
