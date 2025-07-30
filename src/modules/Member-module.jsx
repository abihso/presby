import { ThemeProvider } from "../contexts/ThemeContext";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import DashboardMember from "../components/Dashboard-member";
import MemberApplications from "../components/Applications-member";
import Settings from "./Settings";
import { useState, useEffect } from "react";
import axios from "axios";
const MemberDashboard = () => {
  const [activePage, setActivePage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [messages, setMessage] = useState([]);
  const [name,setName] = useState('')
  const [pin,setPin] = useState(1)
    const [infor, setInfor] = useState({});
      useEffect(() => {
        axios
          .get(`${import.meta.env.VITE_HOST}/login-status`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
            },
          })
          .then((res) => {
             setPin(res.data.member.memberpin);
            setName(
              `${res.data.member.fname.charAt(0).toUpperCase()}${res.data.member.lname
                .charAt(0)
                .toUpperCase()}`
            )
            axios
              .get(
                `${import.meta.env.VITE_HOST}/get-member-dashboard-infor/${res.data.member.memberpin}`
              )
              .then((response) => {
                setInfor(response.data);
              }).catch(err => console.log(err));
          })
          .catch(() => window.location.href = "/");
            axios
              .get(`${import.meta.env.VITE_HOST}/get-messages`)
              .then((res) => {
                setMessage(res.data.data);
              })
              .catch((err) => console.log(err));
      }, []);

      const dashboardInfo = [
        "My Dashboard",
        "Overview of your account",
      ];
      const navItems = [
        { icon: "📊", text: "Dashboard", page: "dashboard" },
        { icon: "📝", text: "Applications", page: "apply" },
        { icon: "🛠 ", text: "Settings", page: "settings" },
      ];
       const stats = [
         {
           title: "Total Applications",
           value: infor.total || 0,
           change: "12%",
           trend: "up",
           icon: "👨‍🎓",
         },
         {
           title: "Pending Applications",
           value: infor.pending || 0,
           change: "3 new",
           trend: "up",
           icon: "👩‍🏫",
         },
         {
           title: "Approved Applications",
           value: infor.approved || 0,
           change: "5 new",
           trend: "up",
           icon: "🏫",
         },
         {
           title: "Rejected Applications",
           value: infor.rejected || 0,
           change: `${infor.rejected || 0} rejected `,
           trend: "down",
           icon: "📅",
         },
       ];

  

       const quickActions = [
         { icon: "👨‍🎓", text: "Total Applications", link: "#students/add" },
         { icon: "👩‍🏫", text: "Pending Applications", link: "#teachers/add" },
         { icon: "📅", text: "Approved Applications", link: "#attendance/take" },
         { icon: "💰", text: "Rejected Applications", link: "#finance/collect" },
  ];

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return (
          <DashboardMember
            quickActions={quickActions}
            activities={messages}
            stats={stats}
            dashboardInfo={dashboardInfo}
          />
        );
      case "apply":
        return <MemberApplications />;
      case "settings":
        return <Settings role={"member"} />;
      default:
        return (
          <DashboardMember
            quickActions={quickActions}
            activities={messages}
            stats={stats}
            dashboardInfo={dashboardInfo}
          />
        );
    }
  };

  return (
    <ThemeProvider>
      <div className="flex flex-col min-h-screen dark:bg-primary-dark bg-primary-light">
        <Header
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          name={name}
          pin={pin}
        />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar
            activePage={activePage}
            setActivePage={setActivePage}
            sidebarOpen={sidebarOpen}
            closeSidebar={() => setSidebarOpen(false)}
            navItems={navItems}
          />
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            {renderPage()}
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default MemberDashboard;
  