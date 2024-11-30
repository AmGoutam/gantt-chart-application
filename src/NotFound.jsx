import React from 'react'
import { useRouteError } from 'react-router-dom'

const NotFound = () => {
    const err = useRouteError();
    console.log("Err",err)
  return (
    <div>
      <h1>NotFound</h1>
    </div>
  )
}

export default NotFound
