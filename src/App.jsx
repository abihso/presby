import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Admin from "./modules/Admin.jsx";
import Login from "./modules/Login.jsx";
import MemberDashboard from "./modules/Member-module.jsx";
import Form from "./modules/form.jsx";
import ApplicationView from "./modules/ViewData.jsx";
import UpdateMember from "./modules/Update-member.jsx";

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/view/:infor/:pin" element={<ApplicationView />} />
        <Route path="/form" element={<Form />} />
        <Route path="/admin/dashboard" element={<Admin />} />
        <Route path="/member/dashboard" element={<MemberDashboard />} />
        <Route path="/update-member/:id" element={<UpdateMember />} />
      </Routes>
    </Router>
  );
}

export default App;