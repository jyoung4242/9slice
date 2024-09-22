import { ExcaliburGraphicsContext, Graphic, GraphicOptions, ImageSource, Logger } from "excalibur";

export enum NineSliceStretch {
  Stretch,
  Tile,
  TileFit,
}

export type NineSliceConfig = GraphicOptions & {
  source: ImageSource;
  sourceConfig: {
    width: number;
    height: number;
    topMargin: number;
    leftMargin: number;
    bottomMargin: number;
    rightMargin: number;
  };
  destinationConfig: {
    width: number;
    height: number;
    drawCenter: boolean;
    stretchH: NineSliceStretch;
    stretchV: NineSliceStretch;
  };
};

export class NineSlice extends Graphic {
  imgSource: ImageSource;
  sourceSprite: HTMLImageElement;
  canvasA: HTMLCanvasElement;
  canvasB: HTMLCanvasElement;
  canvasC: HTMLCanvasElement;
  canvasD: HTMLCanvasElement;
  canvasE: HTMLCanvasElement;
  canvasF: HTMLCanvasElement;
  canvasG: HTMLCanvasElement;
  canvasH: HTMLCanvasElement;
  canvasI: HTMLCanvasElement;
  firstTimeFlag = true;
  private _logger = Logger.getInstance();
  constructor(public config: NineSliceConfig) {
    super(config);
    this.imgSource = config.source;
    this.sourceSprite = config.source.image;

    this.canvasA = document.createElement("canvas");
    this.canvasB = document.createElement("canvas");
    this.canvasC = document.createElement("canvas");
    this.canvasD = document.createElement("canvas");
    this.canvasE = document.createElement("canvas");
    this.canvasF = document.createElement("canvas");
    this.canvasG = document.createElement("canvas");
    this.canvasH = document.createElement("canvas");
    this.canvasI = document.createElement("canvas");
    this.initialize();

    if (!this.imgSource.isLoaded()) {
      this._logger.warnOnce(
        `ImageSource ${this.imgSource.path}` +
          ` is not yet loaded and won't be drawn. Please call .load() or include in a Loader.\n\n` +
          `Read https://excaliburjs.com/docs/imagesource for more information.`
      );
    }
  }

  protected _drawImage(ex: ExcaliburGraphicsContext, x: number, y: number): void {
    if (this.imgSource.isLoaded()) {
      ex.drawImage(this.canvasA, 0, 0, this.canvasA.width, this.canvasA.height, x, y, this.canvasA.width, this.canvasA.height);
      ex.drawImage(
        this.canvasB,
        0,
        0,
        this.canvasB.width,
        this.canvasB.height,
        x + this.config.sourceConfig.leftMargin,
        y,
        this.canvasB.width,
        this.canvasB.height
      );
      ex.drawImage(
        this.canvasC,
        0,
        0,
        this.canvasC.width,
        this.canvasC.height,
        x + (this.config.sourceConfig.width - this.config.sourceConfig.rightMargin),
        y,
        this.canvasC.width,
        this.canvasC.height
      );
      ex.drawImage(
        this.canvasD,
        0,
        0,
        this.canvasD.width,
        this.canvasD.height,
        x,
        y + this.config.sourceConfig.topMargin,
        this.canvasD.width,
        this.canvasD.height
      );
      if (this.config.destinationConfig.drawCenter)
        ex.drawImage(
          this.canvasE,
          0,
          0,
          this.canvasE.width,
          this.canvasE.height,
          x + this.config.sourceConfig.leftMargin,
          y + this.config.sourceConfig.topMargin,
          this.canvasE.width,
          this.canvasE.height
        );
      ex.drawImage(
        this.canvasF,
        0,
        0,
        this.canvasF.width,
        this.canvasF.height,
        x + this.config.sourceConfig.width - this.config.sourceConfig.rightMargin,
        y + this.config.sourceConfig.topMargin,
        this.canvasF.width,
        this.canvasF.height
      );
      ex.drawImage(
        this.canvasG,
        0,
        0,
        this.canvasG.width,
        this.canvasG.height,
        0,
        y + this.config.sourceConfig.height - this.config.sourceConfig.bottomMargin,
        this.canvasG.width,
        this.canvasG.height
      );
      ex.drawImage(
        this.canvasH,
        0,
        0,
        this.canvasH.width,
        this.canvasH.height,
        x + this.config.sourceConfig.leftMargin,
        y + this.config.sourceConfig.height - this.config.sourceConfig.bottomMargin,
        this.canvasH.width,
        this.canvasH.height
      );
      ex.drawImage(
        this.canvasI,
        0,
        0,
        this.canvasI.width,
        this.canvasI.height,
        x + this.config.sourceConfig.width - this.config.sourceConfig.rightMargin,
        y + this.config.sourceConfig.height - this.config.sourceConfig.bottomMargin,
        this.canvasI.width,
        this.canvasI.height
      );
    } else {
      this._logger.warnOnce(
        `ImageSource ${this.imgSource.path}` +
          ` is not yet loaded and won't be drawn. Please call .load() or include in a Loader.\n\n` +
          `Read https://excaliburjs.com/docs/imagesource for more information.`
      );
    }
  }

