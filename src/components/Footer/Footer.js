import './Footer.scss'
import { Translation } from 'i18nano';


export default function Header({ setLang }) {
    return (
        <div className='footer'>
            <p className='footer-text'><Translation path="administration" /></p>
            <p className='footer-text'><Translation path="contacts-footer" />&nbsp;<a className='footer-text-link'><Translation path="footer-link" /></a>
            </p>
            <br />
            <p className='footer-text-down'>
                <Translation path="footer-text-down" />
            </p>
        </div>
    )
}