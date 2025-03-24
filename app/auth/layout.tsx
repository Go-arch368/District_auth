import React from 'react'

const AuthLayout = ({children}: {children: React.ReactNode}) => {
    return (
      <div className='min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 to-indigo-100'>
      
          {children}
      </div>
    )
  }

export default AuthLayout
