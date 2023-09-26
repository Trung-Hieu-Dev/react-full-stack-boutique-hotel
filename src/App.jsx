import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import GlobalStyles from "../src/styles/GlobalStyles.js";

// layout
import AppLayout from "../src/ui/AppLayout.jsx";

// pages
import Dashboard from "../src/pages/Dashboard.jsx";
import Login from "../src/pages/Login.jsx";
import PageNotFound from "../src/pages/PageNotFound.jsx";
import Settings from "../src/pages/Settings.jsx";
import Users from "../src/pages/Users.jsx";
import Account from "../src/pages/Account.jsx";
import Bookings from "../src/pages/Bookings.jsx";
import Cabins from "../src/pages/Cabins.jsx";

function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="cabins" element={<Cabins />} />
            <Route path="users" element={<Users />} />
            <Route path="settings" element={<Settings />} />
            <Route path="account" element={<Account />} />
          </Route>

          <Route path="login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
