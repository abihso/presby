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
        <Route path="https://presby.onrender.com/view/:infor/:pin" element={<ApplicationView />} />
        <Route path="https://presby.onrender.com/form" element={<Form />} />
        <Route path="https://presby.onrender.com/admin/dashboard" element={<Admin />} />
        <Route path="https://presby.onrender.com/member/dashboard" element={<MemberDashboard />} />
        <Route path="https://presby.onrender.com/update-member/:id" element={<UpdateMember />} />
      </Routes>
    </Router>
  );
}

export default App;