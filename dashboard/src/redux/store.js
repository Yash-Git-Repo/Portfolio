import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // default storage (localStorage)
import userSlice from "../redux/slices/userSlice";
import messageSlice from "../redux/slices/messageSlice";
import timelineSlice from "./slices/timelineSlice";
import skillSlice from "./slices/skillSlice";
import applicationSlice from "./slices/applicationSlice";
import projectSlice from "./slices/projectSlice";

const rootReducer = combineReducers({
  user: userSlice,
  message: messageSlice,
  timeline: timelineSlice,
  skills: skillSlice,
  applications : applicationSlice,
  projects: projectSlice
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export default store;
