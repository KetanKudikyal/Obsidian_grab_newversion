import * as React from 'react'
import { auth } from '../background_script/firebase';
// import { CredRef } from '../background_script/firebase';
import Main from "./components/Main"
import { useCred } from './utils/useToken';

const App = () => {
  const { handleChange: updateCreds, cred } = useCred()
  console.log("App " , cred);
  

  
  React.useEffect(() => {


    // CredRef.on('value', (snapshot) => {
    //   const data = snapshot.val();
    //   console.log("firebasefromApp" , data);
    // });
  }, []);


  return (
    <div>
      <Main/>
    </div>
  )
}

export default App
