import React, { useState } from 'react'
import './teamcard.css'
import Avatar from 'react-avatar';
import EditIcon from '@material-ui/icons/Edit';
import { IconButton } from '@material-ui/core';

function Teamcard(props) {
    const [isShown, setIsShown] = useState(false);
    console.log(props)
       const department_list = props.departments.map(item => {
        <li>{item}</li>
})
    return (
        <div>
            <div class="card-container"  onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}>
            {isShown && (
            <IconButton className='edit'>
                    <EditIcon className='icon'/>
                    </IconButton> )}
            <Avatar name={props.name} className='round' />
    <h3>{props.name}</h3>
    <h4>{props.tm_num}</h4>
    <h6>{props.hours} Hours</h6>
    <p>
        User interface designer and <br />
        front-end developer
    </p>
    <div class="skills">
        <h6>Departments</h6>
        {props.departments ?
        <ul> {department_list}</ul>
         :
        <h6>none</h6>}
    </div>
</div>
        </div>
    )
}

export default Teamcard
