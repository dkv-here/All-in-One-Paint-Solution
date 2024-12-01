import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import Loader from "../../components/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { Link } from "react-router-dom";
import { useProfileMutation } from "../../redux/api/usersApiSlice";


const Profile = () => {

  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

    useEffect(() => {
      setUserName(userInfo.username);
      setEmail(userInfo.email);
    }, [userInfo.email, userInfo.username]);

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          username,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Profile updated successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };


  return (
    <div className="container mx-auto p-4 mt-[4rem] max-w-md">
      <div className="flex justify-center align-center md:flex md:space-x-4 flex-col items-center">
        <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>

        <form onSubmit={submitHandler} className="w-full">
              <div className="mb-4">
                <label className="block text-black mb-2">Name</label>
                <input
                  type="text"
                  placeholder="Enter name"
                  className="form-input p-3 rounded-md w-full bg-[rgba(182,182,182,0.22)]"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="block text-black mb-2">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter email"
                  className="form-input p-4 rounded-md w-full bg-[rgba(182,182,182,0.22)]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="block text-black mb-2">Password</label>
                <input
                  type="password"
                  placeholder="Enter password"
                  className="form-input p-4 rounded-md w-full bg-[rgba(182,182,182,0.22)]"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="block text-black mb-2">Confirm Password</label>
                <input
                  type="password"
                  placeholder="Confirm password"
                  className="form-input p-4 rounded-md w-full bg-[rgba(182,182,182,0.22)]"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-[rgb(93,0,124)] text-white py-2 px-4 rounded hover:bg-[rgb(74,0,98)]"
                >
                  Update
                </button>

                <Link
                  to="/user-orders"
                  className="bg-[rgb(93,0,124)] text-white py-2 px-4 rounded hover:bg-[rgb(74,0,98)]"
                >
                  My Orders
                </Link>
              </div>
              {loadingUpdateProfile && <Loader />}
          </form>
      </div>
    </div>
  )
}

export default Profile
