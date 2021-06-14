import Color from "color";

export default class PageColors {
  private static hue = 0;
  private static FIRST_COLOR = "#d17b88";
  private static HUE_JUMP = 47;

  public PRIMARY: string;
  public PRIMARY_LIGHT_1: string;
  public PRIMARY_LIGHT_2: string;
  public PRIMARY_DARK_1: string;
  public PRIMARY_DARK_2: string;
  public PRIMARY_GRADIENT: string[];
  public DISABLED: string;
  public DANGER: string;

  constructor(primary: string) {
    const shade1 = 0.4;
    const shade2 = 0.8;
    const shade_soft = 0.07;
    this.PRIMARY = primary;
    this.PRIMARY_LIGHT_1 = Color(primary).lighten(shade1).hex();
    this.PRIMARY_LIGHT_2 = Color(primary).lighten(shade2).hex();
    this.PRIMARY_DARK_1 = Color(primary).darken(shade1).hex();
    this.PRIMARY_DARK_2 = Color(primary).darken(shade2).hex();

    const primarySoftDarkShade = Color(primary).darken(shade_soft).hex();
    this.PRIMARY_GRADIENT = [primarySoftDarkShade, primary];
    this.DISABLED = "#555";
    this.DANGER = "red";
  }

  public static getNextColor = () => {
    const res = Color(PageColors.FIRST_COLOR).hue(PageColors.hue).hex();
    PageColors.hue += PageColors.HUE_JUMP;
    return res;
  };

  public static getColors = (num: number) => {
    let hue = 0;
    const res: string[] = [];
    for (let i = 0; i < num; i++) {
      res.push(Color(PageColors.FIRST_COLOR).hue(hue).hex());
      hue += PageColors.HUE_JUMP;
    }

    return res;
  };
}
