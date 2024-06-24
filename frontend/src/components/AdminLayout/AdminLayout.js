import React from 'react';
import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router-dom';

function AdminLayout() {
   return (
      <div className='container-fluid p-0'>

         <div className="row g-0">
            <div className="col-2 p-relative">
               <Navbar />
            </div>
            <div className='col-10'>
               <Outlet />
            </div>
         </div>
      </div>
   );
}

export default AdminLayout;