import * as React from "react"
  import { useState, useEffect, createContext, useContext } from "react"
import { auth, databaseRef } from "../../background_script/firebase";
import { getSyncStorage, setSyncStorage, removeSyncStorage , Reset} from "./storage";

const STORAGE_KEY = 'GITHUB_KEY'

export interface AppCredentials {
  token: string;
  UserId: string;
  repoName: string;
  workflowId: string;
  branch: string;
}

export interface CredentialState {
  cred: Partial<AppCredentials>;
  handleChange: (data: Partial<AppCredentials>) => Promise<void>
  handleback : () => void
  handleRemove: () => void
  setCred: () => void
  handleReset : (keys:any) =>void
}

const CredentialContext = createContext<Partial<CredentialState>>({});

export const AuthProvider: React.FC = ({ children }) => {
  const [cred, setCred] = useState<Partial<AppCredentials>>({})
  
  useEffect(() => {
    checkStorage();
    Checkfirebase();
    // handleRemove()
  }, []);

  const checkStorage = async () => {
    const result = await getSyncStorage([STORAGE_KEY]);
    console.log(result);
    
    console.log("CheckedStorage" , result);
    
    // if (result[STORAGE_KEY]) {
    //   CredRef.on('value', (snapshot) => {
    //     const data = snapshot.val();
    //     console.log("firebase IN Usetoken", data.STORAGE_KEY);
    //     if (data.STORAGE_KEY)
    //     {
    //       console.log("if exits" , data.STORAGE_KEY);
          
    //       setCred(data.STORAGE_KEY)
    //     }
    //     else {
    //       console.log("No data is stored in firebase");
          
    //     }
    //   });
    // }
    setCred(JSON.parse(result[STORAGE_KEY]))
  };

  const Checkfirebase = () => {
    // databaseRef.ref('/users/' + auth.currentUser?.uid).on('value', (snapshot) => {
    //   const data = snapshot.val();
    //   console.log("checkfirebase" , data);
      
    // // })
    // databaseRef.ref('/users/' + auth.currentUser?.uid).get().then(function(snapshot) {
    //   if (snapshot.exists()) {
    //     console.log(snapshot.val());
    //   }
    //   else {
    //     console.log("No data available");
    //   }
    // }).catch(function(error) {
    //   console.error(error);
    // });

    const starCounRef = databaseRef.ref('/users/' + auth.currentUser?.uid)
    starCounRef
    .on('value', (snapshot) => {
        const data = snapshot.val();
        console.log("firebasefromApp" , data);
      });
      
  }
  const handleChange = async (newCred: Partial<AppCredentials>) => {
    await setSyncStorage(STORAGE_KEY, JSON.stringify(newCred));
    databaseRef.ref('users/' + auth.currentUser?.uid).set( (newCred) )
    setCred(newCred)
  };

  const handleRemove = async () => {
    await removeSyncStorage([STORAGE_KEY]);
    setCred({})
  };

  const handleback = async () => {
    setCred({ ...cred , repoName:"" , branch:"" , workflowId:""})
    await setSyncStorage(STORAGE_KEY, JSON.stringify(cred));
    const data = await getSyncStorage([STORAGE_KEY])
    console.log("credentials changed", data)
  }

  
  return <CredentialContext.Provider value={{ cred, handleChange , handleback , handleRemove }}> {children} </CredentialContext.Provider>
}


export const useCred = () => {
  const data = useContext(CredentialContext)
  return data
}