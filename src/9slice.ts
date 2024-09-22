import { ImageSource, ScreenElement, Vector } from "excalibur";

type NineSliceConfig = {
  source: ImageSource;
  soourceSpecs: {
    size: Vector;
  };
  destinationSpecs: {
    pos: Vector;
    size: Vector;
  };
  nineSlice: {
    marginTop: number;
    marginLeft: number;
    marginBottom: number;
    marginRight: number;
    drawCenter: boolean;
    stretchH: boolean;
    stretchV: boolean;
  };
};

export class NineSlice extends ScreenElement {
  constructor(src: ImageSource, config: NineSliceConfig) {
    super();
  }
}
