import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminHeader from "../AdminHeader";

const AdminPatientDashboard = () => {

  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const patientPerPage = 10;

  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {

    try {

      const response = await axios.get(
        "http://localhost:8080/healthcare/admin/patients",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPatients(response.data);

    } catch (error) {
      console.error("Error fetching patients:", error);

      if (error.response?.status === 401) {
        alert("Session Expired. Please Login Again.");
      }

    } finally {
      setLoading(false);
    }

    
  };

  const indexOfLastPatient = currentPage*patientPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientPerPage;

  const currentPatients = patients.slice(
    indexOfFirstPatient,
    indexOfLastPatient
  )

  const totalPages = Math.ceil(patients.length/patientPerPage);

  const maxVisiblePages = 3;

  let startPage = Math.max(
    1, Math.min(currentPage - 1, totalPages - maxVisiblePages + 1)
  );

  let endPage =  Math.min(totalPages, startPage + maxVisiblePages - 1);
  const pageNumbers = [];
  for(let i = startPage; i<= endPage; i++){
    pageNumbers.push(i);
  }

  return (
    <>
      <AdminHeader />

      <div className="container mt-4">

        <h2 className="mb-4">
          Patient List
        </h2>

        {loading ? (
          <h4>Loading...</h4>
        ) : (
          <table className="table table-bordered table-hover table-striped">

            <thead className="table-dark">

              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>Address</th>
                <th>Status</th>
              </tr>

            </thead>

            <tbody>

              {patients.length > 0 ? (
                currentPatients.map((patient) => (

                  <tr key={patient.id}>

                    <td>{patient.id}</td>
                    <td>{patient.firstName}</td>
                    <td>{patient.lastName}</td>
                    <td>{patient.age}</td>
                    <td>{patient.gender}</td>
                    <td>{patient.phoneNumber}</td>
                    <td>{patient.email}</td>
                    <td>{patient.address}</td>
                    <td>{patient.status || "N/A"}</td>

                  </tr>

                ))
              ) : (

                <tr>
                  <td colSpan="9" className="text-center">
                    No Patients Found
                  </td>
                </tr>

              )}

            </tbody>

          </table>
        )}
        <nav className="mt-3">
        <ul className="pagination justify-content-center">

          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </button>
          </li>

          {pageNumbers.map((page) => (
            <li
              key={page}
              className={`page-item ${currentPage === page ? "active" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            </li>
          ))}

          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </li>

        </ul>
      </nav>

      </div>
    </>
  );
};

export default AdminPatientDashboard;