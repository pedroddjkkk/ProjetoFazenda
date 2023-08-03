import { useEffect, useState } from "react";
import { Outlet, redirect } from "react-router";
import api from "./api";

export default function Validator() {
  const [user, setUser] = useState();
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (localUser) {
      setUser(JSON.parse(localUser));
    }
    validateUser(JSON.parse(localUser));
  }, []);

  const validateUser = async (user) => {
    const response = await api.get("tab_user", null, user);
    console.log(response);
    if (response.data.length > 0) {
      setValidated(true);
      return true;
    } else {
      setValidated(false);
      return false;
    }
  };

  if (validated) {
    return <Outlet />;
  } else {
    return <></>;
  }
}
