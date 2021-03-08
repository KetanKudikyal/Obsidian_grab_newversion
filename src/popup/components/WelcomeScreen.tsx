import * as React from 'react'


const loading = require('../../../public/loading.gif')


const WelcomeScreen = () => {

  return (
    <div style={{margin:"auto" , width:"40%" , top:"25px"}}>
      {/* <img src={ball}/> */}
      {/* <img src={circle}/> */}
      <img src={loading}/>
    </div>
  )
}

export default WelcomeScreen