  import { useEffect, useState } from "react";
  import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
  import Loader from "../../components/Loader";
  import { toast } from "react-toastify";
  import {
    useDeleteUserMutation,
    useGetUsersQuery,
    useUpdateUserMutation,
  } from "../../redux/api/usersApiSlice";
  import Message from '../../components/Message.jsx'
  import AdminMenu from "./AdminMenu.jsx";

  const UserList = () => {

    const { data: users, refetch, isLoading, error } = useGetUsersQuery();

    const [deleteUser] = useDeleteUserMutation();

    const [editableUserId, setEditableUserId] = useState(null);
    const [editableUserName, setEditableUserName] = useState("");
    const [editableUserEmail, setEditableUserEmail] = useState("");

    const [updateUser] = useUpdateUserMutation();

    useEffect(() => {
      refetch();
    }, [refetch]);

    const deleteHandler = async (id) => {
      if (window.confirm("Are you sure")) {
        try {
          await deleteUser(id);
          refetch();
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }
      }
    };

    // const toggleAdminStatusHandler = async (id, currentAdminStatus) => {
    //   const action = currentAdminStatus ? "demote" : "promote";
    //   const confirmation = window.confirm(`Are you sure you want to ${action} this user?`);
    
    //   if (confirmation) {
    //     try {
    //       const response = await updateUser({ userId: id, isAdmin: !currentAdminStatus });
    //       if (response?.data) {
    //         toast.success(
    //           currentAdminStatus ? "User demoted from admin" : "User promoted to admin"
    //         );
    //         refetch();
    //       }
    //     } catch (err) {
    //       toast.error(err?.data?.message || err.error);
    //     }
    //   }
    // };

    return (
      <div className="pl-[10rem] mt-[5rem] flex-col items-center">
        <AdminMenu/>
        <h1 className="text-2xl font-semibold mb-4">Users</h1>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <div className="flex flex-col md:flex-row">
            {/* <AdminMenu /> */}
            <table className="w-full md:w-5/5">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left">ID</th>
                  <th className="px-4 py-2 text-left">NAME</th>
                  <th className="px-4 py-2 text-left">EMAIL</th>
                  <th className="px-4 py-2 text-left">ADMIN</th>
                  <th className="px-4 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td className="px-4 py-2">{user._id}</td>
                    <td className="px-4 py-2">
                        
                        <div className="flex items-center">
                          {user.username}
                        </div>
                    </td>
                    <td className="px-4 py-2">
                        <div className="flex items-center">
                          {user.email}
                        </div>
                    </td>
                    <td className="px-4 py-2">
                      {user.isAdmin ? (
                        <FaCheck
                          style={{ color: "green", cursor: "pointer" }}
                          onClick={() => toggleAdminStatusHandler(user._id, user.isAdmin)}
                        />
                      ) : (
                        <FaTimes
                          style={{ color: "red", cursor: "pointer" }}
                          onClick={() => toggleAdminStatusHandler(user._id, user.isAdmin)}
                        />
                      )}
                    </td>
                    <td className="px-4 py-2">
                      {!user.isAdmin && (
                        <div className="flex">
                          <button
                            onClick={() => deleteHandler(user._id)}
                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    )
  }

  export default UserList
