import React from 'react'
import { Oval } from 'react-loader-spinner'

function Loader() {
  return (
    <Oval
    height={60}
    width={60}
    color=" rgb(16 185 129)"
    wrapperStyle={{}}
    wrapperClass=""
    visible={true}
    ariaLabel='oval-loading'
    secondaryColor="gray"
    strokeWidth={3}
    strokeWidthSecondary={3}
  
  />
  )
}

export default Loader