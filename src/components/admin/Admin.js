import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";



const Admin = () => {
  const navigate = useNavigate();


  const downloadXlsx = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/downloadBookings",
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Bokningar.xlsx");
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
    }
  };

return (
  <div className="container mx-auto my-6 ">
      <div className="h-12">
    <button
      onClick={() => navigate("/carList")}
      className="rounded bg-slate-600 text-white px-2 py-2 font-semibold hover:bg-slate-400"
    >
      Till Bilar
  </button>
  <button
      onClick={() => navigate("/employeeList")}
      className="rounded bg-slate-600 text-white px-2 py-2 m-1 font-semibold hover:bg-slate-400"
    >
      Till Anställda
  </button>
  
  <button
      onClick={downloadXlsx}
      className="rounded bg-slate-600 text-white px-2 py-2 m-1 font-semibold hover:bg-slate-400"
      >
        Ladda hem CSV    
  </button>

  </div>
  
</div>
)
}

export default Admin;