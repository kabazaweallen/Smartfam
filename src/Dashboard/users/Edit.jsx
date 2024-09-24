import React, { useState } from 'react'
import axiosclient from '../../axiosClient';
import Notiflix from 'notiflix';


const Edit = ({ user, openEditModel  }) => {

  const [editedUser, setEditedUser] = useState(user || {});


  const handleSave = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axiosclient.put(`/api/v1/Worker/updateWorker/${user._id}`, editedUser);
      Notiflix.Notify.success('User edited successfully');
      setTimeout(() => {
         window.location.href = "/admin/users/"

      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  
  return (
    <div className="user-modal">

      <div className="adduser-wrapper">
        <form action="" onSubmit={handleSave} >
          <div className="dead-wrapper">
            <div className="flex-direction">
              <label htmlFor="">Full Names<span>*</span></label><br />
              <input type="text" value={editedUser.fullNames || ""}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, fullNames: e.target.value })
                } />
            </div>
            <div className="flex-direction">
              <label htmlFor="">email<span>*</span></label><br />

              <input name="" id="" type="email"
                value={editedUser.email}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, email: e.target.value })
                } />
            </div>
            <div className="flex-direction">
              <label htmlFor="">Location<span>*</span></label><br />
              <input type="text"
                value={editedUser.location }
                onChange={(e) =>
                  setEditedUser({ ...editedUser, location: e.target.value })
                } />
            </div>
            <div className="flex-direction">
              <label htmlFor="">Phone Number<span>*</span></label><br />
              <input type="text"
                value={editedUser.phoneNumber}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, phoneNumber: e.target.value })
                } />
            </div>
          </div>

          <div className="add-user-btn">
            <button  type=" button" className='btn-delete' onClick={openEditModel}>Cancel</button>
            <button className='btn-edit'>
              Update
            </button>
          </div>

        </form>
      </div>


    </div>

  )
}

export default Edit