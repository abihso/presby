import StatCard from './StatCard';
import ActivityItem from './ActivityItem';
import ActionButton from './ActionButton';
import { useEffect, useState } from 'react';
import axios from 'axios';


const Dashboard = ({ stats, activities, quickActions, dashboardInfo, setModal }) => {
  const [messageModal, setMessageModal] = useState(false)
  const [message, setMessage] = useState([])
  useEffect(() => {
   axios.get(`${import.meta.env.VITE_HOST}/login-status`, {
     headers: {
       Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
     },
   })
     .catch(() => (window.location.href = "/"));
     axios
       .get(`${import.meta.env.VITE_HOST}/get-messages`)
       .then((res) => {
         setMessage(res.data.data);
       })
       .catch((err) => console.log(err));
  }, [])
  
  const deleteMessage = (id) => {
    if (confirm("You are about to delete this message")) {
        axios
          .get(`${import.meta.env.VITE_HOST}/delete-messages/${id}`)
          .then(() => {
            window.location.href = "/admin/dashboard";
          })
          .catch((err) => console.log(err))
          .finally(() => {
                 window.location.href = "/admin/dashboard";
          })
    }
    
  }

  return (
    <div>
      {messageModal == "messages" ? (
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
                Messages
              </h2>
              <a
                onClick={() => setMessageModal(false)}
                className="modal-close"
                aria-label="Close modal"
              >
                &times;
              </a>{" "}
            </div>
            {message.map((item, index) => (
              <div key={index} className=" grid grid-flow-col border border-gray-400 p-2 ">
                <div className="col-span-10">
                  <h4 className="font-bold">{item.title}</h4>
                  <p>{item.body}</p>
                </div>
                <div onClick = {() => deleteMessage(item.id)} className =" flex col-span-2 cursor-pointer justify-center items-center " >❌ </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
      <div className="mb-6">
        <h1 className="text-2xl font-bold dark:text-text-primary-dark text-text-primary-light">
          {dashboardInfo[0]}
        </h1>
        <p className="text-sm dark:text-text-secondary-dark text-text-secondary-light">
          {dashboardInfo[1]}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Quick Actions and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <div className="dark:bg-card-dark bg-card-light rounded-xl p-4 border dark:border-border-dark border-border-light shadow-sm">
            <h2 className="text-lg font-semibold mb-4 dark:text-text-primary-dark text-text-primary-light">
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action, index) => (
                <ActionButton key={index} {...action} setModal={setModal} />
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <div className="dark:bg-card-dark bg-card-light rounded-xl p-4 border dark:border-border-dark border-border-light shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold dark:text-text-primary-dark text-text-primary-light">
                Recent Activity
              </h2>
              <a
                onClick={() => setMessageModal("messages")}
                className="text-sm text-accent cursor-pointer "
              >
                View All
              </a>
            </div>
            <div className="space-y-4">
              {activities.length > 0 ? (
                activities.map((activity, index) => (
                  <ActivityItem key={index} {...activity} />
                ))
              ) : (
                <p> No Data Available </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;