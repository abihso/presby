import { useState } from "react";
import { ThemeProvider } from "../contexts/ThemeContext";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Dashboard from "../components/Dashboard";
import RegisterMember from "../components/RegisterMember";
import AdminApplications from "../components/AdminApplications";
import { useEffect } from "react";
import Claims from "./Claims";
import axios from "axios";
import AdminForm from "./Admin-Form";
import Settings from "./Settings";
const Admin = () => {
  // const [adminData,setAdminData] = useState([])
  const [modal,setModal] = useState(false)
  const [infor, setInfor] = useState(false)
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [messages, setMessage] = useState([])
  const [name, setName] = useState('')
  const [pin,setPin] = useState(1)

  const handdleSubmit = (e) => {
    e.preventDefault()
    if(title.length < 1 || body.length < 1) return alert("No message was typed")
     axios
       .post(`${import.meta.env.VITE_HOST}/add-message`, { title, body })
       .then((res) => {
         alert(res.data.message)
         setTitle("");
         setBody("");
         setModal(false);
       })
       .catch((err) => console.log(err));
  }
  
  useEffect(() => {
     axios
       .get(`${import.meta.env.VITE_HOST}/login-status`, {
         headers: {
           Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
         },
       })
       .then((res) => {
         setPin(res.data.member.pin);
         if (!res.data.authenticated) {
           window.location.href = "/";
         }
         setName(
           `${res.data.member.fname
             .charAt(0)
             .toUpperCase()}${res.data.member.lname.charAt(0).toUpperCase()}`
         );
       })
       .catch(() => (window.location.href = "/"));
     axios
       .get(
         `${import.meta.env.VITE_HOST}/get-admin-dashboard-infor`
       )
       .then((response) => {
         setInfor(response.data);
       })
       .catch((err) => console.log(err));
    axios
      .get(`${import.meta.env.VITE_HOST}/get-messages`)
      .then((res) => {
        setMessage(res.data.data);
      })
      .catch((err) => console.log(err));
  },[])
   const [activePage, setActivePage] = useState("dashboard");
   const [sidebarOpen, setSidebarOpen] = useState(false);
   
    const navItems = [
      { icon: "📊", text: "Dashboard", page: "dashboard" },
      { icon: "👨‍🎓", text: "Register", page: "register" },
      { icon: "📅", text: "Applications", page: "applications" },
      { icon: "📅", text: "Pay Claims", page: "claims" },
      { icon: "🛠 ", text: "Setting", page: "settings" },
    ];
   const stats = [
     {
       title: "Total Applications",
       value: infor.total || 0,
       change: `${infor.total || 0} `,
       trend: "up",
       icon: "👨‍🎓",
     },
     {
       title: "Pending Applications",
       value: infor.pending || 0,
       change: `${infor.pending || 0} `,
       trend: "up",
       icon: "👩‍🏫",
     },
     {
       title: "Approved Applications",
       value: infor.approved || 0,
       change: `${infor.approved || 0} `,
       trend: "up",
       icon: "🏫",
     },
     {
       title: "Rejected Applications",
       value: infor.rejected || 0,
       change: ` ${infor.rejected || 0} rejected`,
       trend: "down",
       icon: "📅",
     },
     {
       title: "Paid",
       value: infor.claimed || 0,
       change: `${infor.claimed || 0} `,
       trend: "up",
       icon: "🏫",
     },
   ];

  const quickActions = [
    { icon: "🔡 ", text: "Message", status: "message" },
    { icon: "📅", text: "Apply", status: "apply" },
  ];
      const dashboardInfo = [
        "Admin Dashboard",
        "Overview of your account",
      ];
    
   const renderPage = () => {
     switch (activePage) {
       case "dashboard":
         return (
           <Dashboard
             quickActions={quickActions}
             activities={messages}
             stats={stats}
             dashboardInfo={dashboardInfo}
             setModal={setModal}
           />
         );
       case "register":
         return <RegisterMember />;
       case "applications":
         return <AdminApplications />;
       case "settings":
         return <Settings role={"admin"} />;
       case "claims":
         return <Claims />;
       default:
         return (
           <Dashboard
             quickActions={quickActions}
             activities={messages}
             stats={stats}
             dashboardInfo={dashboardInfo}
             setModal={setModal}
           />
         );
     }
   };

   return (
     <ThemeProvider>
       {modal == "apply" ? (
         <AdminForm setModal={setModal} />
       ) : (
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
               {modal == "message" ? (
                 <div
                   className="modal"
                   id="add-student-modal"
                   role="dialog"
                   aria-labelledby="addStudentModalTitle"
                   aria-modal="true"
                 >
                   <div className="modal-content">
                     <div className="modal-header">
                       <h2 className="modal-title" id="addStudentModalTitle">
                         Message
                       </h2>
                       <a
                         onClick={() => setModal("")}
                         className="modal-close"
                         aria-label="Close modal"
                       >
                         &times;
                       </a>{" "}
                     </div>
                     <form onSubmit={handdleSubmit}>
                       <input
                         type="text"
                         className="text-center mb-2 font-bold"
                         placeholder="Title"
                         value={title}
                         onChange={(e) => setTitle(e.target.value)}
                         name="title"
                       />
                       <textarea
                         name="message"
                         value={body}
                         onChange={(e) => setBody(e.target.value)}
                       ></textarea>
                       <input
                         type="submit"
                         value="Send"
                         className="font-bold mt-2 bg-green-300 text-black "
                       />
                     </form>
                   </div>
                 </div>
               ) : (
                 renderPage()
               )}
             </main>
           </div>
         </div>
       )}
     </ThemeProvider>
   );
};

export default Admin;
