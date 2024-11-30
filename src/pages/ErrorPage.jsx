import React from 'react'
import { useRouteError } from 'react-router-dom'

const ErrorPage = () => {
    const err = useRouteError()
    console.log("err",err)
     return (
        <div>
            <h1 className='mt-5'>ErrorPage</h1>
        </div>
    )
}

export default ErrorPage
