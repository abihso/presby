import { useState, useEffect } from "react";
import axios from "axios";
const Claims = () => {
  const [modal, setModal] = useState(false);
  const [data, setData] = useState(
    {
      benefit: "",
      pin : ""
    }
  )
  const [user,setUser] = useState("")
  useEffect(() => {
     axios
       .get(`${import.meta.env.VITE_HOST}/login-status`, {
         headers: {
           Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
         },
       })
       .then((res) => {
         setUser(`${res.data.member.fname} ${res.data.member.lname}`);
       })
       .catch((err) => console.log(err));
  },[])
  const handleVerifyUserClaims = (e) => {
    e.preventDefault()
    axios
      .post(`${import.meta.env.VITE_HOST}/verify-claims`,data)
      .then((res) => {
        alert(res.data.message);
        // console.log(res)
      })
      .catch((err) => {
        alert(err.response.data.message)
      });
  }
  const pay = (e) => {
    
    e.preventDefault()
    axios
      .post(
        `${import.meta.env.VITE_HOST}/pay-claims`,
        {
          pin: data.pin,
          benefit: data.benefit,
          approved_by: user,
        }
      )
      .then(() => alert(" paid ✔"))
      .catch((err) => console.log(err));

  }
  return (
    <div>
      {modal == "pay" ? (
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
                Pay
              </h2>
              <a
                onClick={() => setModal("")}
                className="modal-close"
                aria-label="Close modal"
              >
                &times;
              </a>{" "}
            </div>
            <form method="post" onSubmit={pay}>
              {" "}
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="member-contact" className="form-label">
                    Member's Pin
                  </label>
                  <input
                    type="text"
                    id="member-contact"
                    value={data.pin}
                    onChange={(e) =>
                      setData({ pin: e.target.value, benefit: data.benefit })
                    }
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="Benefits" className="form-label">
                    Benefits
                  </label>
                  <select
                    id="Benefits"
                    name="benefits"
                    value={data.benefit}
                    onChange={(e) =>
                      setData({ benefit: e.target.value, pin: data.pin })
                    }
                    className="form-control"
                    required
                  >
                    <option value="">Select benefit</option>
                    <option value="death of spouse">Death of spouse</option>
                    <option value="death of child">Death of Child</option>
                    <option value="death of member">Death of Member</option>
                    <option value="marriage">Wedding/Marriage</option>
                    <option value="hospitalization">Hospitalization</option>
                    <option value="retirement">Retirement</option>
                    <option value="release">Release</option>
                    <option value="death of parent">Death of Parent</option>
                    <option value="disaster">Disaster</option>
                    <option value="wrongful deduction">
                      Wrongful Deduction
                    </option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <input type="submit" value="Pay" />
              </div>
            </form>
          </div>
        </div>
      ) : null}
      <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-6">
        <div>
          <h1 className="text-2xl font-bold dark:text-text-primary-dark text-text-primary-light">
            Pay Claims
          </h1>
          <p className="text-sm dark:text-text-secondary-dark text-text-secondary-light">
            Record and track all payments made
          </p>
        </div>
      </div>
      <div className="flex justify-center items-center min-h-48">
        <div>
          <h4>Verify if payments has already been made</h4>
          <div>
            <form onSubmit={handleVerifyUserClaims}>
              <input
                type="text"
                name="pin"
                value={data.pin}
                onChange={(e) =>
                  setData({ pin: e.target.value, benefit: data.benefit })
                }
                className="mt-3"
                placeholder="PIN"
              />
              <select
                value={data.benefit}
                onChange={(e) =>
                  setData({ benefit: e.target.value, pin: data.pin })
                }
                name="benefit"
                className="mt-2"
              >
                <option value="">Select benefit</option>
                <option value="death of spouse">Death of spouse</option>
                <option value="death of child">Death of Child</option>
                <option value="death of member">Death of Member</option>
                <option value="marriage">Wedding/Marriage</option>
                <option value="hospitalization">Hospitalization</option>
                <option value="retirement">Retirement</option>
                <option value="release">Release</option>
                <option value="death of parent">Death of Parent</option>
                <option value="disaster">Disaster</option>
                <option value="wrongful deduction">Wrongful Deduction</option>
              </select>
              <input
                type="submit"
                value="Verify"
                className="bg-green-200 mt-2 text-black font-bold hover:bg-green-300"
              />
            </form>
            <input
              onClick={() => setModal("pay")}
              type="button"
              className="bg-yellow-200 mt-2 text-black font-bold hover:bg-green-300 "
              value="Process Claims"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Claims;