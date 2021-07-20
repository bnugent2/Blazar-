import React, { useState,useContext } from 'react'
import './team.css';
import '../App.css';
import TeamCard from '../Components/Teamcard';
import firebase from 'firebase';
import Modal from '../Components/Modal';
import AddTeam from '../Components/Addteam'
import { useCollection } from 'react-firebase-hooks/firestore';
import Addcard from '../Components/Addcard';
import { AuthContext } from "../Authentication";

function Team() {
    const {currentUser} = useContext(AuthContext);
    const [value, loading, error] = useCollection(
        firebase.firestore().collection('team').where("author", "==", currentUser.uid),
        {
          snapshotListenOptions: { includeMetadataChanges: true },
        }
      );

      const [isOpen, setIsOpen] = useState(false)

    return (
        <main>
         <div>
      <p>
        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && <span>Collection: Loading...</span>}
        {value && (
          <div className='basic-grid'>
            {value.docs.map((doc) => (
              <React.Fragment key={doc.id}>
                <TeamCard name={doc.data().Name} tm_num ={doc.data().tm_num} departments ={doc.data().departments} hours ={doc.data().Contract}/>
              </React.Fragment>
            ))}
            <div className='container' onClick={() => setIsOpen(true)}>
            <Addcard></Addcard>
            </div>
          </div>
        )}
      </p>
    </div>
    <Modal open={isOpen} onClose={() => setIsOpen(false)}>
         <AddTeam/>
        </Modal>
        </main>
    )
}

export default Team
