import { ExcaliburGraphicsContext, Graphic, GraphicOptions, ImageSource, Vector } from "excalibur";

export enum NineSliceStretch {
  Stretch,
  Tile,
  TileFit,
}

export type NineSliceConfig = {
  graphicOptions: GraphicOptions;
  source: ImageSource;
  sourceDims: Vector;
  marginTop: number;
  marginLeft: number;
  marginBottom: number;
  marginRight: number;
  drawCenter: boolean;
  stretchH: NineSliceStretch;
  stretchV: NineSliceStretch;
};

export class NineSlice extends Graphic {
  constructor(public config: NineSliceConfig) {
    super(config.graphicOptions);
  }

  protected _drawImage(ex: ExcaliburGraphicsContext, x: number, y: number): void {}

  clone(): Graphic {
    return new NineSlice(this.config);
  }
}
