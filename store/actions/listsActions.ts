import Item from "../../types/item";
import Page from "../../types/page";

export const ADD_LIST = "ADD_LIST";
export const REMOVE_LIST = "REMOVE_LIST";
export const EDIT_LIST_TITLE = "EDIT_LIST_TITLE";
export const CHANGE_LIST_COLOR = "CHANGE_LIST_COLOR";
export const ADD_ITEM = "ADD_ITEM";
export const EDIT_ITEM = "EDIT_ITEM";
export const MARK_AS_DONE = "MARK_AS_DONE";
export const REMOVE_ITEM = "REMOVE_ITEM";

export const addList = (list: Page) => {
  return { type: ADD_LIST, list };
};

export const removeList = (list: Page) => {
  return { type: REMOVE_LIST, list };
};

export const editListTitle = (list: Page, title: string) => {
  return { type: EDIT_LIST_TITLE, list, title };
};

export const changeColor = (list: Page, color: string) => {
  return { type: CHANGE_LIST_COLOR, list, color };
};

export const addItem = (list: Page, item: Item) => {
  return { type: ADD_ITEM, list, item };
};

export const editItem = (list: Page, item: Item) => {
  return { type: EDIT_ITEM, list, item };
};

export const markAsDone = (item: Item) => {
  return { type: MARK_AS_DONE, item };
};

export const removeItem = (list: Page, item: Item) => {
  return { type: REMOVE_ITEM, list, item };
};
