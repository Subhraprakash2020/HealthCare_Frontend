import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminHeader from "../AdminHeader";

const AdminPatientDashboard = () => {

  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

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
                patients.map((patient) => (

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

      </div>
    </>
  );
};

export default AdminPatientDashboard;