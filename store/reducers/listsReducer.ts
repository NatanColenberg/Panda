import PageColors from "../../colors/pageColors";
import Item from "../../types/item";
import Page from "../../types/page";
import {
  ADD_LIST,
  REMOVE_LIST,
  ADD_ITEM,
  MARK_AS_DONE,
  REMOVE_ITEM,
  EDIT_LIST_TITLE,
  EDIT_ITEM,
  CHANGE_LIST_COLOR,
} from "../actions/listsActions";

const initialState = [new Page()];

const listsReducer = (state: Page[] = initialState, action: any) => {
  let list: Page | undefined;
  let item: Item | undefined;
  switch (action.type) {
    // *** ADD_LIST ***
    case ADD_LIST:
      list = action.list;

      if (list) {
        state.push(list);
      }

      return [...state];

    // *** REMOVE_LIST ***
    case REMOVE_LIST:
      list = action.list;

      if (list) {
        state = state.filter((l) => l !== list);
      }

      return state;

    // *** EDIT_LIST_TITLE ***
    case EDIT_LIST_TITLE:
      list = action.list;
      const title = action.title;

      if (list) {
        list.title = title;
      }

      return [...state];

    // *** EDIT_LIST_TITLE ***
    case CHANGE_LIST_COLOR:
      list = action.list;
      const color = action.color;

      if (list) {
        list.colors = new PageColors(color);
      }

      return [...state];

    // *** ADD_ITEM ***
    case ADD_ITEM:
      list = action.list;
      item = action.item;

      if (list && item) {
        list?.items.push(item);
      }

      return [...state];

    // *** EDIT_ITEM ***
    case EDIT_ITEM:
      list = action.list;
      item = action.item;

      const listToUpdate = state.find((l) => l.key === list?.key);

      if (!listToUpdate)
        throw new Error(`Could not find a list with ID = ${list?.key}`);

      let itemToUpdate = listToUpdate?.items.find((i) => i.key === item?.key);

      if (!itemToUpdate)
        throw new Error(`Could not find an item with ID = ${item?.key}`);

      if (!item) throw new Error(`Must Provide a valid Item to Update`);

      itemToUpdate.title = item.title;
      itemToUpdate.note = item.note;
      itemToUpdate.isDone = item.isDone;
      itemToUpdate.images = item.images;

      return [...state];

    // *** MARK_AS_DONE ***
    case MARK_AS_DONE:
      item = action.item;
      if (item) {
        item.isDone = !item.isDone;
      }

      return [...state];

    // *** REMOVE_ITEM ***
    case REMOVE_ITEM:
      list = action.list;
      item = action.item;

      if (list && item) {
        list.items = list?.items.filter((i) => i !== item);
      }

      return [...state];

    default:
      return state;
  }
};

export default listsReducer;
