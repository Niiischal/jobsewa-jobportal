import { message } from 'antd';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { VerifyEmail } from '../apicalls/users';

const EmailVerification = () => {
  const { token } = useParams(); 
 
  useEffect(() => {
    const verifyEmail = async () => {
      const response = await VerifyEmail(token);
      if (response.success) {
        message.success('Email verified successfully. You can now log in.');
      }
    };
   
    verifyEmail();
  }, [token]);
 
  return (
    <div>
      {token}
    </div>
  );
};

export default EmailVerification;