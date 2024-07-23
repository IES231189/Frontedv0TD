import React, { Children } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/reports.scss';


const CardButton = ({ props }) => {
    return (
        <div className='container-direction'>

            {props.map((item, index) => (
                <div className='card-group'>
                    <li className='list-style-buttons'><Link key={index} to={item.path}>{item.label}</Link></li>
                </div>))}

        </div>
    );
}

export default CardButton;
