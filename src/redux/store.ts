import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import counterReducer from "../oldRedux/counter/counterSlice";
import authReducer from "./auth/authSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