  initialize() {
    //top left slice
    console.log("initialize");

    console.log(this.config.sourceConfig);

    this.canvasA.width = this.config.sourceConfig.leftMargin;
    this.canvasA.height = this.config.sourceConfig.topMargin;
    const Atx = this.canvasA.getContext("2d");
    Atx?.drawImage(this.sourceSprite, 0, 0, this.canvasA.width, this.canvasA.height, 0, 0, this.canvasA.width, this.canvasA.height);

    //top slice
    this.canvasB.width = this.config.sourceConfig.width - this.config.sourceConfig.leftMargin - this.config.sourceConfig.rightMargin;
    this.canvasB.height = this.config.sourceConfig.topMargin;
    const Btx = this.canvasB.getContext("2d");
    Btx?.drawImage(
      this.sourceSprite,
      this.config.sourceConfig.leftMargin,
      0,
      this.canvasB.width,
      this.canvasB.height,
      0,
      0,
      this.canvasB.width,
      this.canvasB.height
    );

    //top right slice
    this.canvasC.width = this.config.sourceConfig.rightMargin;
    this.canvasC.height = this.config.sourceConfig.topMargin;
    const Ctx = this.canvasC.getContext("2d");
    Ctx?.drawImage(
      this.sourceSprite,
      this.sourceSprite.width - this.config.sourceConfig.rightMargin,
      0,
      this.canvasC.width,
      this.canvasC.height,
      0,
      0,
      this.canvasC.width,
      this.canvasC.height
    );

    //middle left slice
    this.canvasD.width = this.config.sourceConfig.leftMargin;
    this.canvasD.height = this.config.sourceConfig.height - this.config.sourceConfig.topMargin - this.config.sourceConfig.bottomMargin;
    const Dtx = this.canvasD.getContext("2d");
    Dtx?.drawImage(
      this.sourceSprite,
      0,
      this.config.sourceConfig.topMargin,
      this.canvasD.width,
      this.canvasD.height,
      0,
      0,
      this.canvasD.width,
      this.canvasD.height
    );

    //middle slice
    this.canvasE.width = this.config.sourceConfig.width - this.config.sourceConfig.leftMargin - this.config.sourceConfig.rightMargin;
    this.canvasE.height = this.config.sourceConfig.height - this.config.sourceConfig.topMargin - this.config.sourceConfig.bottomMargin;
    const Etx = this.canvasE.getContext("2d");
    Etx?.drawImage(
      this.sourceSprite,
      this.config.sourceConfig.leftMargin,
      this.config.sourceConfig.topMargin,
      this.canvasE.width,
      this.canvasE.height,
      0,
      0,
      this.canvasE.width,
      this.canvasE.height
    );

    //middle right slice
    this.canvasF.width = this.config.sourceConfig.rightMargin;
    this.canvasF.height = this.config.sourceConfig.height - this.config.sourceConfig.topMargin - this.config.sourceConfig.bottomMargin;
    const Ftx = this.canvasF.getContext("2d");
    Ftx?.drawImage(
      this.sourceSprite,
      this.sourceSprite.width - this.config.sourceConfig.rightMargin,
      this.config.sourceConfig.topMargin,
      this.canvasF.width,
      this.canvasF.height,
      0,
      0,
      this.canvasF.width,
      this.canvasF.height
    );

    //bottom left slice
    this.canvasG.width = this.config.sourceConfig.leftMargin;
    this.canvasG.height = this.config.sourceConfig.bottomMargin;
    const Gtx = this.canvasG.getContext("2d");
    Gtx?.drawImage(
      this.sourceSprite,
      0,
      this.config.sourceConfig.height - this.config.sourceConfig.bottomMargin,
      this.canvasG.width,
      this.canvasG.height,
      0,
      0,
      this.canvasG.width,
      this.canvasG.height
    );

    //bottom slice
    this.canvasH.width = this.config.sourceConfig.width - this.config.sourceConfig.leftMargin - this.config.sourceConfig.rightMargin;
    this.canvasH.height = this.config.sourceConfig.bottomMargin;
    const Htx = this.canvasH.getContext("2d");
    Htx?.drawImage(
      this.sourceSprite,
      this.config.sourceConfig.leftMargin,
      this.config.sourceConfig.height - this.config.sourceConfig.bottomMargin,
      this.canvasH.width,
      this.canvasH.height,
      0,
      0,
      this.canvasH.width,
      this.canvasH.height
    );

    //bottom right slice
    this.canvasI.width = this.config.sourceConfig.rightMargin;
    this.canvasI.height = this.config.sourceConfig.bottomMargin;
    const Itx = this.canvasI.getContext("2d");
    Itx?.drawImage(
      this.sourceSprite,
      this.sourceSprite.width - this.config.sourceConfig.rightMargin,
      this.config.sourceConfig.height - this.config.sourceConfig.bottomMargin,
      this.canvasI.width,
      this.canvasI.height,
      0,
      0,
      this.canvasI.width,
      this.canvasI.height
    );
  }

  clone(): Graphic {
    return new NineSlice(this.config);
  }
}
