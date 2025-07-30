import axios from "axios";
import { useState,useEffect } from "react";
const Settings = ({role}) => {
    const [pin, setPin] = useState(1);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_HOST}/login-status`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
      },
    }).then((res) => {
      setPin(res.data.member.pin || res.data.member.memberpin);
    })
  },[])
  const [modal,setModal] = useState(false)
  const handleChangePassword = (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    data.append("pin", pin);
    data.append("role", role);
    axios
      .post(`${import.meta.env.VITE_HOST}/update-password`,data)
      .then((res) => {
        alert(res.data.message)
      })
      .catch((err) => {
        alert(`${err.response.data.message}`)
      });
  }

  const addAdmin = (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    axios
      .post(`${import.meta.env.VITE_HOST}/register`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        alert(`${res.data.data.fname} ${res.data.data.lname} record has been saved`)
      })
      .catch((err) => {
        alert(`${err.response.data.error || err.response.data.message}`);
      });
  }

  return (
    <div>
      {modal ? (
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
                Add New Member
              </h2>
              <a
                onClick={() => setModal((pre) => !pre)}
                className="modal-close"
                aria-label="Close modal"
              >
                &times;
              </a>{" "}
            </div>
            <form onSubmit={addAdmin}>
              {" "}
              <div className="modal-body">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="student-first-name" className="form-label">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="student-first-name"
                      name="fname"
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="student-last-name" className="form-label">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="student-last-name"
                      name="lname"
                      className="form-control"
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="student-email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="student-email"
                    name="email"
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="member-contact" className="form-label">
                    Member's Pin
                  </label>
                  <input
                    type="text"
                    id="member-contact"
                    name="pin"
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="Admin-pic" className="form-label">
                    Picture
                  </label>
                  <input
                    type="file"
                    id="Admin-pic"
                    name="img"
                    className="form-control"
                    required
                  />
                </div>
              </div>
              <div className="modal-footer">
                <a
                  onClick={() => setModal((pre) => !pre)}
                  className="btn btn-secondary"
                >
                  Cancel
                </a>{" "}
                <button type="submit" className="btn btn-primary">
                  Add Member
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
      <div className="flex justify-between">
        <div>
          <h3 className="font-bold text-2xl">Settings</h3>
          <p>User settings</p>
        </div>
        <div>
          {role == "admin" && (
            <button
              onClick={() => setModal((pre) => !pre)}
              className="bg-cyan-500 p-2 font-bold text-black"
            >
              Add Admin
            </button>
          )}
        </div>
      </div>
      <div className="mt-4">
        <p>Change password</p>
        <form onSubmit={handleChangePassword}>
          <input
            type="password"
            name="oldpassword"
            placeholder="Old Password"
            className="w-3/5 mt-2"
          />{" "}
          <br />
          <input
            type="password"
            name="newpassword"
            placeholder="New Password"
            className="w-3/5 mt-2"
          />{" "}
          <br />
          <input
            type="password"
            name="comfirmpassword"
            placeholder="Comfirm password"
            className="w-3/5 mt-2"
          />{" "}
          <br />
          <input type="submit" className="w-3/5 mt-2" />
        </form>
      </div>
    </div>
  );
};

export default Settings;