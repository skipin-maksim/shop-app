import React, { useCallback, useEffect } from "react";
import { checkUserSignIn } from "./redux/auth/authOperations";
import { useAppDispatch } from "./redux/hooks";
import SignInPage from "./pages/SignInPage/SignInPage";

function App() {
  const dispatch = useAppDispatch();

  const onCheckAuthUser = useCallback(() => {
    dispatch(checkUserSignIn());
  }, [dispatch]);

  useEffect(() => {
    onCheckAuthUser();
  }, [onCheckAuthUser]);

  return (
    <div className="App">
      <header className="App-header">Header</header>
      <SignInPage />
    </div>
  );
}

export default App;
