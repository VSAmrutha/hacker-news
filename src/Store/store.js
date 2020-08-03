import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import rootReducer from "./reducer";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
let pConfig = {
  key: "hacker",
  storage: storage,
  whitelist: [
    "data",
    "page",
    "totalPages",
    "hiddenElements",
    "votes",
    "changedPage",
  ],
};

let pReducer = persistReducer(pConfig, rootReducer);
let pApplyMiddle = applyMiddleware(thunk, logger);
const store = createStore(pReducer, pApplyMiddle);
const persistor = persistStore(store);
export { store, persistor };
