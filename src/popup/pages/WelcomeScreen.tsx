import * as React from 'react'


const loading = require('../../../public/loading.gif')


const WelcomeScreen = () => {

  return (
    <div style={{margin:"auto" , top:"25px" }}>
      <img style={{
        width: "50%",
        height: "50%",
        position: "absolute",
        top:"20%",
                left:"25%",
                objectFit:"contain" }} src={loading}/>
    </div>
  )
}

export default WelcomeScreen