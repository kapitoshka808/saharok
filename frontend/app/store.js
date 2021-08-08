import { configureStore } from "@reduxjs/toolkit"
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "reduxjs-toolkit-persist"
import autoMergeLevel1 from "reduxjs-toolkit-persist/lib/stateReconciler/autoMergeLevel1"
import storage from "./storage"
import productSlice from "../features/shop/productSlice"

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["categories"],
  stateReconciler: autoMergeLevel1,
}

const _persistedReducer = persistReducer(persistConfig, productSlice)

export const store = configureStore({
  reducer: _persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})
