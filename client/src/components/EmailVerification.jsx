import { message } from 'antd';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { VerifyEmail } from '../apicalls/users';

const EmailVerification = () => {
  const { token } = useParams(); 
  const navigate = useNavigate()
 
  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await VerifyEmail(token);
        if (response.success) {
          message.success('Email verified successfully. You can now log in.');
          navigate("/login")
        }
      } catch (error) {
        message.error(error.message)
      }
    };
   
    verifyEmail();
  }, [token]);
 
  return (
    <div>
    </div>
  );
};

export default EmailVerification;