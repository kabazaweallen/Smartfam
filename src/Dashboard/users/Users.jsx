import React, { useEffect, useState } from 'react'
import './users.css'
import { FaSort } from 'react-icons/fa'
import { IoIosSearch } from "react-icons/io";
import { FaArrowUpShortWide } from "react-icons/fa6";
import Adduser from './Adduser'
import axiosclient from '../../axiosClient';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import Notiflix from 'notiflix';
import Edit from './Edit';

function Users() {
  const [modalopen, setIsModalOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [userToDelete, setUserToDelete] = useState(null)
  const [editModal, setEditModal] = useState(false)
  const [selectedUser, setselecteduser] = useState(null)
  const openModal = () => {
    setIsModalOpen(!modalopen)
  }
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axiosclient.get('/api/v1/Worker/getWorker').then(({ data }) => {
      setUsers(data.data)
      // console.log(data.data)
      setLoading(false)
    }).catch((err) => {
      setLoading(true)
    })
  }, [])


  function openEditModel() {
    setEditModal((preveditmodal) => !preveditmodal)
  }


  const openEditUserModel = (user) => {
    setselecteduser(user)
    openEditModel()

  }
  const handleConfirmDelete = async (user) => {
    try {
      Notiflix.Confirm.show(
        "Confirm delete Worker",
        "Do You want to delete",
        "yes",
        "No",
        async () => {
          const res = await axiosclient.delete(
            `/api/v1/Worker/deleteWorker/${user._id}`,


          );
          window.location.reload();
        },

      );
    } catch (error) {
      console.log(error);

    }
  };
  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    handleConfirmDelete();
  };
  const handleCancelDelete = () => {
    setShowDeleteConfirm(false)
  };
  return (
    <div className='cattles-manage-wrapper'>
      <div className="worker-container">
        <div className="worker-header">
          <h5><span>User &nbsp; </span> <span className='slash'>/</span>  &nbsp; Add Worker</h5>
          <h3>Workers</h3>
        </div>
        <div className="worker-btn">
          <button className='work-btn' onClick={openModal}>Add Worker</button>

        </div>
      </div>
      <div className="sort-by" style={{ marginTop: 50, background: "white", height: 70, borderRadius: 10 }}>

        <div className="sort-status-type1">
          <p className='sortss' style={{ textAlign: 'center', marginTop: 8, paddingLeft: 20, fontSize: 13 }}>Sort By</p>
          <button className='btn-sort1'> status <FaArrowUpShortWide /></button>
        </div>
        <div className="filter-search1">
          <IoIosSearch className='filter1' />
          <input className='input12' type="text" name='search' placeholder='Search worker by name...' />
        </div>
      </div>
      {modalopen && <Adduser openModal={openModal} />}
      {loading && (
        <div className='loading-wrapper'>
          <div className='loading-indicator'>
            <span className="loader"></span>
          </div>
        </div>
      )}
      <div className="report-table-wrapper text-left">
        <table className='tables-report'>
          <thead>
            <tr>
              <th>
                <div className="flex-th">
                  <p>Select</p>
                </div>
              </th>
              <th>
                <div className="flex-th">
                  <p>Email</p>
                  <FaSort />
                </div>
              </th>
              <th>
                <div className="flex-th">
                  <p>fullNames</p>
                  <FaSort />
                </div>
              </th>
              <th>
                <div className="flex-th">
                  <p>phoneNumber</p>
                  <FaSort />
                </div>
              </th>
              <th>
                <div className="flex-th">
                  <p>Location</p>
                  <FaSort />
                </div>
              </th>
              <th>
                <div className="flex-th">
                  <p>Actions</p>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <input type="checkbox" />
                <td>{user.email}</td>
                <td>{user.fullNames}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.location}</td>
                <div className="table-btn">
                  <button className='btn45' onClick={() => openEditUserModel(user)}>

                    <MdEdit /></button>
                  <button className='btn46' onClick={() => handleConfirmDelete(user)}><MdDelete /></button>
                </div>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
      {editModal && <Edit user={selectedUser} openEditModel={openEditModel} />}

      {showDeleteConfirm && (
        <div className="popup">
          <p>Are you sure you want to delete {userToDelete._id}?</p>
          <button onClick={handleDeleteClick}>Ok</button>
          <button onClick={handleCancelDelete}>Cancel</button>
        </div>
      )}

      
    </div>
  )
}

export default Users