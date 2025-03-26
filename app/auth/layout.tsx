import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className='min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 to-indigo-100'>
      {children}
    </div>
  );
};

export default AuthLayout;