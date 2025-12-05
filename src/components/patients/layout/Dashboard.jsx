import React, { useEffect, useState } from "react";
import Header from "./Header";
import Message from "../../common/Message";

function Dashboard() {
  const[message, setMessage] = useState();
  useEffect(() =>{
    const showMessage = () => {
      const msg = sessionStorage.getItem('loginMessage');
      if(msg){
        setMessage(msg);
        sessionStorage.removeItem('loginMessage');
        setTimeout(() => setMessage(null), 3000);
      }
    };
    showMessage();
  },[]);
  // const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <Header></Header>
      <div>
        {message && (
          <Message 
            variant="success"
            message={message}
            onClose={() => setMessage(null)}
          />
        )}

        <h1>Dashboard</h1>
      </div>
    </div>
  );
}

export default Dashboard;
