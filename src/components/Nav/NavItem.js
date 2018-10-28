import React from 'react'
import { Link } from 'react-router-dom'

const NavItem = ({ props, onItemClick }) => {
    return (
        <li className={props.cls} >
            <Link className="nav-link" to={props.route} id={props.id} onClick={(event) => onItemClick(event)}>
                {props.name}
            </Link>
        </li>
    );
}
export default NavItem