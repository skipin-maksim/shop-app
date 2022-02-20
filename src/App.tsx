import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import ClientDashboard from "./pages/Dashboards/ClientDashboard/ClientDashboard";
import OwnerDashboard from "./pages/Dashboards/OwnerDashboard/OwnerDashboard";
import Unauthorized from "./pages/Unauthorized/Unauthorized";
import LayOut from "./components/LayOut/LayOut";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import SignInPage from "./pages/SignInPage/SignInPage";
import Page404 from "./pages/Page404/Page404";

import { initTheme } from "./helpers/layoutHelpers";
import { userTypes } from "./common/constants/userTypes";
import useRedirectForRole from "./hooks/useRedirectForRole";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";

function App() {
  const { authUserStatus } = useRedirectForRole();

  useEffect(() => {
    initTheme();
  }, []);

  return (
    <div className="App">
      {authUserStatus && (
        <Routes>
          <Route path={"/"} element={<LayOut />}>
            <Route
              path={"client"}
              element={<RequireAuth allowedUserRoles={[userTypes.CLIENT]} />}
            >
              <Route path={"dashboard"} element={<ClientDashboard />} />
            </Route>

            <Route
              path={"owner"}
              element={<RequireAuth allowedUserRoles={[userTypes.OWNER]} />}
            >
              <Route path={"dashboard"} element={<OwnerDashboard />} />
            </Route>
          </Route>

          <Route path={"*"} element={<Page404 />} />
          <Route path={"/unauthorized"} element={<Unauthorized />} />
          <Route path={"/registration"} element={<RegistrationPage />} />
          <Route path={"/sign-in"} element={<SignInPage />} />
        </Routes>
      )}

      {!authUserStatus && <div>Loading...</div>}
    </div>
  );
}

export default App;
