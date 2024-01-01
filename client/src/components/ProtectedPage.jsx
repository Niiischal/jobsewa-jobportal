import { message } from 'antd';
import React, { useEffect, useState } from 'react'
import { GetCurrentUser } from '../apicalls/users';
import { useNavigate } from 'react-router-dom';

function ProtectedPage({children}) {
    const [user, setUser] = useState();
    const navigate = useNavigate();

    const validateToken = async () => {
        try {
            const response = await GetCurrentUser();
            if (response.succes) {
                setUser(response.data);
                navigate("/jobseeker-home")
            }
            else {
                navigate("/login");
                message.error(response.message);
            }
        } catch (error) {
            navigate("/login")
            message.error(error.message);
        }

    }

    useEffect(() => {
        if (localStorage.getItem("token")) {
            validateToken()
            navigate("/jobseeker-home")
            
        } else {
            navigate("/login")
        }
      });

  return (
    <div>
      {user && 
      <div className='p-5'>
        {user.name}
        {children}
      </div>
      }
    </div>
  )
}

export default ProtectedPage
