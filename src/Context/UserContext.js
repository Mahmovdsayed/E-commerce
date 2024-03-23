import { createContext, useState } from "react";

export let UserContext = createContext();

export default function UserContextProvider(props) {
  const [UserToken, setUserToken] = useState(null);
  const [userData, setuserData] = useState(null);
  return (
    <UserContext.Provider
      value={{ UserToken, setUserToken, setuserData, userData }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
