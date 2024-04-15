import React, { useEffect, useState } from 'react';
import { CgProfile } from "react-icons/cg";
import { useDispatch } from "react-redux";
import { GetUser } from '../apicalls/users';

function Conversation({ data, currentUser, online }) {
    const [userData, setUserData] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const userId = data.members.find((id) => id !== currentUser);
        const getUserData = async () => {
            try {
                const { data } = await GetUser(userId);
                setUserData(data);
                dispatch({ type: "SAVE_USER", data: data });
            } catch (error) {
                console.log(error);
            }
        };
        getUserData();
    }, []);

    return (
        <div className='flex flex-col items-center'>
            <div className="flex items-center rounded p-2 hover:bg-gray-300 cursor-pointer w-full">
                <div className="relative mr-2 ">
                    <div className="bg-gray-300 w-12 h-12 rounded-full flex flex-col items-center justify-center">
                        <CgProfile size={50} />
                        {online && <div className="bg-green-500 w-4 h-4 rounded-full absolute top-0 right-0 border border-white"></div>}
                    </div>
                </div>
                <div className="flex flex-col">
                    <span className="text-lg font-semibold">{userData?.name}</span>
                    <span className={`text-sm ${online ? "text-green-500" : "text-red-500"}`}>{online ? "Online" : "Offline"}</span>
                </div>
            </div>
            <hr className="w-full" style={{ border: "0.1px solid #ececec" }} />
        </div>
    );
}

export default Conversation;
