import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { movieCoreApi } from "./services/movieCore";
import movieListReducer from "./slices/movieListSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
	REGISTER
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import auth from "./slices/userSlice";

const authPersistConfig = {
  key: "auth",
  storage,
  version: 1,
};

const persistedAuthReducer = persistReducer(authPersistConfig, auth);

const rootReducer = combineReducers({
  movieListReducer,
  auth: persistedAuthReducer,
  [movieCoreApi.reducerPath]: movieCoreApi.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
	getDefaultMiddleware({
		serializableCheck: {
			ignoredActions: [
				FLUSH,
				REHYDRATE,
				PAUSE,
				PERSIST,
				PURGE,
				REGISTER,
			],
		},
	}).concat(movieCoreApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
export const persistor = persistStore(store);
