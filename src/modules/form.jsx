import { GiCheckMark } from "react-icons/gi";
import axios from "axios";
import presbyImage from "../assets/icons/presby.jpg";
import { useState, useEffect } from "react";

const Form = () => {
    const [userData,setUserData] = useState({})
    let capitalize = (word) => {
      return word
        .split(" ")
        .map((str) => str.charAt(0).toUpperCase() + str.slice(1))
        .join(" ");
  };
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_HOST}/login-status`, {
        headers: {
          "Authorization" : `Bearer ${localStorage.getItem("token") || ""}`
        }
      })
      .then((res) => {
        if (res.data.authenticated) {
          res.data.member.fname = capitalize(res.data.member.fname);
          res.data.member.lname = capitalize(res.data.member.lname);
          setUserData(res.data.member);
        } else {
          throw new Error("Failed to authenticate user");
        }
        console.log(res)
      })
      .catch(() => (window.location = "/"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData(e.target);
      data.append("applicant", userData.memberpin);
      const response = await axios.post(
        `${import.meta.env.VITE_HOST}/register-benefit`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.success) {
          alert(response.data.message);
      } else {
        throw new Error("There was problem saving record")
      }
      // window.location.href = "/form";
    } catch (err) {
      console.log(err)
      alert(err.message|| "An error occurred");
    }
  };

  const benefitOptions = [
    { id: "release", value: "release", label: "Release" },
    { id: "retirement", value: "retirement", label: "Retirement" },
    { id: "dop", value: "death of parent", label: "Death of Parent" },
    {
      id: "death_of_spouse",
      value: "death of spouse",
      label: "Death of Spouse",
    },
    { id: "death_of_child", value: "death of child", label: "Death of Child" },
    {
      id: "death_of_member",
      value: "death of member",
      label: "Death of Member",
    },
    { id: "marriage", value: "marriage", label: "Wedding/Marriage" },
    {
      id: "Hospitalization",
      value: "hospitalization",
      label: "Hospitalization",
    },
    { id: "Disaster", value: "disaster", label: "Disaster" },
    {
      id: "Wrongful",
      value: "wrongful deduction",
      label: "Wrongful Deduction",
    },
  ];

  const renderFormHeader = () => (
    <div className="text-center mb-6">
      <p className="font-bold text-2xl md:text-3xl">GHANA EDUCATION SERVICE</p>
      <p className="font-bold text-xl md:text-lg">
        PRESBYTERIAN EDUCATION UNIT
      </p>
      <p className="font-bold text-xl md:text-lg">ASHANTI WELFARE</p>
      <p className="font-bold text-xl md:text-lg">(PEUAW)</p>
      <div className="flex justify-center h-20 my-2">
        <img
          src={presbyImage}
          alt="Presbyterian Education Unit Logo"
          className="h-full"
        />
      </div>
      <p className="font-bold text-xl md:text-3xl">WELFARE APPLICATION FORM</p>
      <p className="font-bold text-xl md:text-lg">PERSONAL INFORMATION</p>
    </div>
  );

  const renderPersonalInfoFields = () => (
    <>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-12">
        <div className="md:col-span-6">
          <label htmlFor="surname" className="block mb-1">
            Surname:
          </label>
          <input
            type="text"
            id="surname"
            name="surname"
            readOnly
            value={userData.fname}
            required
            placeholder="e.g. Kofi"
            className="w-full p-2 border-b border-dashed border-black focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="md:col-span-6">
          <label htmlFor="firstname" className="block mb-1">
            Other Names:
          </label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            readOnly
            value={userData.lname}
            required
            placeholder="e.g. Adam"
            className="w-full p-2 border-b border-dashed border-black focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-12 mt-4">
        <div className="md:col-span-6">
          <label htmlFor="address" className="block mb-1">
            Address:
          </label>
          <input
            type="text"
            id="address"
            name="address"
            readOnly
            value={userData.address}
            required
            placeholder="Asokwa road gta78"
            className="w-full p-2 border-b border-dashed border-black focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="md:col-span-6">
          <label htmlFor="email" className="block mb-1">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            readOnly
            value={userData.email}
            required
            placeholder="e.g. example@domain.com"
            className="w-full p-2 border-b border-dashed border-black focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-12 mt-4">
        <div className="md:col-span-6">
          <label htmlFor="saddress" className="block mb-1">
            Current School / Office and Address:
          </label>
          <input
            type="text"
            id="saddress"
            name="saddress"
            required
            placeholder="Asokwa primary"
            className="w-full p-2 border-b border-dashed border-black focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="md:col-span-6">
          <label htmlFor="date" className="block mb-1">
            Date:
          </label>
          <input
            type="date"
            id="date"
            name="date"
            required
            className="w-full p-2 border-b border-dashed border-black focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>
    </>
  );

  const renderBenefitOptions = () => (
    <div className="mt-6">
      <p className="text-lg font-bold mb-2">TYPES OF WELFARE BENEFIT</p>
      <p className="flex items-center mb-3">
        Please tick (<GiCheckMark className="mx-1" />) the preferred benefit
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {benefitOptions.map((option) => (
          <label
            key={option.id}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <input
              type="radio"
              id={option.id}
              name="benefit"
              value={option.value}
              className="h-4 w-4"
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );

  const renderAttachmentsNote = () => (
    <div className="mt-6">
      <p className="mb-2">
        <span className="underline font-bold">Note</span> (Attachment to claims)
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          Release / Retirement letter: One(1) Photocopy(Your 1<sup>st</sup>{" "}
          deducted payslip) and one most current payslip.
        </li>
        <li>
          Deaths / Wedding / Marriage: One (1) year old payslip. One most
          current payslip and one invitation card.
        </li>
        <li>
          Hospitalization: One (1) year old payslip, One most current payslip,
          receipts and Doctors report.
        </li>
        <li>
          Disaster: One (1) year old payslip, One most current payslip, pictures
          of the scene, NADMO or Police report.
        </li>
        <li>Wrongful / Double Deduction: All affected payslip.</li>
      </ul>

      <p className="mt-3">
        <span className="text-red-700 font-bold text-xl">*</span> For release
        benefits, indicate your previous and current school:
      </p>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-12 mt-3">
        <div className="md:col-span-6">
          <label htmlFor="pschool" className="block mb-1">
            Previous School / Office :
          </label>
          <input
            type="text"
            id="pschool"
            name="pschool"
            placeholder="Asokwa primary"
            className="w-full p-2 border-b border-dashed border-black focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="md:col-span-6">
          <label htmlFor="cschool" className="block mb-1">
            Current School / Office :
          </label>
          <input
            type="text"
            id="cschool"
            name="cschool"
            className="w-full p-2 border-b border-dashed border-black focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );

  const renderRecommendationSection = () => (
    <div className="mt-6">
      <div className="grid gap-4 grid-cols-1 md:grid-cols-12 mt-4">
        <div className="md:col-span-6">
          <label htmlFor="TelApplicant" className="block mb-1">
            Applicant's Tel:
          </label>
          <input
            type="text"
            id="TelApplicant"
            name="TelApplicant"
            readOnly
            value={userData.number}
            max={14}
            required
            className="w-full p-2 border-b border-dashed border-black focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="md:col-span-6">
          <label htmlFor="TelHeadteacher" className="block mb-1">
            Headteacher's Tel:
          </label>
          <input
            type="tel"
            id="TelHeadteacher"
            name="TelHeadteacher"
            max={14}
            required
            className="w-full p-2 border-b border-dashed border-black focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-12 mt-4">
        <div className="md:col-span-6">
          <label htmlFor="oldpayslip" className="block mb-1">
            Old Payslip :
          </label>
          <input
            type="file"
            id="oldpayslip"
            name="oldpayslip"
            required
            className="w-full p-2 border border-dashed border-black rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="md:col-span-6">
          <label htmlFor="currentpayslip" className="block mb-1">
            Current Payslip:
          </label>
          <input
            type="file"
            id="currentpayslip"
            name="currentpayslip"
            required
            className="w-full p-2 border border-dashed border-black rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="md:col-span-6">
          <label htmlFor="supportdocuments" className="block mb-1">
            Supporting Documents:
          </label>
          <input
            type="file"
            id="supportdocuments"
            name="supportdocuments"
            required
            className="w-full p-2 border border-dashed border-black rounded focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );

  const renderFormActions = () => (
    <div className="flex justify-center gap-4 mt-6">
      <button
        type="submit"
        className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
      >
        Submit
      </button>
      <button
        type="button"
        onClick={() => window.history.back()}
        className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Go Back
      </button>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Mobile View */}
      <div className="md:hidden border-2 border-black p-4 rounded-lg">
        {renderFormHeader()}
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {renderPersonalInfoFields()}
          {renderBenefitOptions()}
          {renderAttachmentsNote()}
          {renderRecommendationSection()}
          {renderFormActions()}
        </form>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block border-4 border-gray-400 rounded-lg p-6">
        {renderFormHeader()}
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="space-y-6"
        >
          {renderPersonalInfoFields()}
          {renderBenefitOptions()}
          {renderAttachmentsNote()}
          {renderRecommendationSection()}
          {renderFormActions()}
        </form>
      </div>
    </div>
  );
};

export default Form;
