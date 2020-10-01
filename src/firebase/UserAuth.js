import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ChangeLoginStatus } from "../redux/actions/ChangeLoginStatus";
import { auth } from "../firebase/Config";

const useAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(ChangeLoginStatus(user));
      }
    });
  }, [dispatch]);
};

export default useAuth;
