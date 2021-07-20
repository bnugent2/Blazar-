import React from 'react'
import './teamcard.css'
import { ReactComponent as AddIcon } from '../Icons/add.svg';

function Addcard() {
    return (
        <div>
            <div class="add-card">
                <AddIcon className="add "/>
            </div>
        </div>
    )
}

export default Addcard

