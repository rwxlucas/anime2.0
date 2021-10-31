import { createContext, useState } from "react"

interface IUserInfo {
  phone?: string;
  description?: string;
  email?: string;
  displayName?: string;
}

interface IUserContext {
  user: IUserInfo;
  setUser: Function;
}

export const UserContext = createContext({} as IUserContext);

const UserProvider = (props: any) => {
  const [user, setUser] = useState<IUserInfo>({});
  return <UserContext.Provider value={{ user, setUser }}>
    {props.children}
  </UserContext.Provider>
}

export default UserProvider;