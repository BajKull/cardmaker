import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ChangeLoginStatus } from "../redux/actions/ChangeLoginStatus";
import { auth } from "./Config";

const useAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user === null) dispatch(ChangeLoginStatus("noUser"));
      else if (user) {
        dispatch(ChangeLoginStatus(user));
      }
    });
  }, [dispatch]);
};

export default useAuth;
