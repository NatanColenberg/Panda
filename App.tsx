import React from "react";
import MainPage from "./components/mainPage";
import { createStore, combineReducers } from "redux";
import listsReducer from "./store/reducers/listsReducer";
import { Provider } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer } from "redux-persist";
import persistStore from "redux-persist/es/persistStore";
import { PersistGate } from "redux-persist/integration/react";

const rootReducer = combineReducers({
  lists: listsReducer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const reducer = persistReducer(persistConfig, rootReducer);

let store = createStore(reducer);
let persistor = persistStore(store);

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MainPage />
      </PersistGate>
    </Provider>
  );
}
