import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminHeader from "../AdminHeader";

const AdminProviderDashboard = () =>{
    const [provider, setProvider] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("adminToken");

    useEffect(() =>{
        fetchProviders();
    },[]);

    const fetchProviders = async()=>{
        try{
            const response = await axios.get(
                "http://localhost:8080/healthcare/admin/providers",
                {
                    headers:{
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setProvider(response.data);
        }
        catch(error){
            console.error("Error fetching provider:", error);
            if(error.response?.status === 401){
                alert("Session expired please login again");
            }
        }
        finally{
            setLoading(false);
        }

    }

    return(
        <>
        <AdminHeader />
        <div className="container mt-4">

        <h2 className="mb-4">
          Provider List
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
                <th>Actions</th>
              </tr>

            </thead>

            <tbody>

              {provider.length > 0 ? (
                 provider.map((p) => (
                    <tr key={p.id}>
                        <td>{p.id}</td>
                        <td>{p.firstName}</td>
                        <td>{p.lastName}</td>
                        <td>{p.age}</td>
                        <td>{p.gender}</td>
                        <td>{p.phoneNumber}</td>
                        <td>{p.email}</td>
                        <td>{p.address}</td>
                        <td>{p.status}</td>
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
    )

}

export default AdminProviderDashboard;