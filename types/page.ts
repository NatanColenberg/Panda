import "react-native-get-random-values";
import { v4 as uuid } from "uuid";
import moment from "moment";
import Item from "./item";
import PageColors from "../colors/pageColors";

export default class Page {
  key: string;
  title: string;
  date: number;
  items: Item[];
  colors: PageColors;

  constructor() {
    this.key = uuid();
    this.title = "";
    this.date = moment.now();
    this.items = [];
    this.colors = new PageColors(PageColors.getNextColor());
  }
}
