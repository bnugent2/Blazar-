import React, { useEffect, useState,useContext} from 'react'
import './roster.css'
import {db} from '../firebase';
import { AuthContext } from "../Authentication";
import Schedule from '../Components/Schedule'

function Roster() {
        const {currentUser} = useContext(AuthContext);
        const [team,setTeam]=useState([])

        const fetchTeam=async()=>{
          const response=db.collection('team').where("author", "==", currentUser.uid);
          const data=await response.get();
          const postData = [];
          data.forEach((doc) => postData.push({ name: doc.data().Name, id: doc.id, color:'#11a3e7' }));
          setTeam(postData);
        }
    
        useEffect(() => {
          fetchTeam();
        },[])

    return (
        <main>
            <Schedule resources={team}/>
        </main>
    )
}

export default Roster