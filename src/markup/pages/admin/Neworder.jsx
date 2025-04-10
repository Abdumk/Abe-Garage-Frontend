import React from 'react'
import AdminMenu from '../../../markup/components/Admin/AdminMenu/AdminMenu'

function Neworder() {
  return (

    <div>
    <div className="container-fluid admin-pages">
      <div className="row">
        <div className="col-md-3 admin-left-side">
          <AdminMenu />
        </div>
        <div className="col-md-9 admin-right-side">
        <h1>Neworder</h1>

        </div>
      </div>
    </div>
  </div>
  
  )
}

export default Neworder