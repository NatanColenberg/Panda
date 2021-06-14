import "react-native-get-random-values";
import { v4 as uuid } from "uuid";
import moment from "moment";

export default class Item {
  key: string;
  title: string;
  note: string;
  date: number;
  isDone: boolean;
  images: string[];

  constructor(title: string = "") {
    this.key = uuid();
    this.title = title;
    this.note = "";
    this.date = moment.now();
    this.isDone = false;
    this.images = [];
  }
}
