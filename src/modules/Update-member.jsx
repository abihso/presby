import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const UpdateMember = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data,setData] = useState([])
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_HOST}/member-infor/${id}`)
      .then((res) => {
       console.log(setData(res.data[0]));
      })
      .catch((err) => console.log(err));
  }, [id])
  const handleSubmit = (e) => {
    e.preventDefault()
    const infor = new FormData(e.target)
    axios
      .post(`${import.meta.env.VITE_HOST}/update-member/${id}`, infor)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }
  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* .. */}

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
              onClick={() => navigate(-1)}
              className="modal-close"
              aria-label="Close modal"
            >
              &times;
            </a>{" "}
          </div>
          <form onSubmit={handleSubmit}>
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
                    value={data.fname}
                    onChange={(e) =>
                      setData({ ...data, fname: e.target.value })
                    }
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
                    value={data.lname}
                    onChange={(e) =>
                      setData({ ...data, lname: e.target.value })
                    }
                    name="lname"
                    className="form-control"
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="student-email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="student-email"
                    value={data.email}
                    onChange={(e) =>
                      setData({ ...data, email: e.target.value })
                    }
                    name="email"
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="student-address" className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    id="student-address"
                    value={data.address}
                    onChange={(e) =>
                      setData({ ...data, address: e.target.value })
                    }
                    name="address"
                    className="form-control"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="student-dob" className="form-label">
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="student-dob"
                  value={data.dob}
                  onChange={(e) => setData({ ...data, dob: e.target.value })}
                  name="dob"
                  className="form-control"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="student-gender" className="form-label">
                  Gender
                </label>
                <select
                  id="student-gender"
                  value={data.gender}
                  onChange={(e) => setData({ ...data, gender: e.target.value })}
                  name="gender"
                  className="form-control"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="student-className" className="form-label">
                  Assign School / Office
                </label>
                <input
                  type="text"
                  id="student-className"
                  value={data.school}
                  onChange={(e) => setData({ ...data, school: e.target.value })}
                  name="school"
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="member-contact" className="form-label">
                  Member's Contact
                </label>
                <input
                  type="tel"
                  id="member-contact"
                  value={data.number}
                  onChange={(e) => setData({ ...data, number: e.target.value })}
                  name="number"
                  className="form-control"
                  required
                />
              </div>
            </div>
            <div className="modal-footer">
              <a onClick={() => navigate(-1)} className="btn btn-secondary">
                Cancel
              </a>{" "}
              <button type="submit" className="btn btn-primary">
                Add Member
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* .. */}
    </div>
  );
};

export default UpdateMember;
