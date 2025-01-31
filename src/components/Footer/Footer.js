import './Footer.scss'
import { Link } from "react-router-dom";
import { Translation } from 'i18nano';


export default function Header({ setLang }) {
    return (
        <div className='footer'>
            <p className='footer-text'><Translation path="administration" /></p>
            <p className='footer-text'><Translation path="contacts-footer" />&nbsp;<Link className='footer-text-link' to="/form"><Translation path="footer-link" /></Link>
            </p>
            <br />
            <p className='footer-text-down'>
                <Translation path="footer-text-down" />
            </p>
        </div>
    )
}