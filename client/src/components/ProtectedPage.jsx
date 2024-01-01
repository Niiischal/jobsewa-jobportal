import { message } from 'antd';
import React, { useEffect, useState } from 'react'
import { GetCurrentUser } from '../apicalls/users';

function ProtectedPage() {
    const [user, setUser] = useState();

    const validateToken = async () => {
        try {
            const response = await GetCurrentUser();
            if (response.succes) {
                setUser(response.data);
            }
            else {
                message.error(response.message);
            }
        } catch (error) {
            message.error(error.message);
        }

    }

    useEffect(() => {
        
      });

  return (
    <div>
      
    </div>
  )
}

export default ProtectedPage
