import { useRouteError } from "react-router-dom"
import React from "react";
const Error = () => {
    const error = useRouteError()    
  console.log(error)
  return (
    <div>
      <h1>Error</h1>
      <h2>{error.statusText} </h2>
    </div>
  )
}

export default Error
