import * as React from "react"
  import { useState, useEffect, createContext, useContext } from "react"
import { getSyncStorage, setSyncStorage, removeSyncStorage } from "./storage";

const STORAGE_KEY = 'GITHUB_KEY'


export interface AppCredentials {
  token: string;
  repoName: string;
  workflowId: string;
  branch: string;
}

export interface CredentialState {
  cred: Partial<AppCredentials>;
  handleChange: (data: Partial<AppCredentials>) => Promise<void>
  handleRemove: () => void
}

const CredentialContext = createContext<Partial<CredentialState>>({});

export const AuthProvider: React.FC = ({ children }) => {
  const [cred, setCred] = useState<Partial<AppCredentials>>({})

  useEffect(() => {
    checkStorage();
    handleRemove()
  }, []);

  const checkStorage = async () => {
    const result = await getSyncStorage([STORAGE_KEY]);

    if (result[STORAGE_KEY]) {
      setCred(JSON.parse(result[STORAGE_KEY]))
    }
  };

  const handleChange = async (newCred: Partial<AppCredentials>) => {
    await setSyncStorage(STORAGE_KEY, JSON.stringify(newCred));
    setCred(newCred)
  };

  const handleRemove = async () => {
    await removeSyncStorage([STORAGE_KEY]);
    setCred({})
  };

  return <CredentialContext.Provider value={{ cred, handleChange, handleRemove }}> {children} </CredentialContext.Provider>
}


export const useCred = () => {
  const data = useContext(CredentialContext)
  return data
}