import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Admin from "./modules/Admin.jsx";
import Login from "./modules/Login.jsx";
import MemberDashboard from "./modules/Member-module.jsx";
import Form from "./modules/form.jsx";
import ApplicationView from "./modules/ViewData.jsx";
import UpdateMember from "./modules/Update-member.jsx";

// Simple layout wrapper (optional - only if you want shared elements)
const BasicLayout = () => {
  return (
    <div>
      {/* You can add a header/navbar here if needed */}
      <Outlet /> {/* This is where the routed content will appear */}
      {/* You can add a footer here if needed */}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Unprotected routes */}
        <Route path="/" element={<Login />} />
        <Route path="/view/:infor/:pin" element={<ApplicationView />} />
        <Route path="/form" element={<Form />} />

        {/* Protected routes with simple layout (optional) */}
        <Route element={<BasicLayout />}>
          <Route path="/admin/dashboard" element={<Admin />} />
          <Route path="/member/dashboard" element={<MemberDashboard />} />
          <Route path="/update-member/:id" element={<UpdateMember />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
