import * as React from 'react'
import { auth, databaseRef } from '../background_script/firebase';
import Main from "./components/Main"
import { useCred } from './utils/useToken';

const App = () => {
    
  const { handleChange: updateCreds,   checkStorage , cred } = useCred()
  console.log("App " , cred);
  

  
  React.useEffect(() => {

    checkStorage()
    databaseRef.ref('/users/' + auth.currentUser?.uid).on('value', (snapshot) => {
      const data = snapshot.val();
      console.log("firebasefromApp" , data);
    });
  }, []);


  return (
    <div>
      <Main/>
    </div>
  )
}

export default App
