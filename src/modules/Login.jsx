import { useState } from 'react';
import axios from 'axios';
const Login = () => {
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [role, setRole] = useState("");
    const handleSubmit = (e) => {
      e.preventDefault();
      if (role.length < 3)
        return setTimeout(() => {
          setError("please select your role ");
          setTimeout(() => {
            setError(false);
          }, 3000);
        }, 100);
      const data = new FormData(e.target);
      axios
        .post(`${import.meta.env.VITE_HOST}/${role}-login`, data)
        .then((res) => {
          // setSuccess("Login successfull");
          localStorage.setItem("token",res.data.token)
          if (res.data.status == "member") {
              window.location.href = `/member/dashboard`;
          } else {
             window.location.href = `/admin/dashboard`;
          }

          // setTimeout(() => {
          //   window.location.href = `/${role}/dashboard`;
          // }, 4000);
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          setTimeout(() => {
            setError(false);
          }, 4000);
        });
    };
  return (
    <div
      className="modal"
      id="add-teacher-modal"
      role="dialog"
      aria-labelledby="addteacherModalTitle"
      aria-modal="true"
    >
      {error ? (
        <div className="fixed flex justify-center items-center top-5 left-0 right-0">
          <div className=" min-h-10 p-2 bg-red-400 text-white font-bold rounded-md ">
            {error}
          </div>
        </div>
      ) : null}
      {success ? (
        <div className="fixed flex justify-center items-center top-5 left-0 right-0">
          <div className=" min-h-10 p-2 bg-green-400 text-white font-bold rounded-md ">
            {success}
          </div>
        </div>
      ) : null}
      <div className="modal-content">
        <div className="modal-header">Login Page</div>
        <form onSubmit={handleSubmit}>
          {" "}
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="pin" className="form-label">
                Pin
              </label>
              <input
                type="text"
                id="pin"
                name="email"
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input type="password" name="password" />
            </div>
          </div>
          <div className="grid justify-start  ">
            <p>Who is logging in?</p>
            <div className="flex gap-5 mb-5">
              <span className="grid justify-center">
                admin{" "}
                <input
                  type="radio"
                  value={role}
                  onClick={() => setRole("admin")}
                  name="role"
                />
              </span>
              <span className="grid justify-center">
                Member{" "}
                <input
                  type="radio"
                  value={role}
                  onClick={() => setRole("member")}
                  name="role"
                />
              </span>
            </div>
          </div>
          <div className="modal-footer">
            <button type="reset" className="btn btn-secondary">
              Cancel
            </button>{" "}
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login