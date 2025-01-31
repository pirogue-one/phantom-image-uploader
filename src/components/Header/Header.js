import './Header.scss'
import LangSelector from '../controls/LangSelector/LangSelector'
import { Link } from "react-router-dom";
import Logo from './Logo/Logo';
import { Translation } from 'i18nano';


export default function Header({ setLang }) {
  return (
    <div className="header">
      <Link to="/">
        <Logo />
      </Link>
      {/* картинка тор? */}
      <img className='tor-icon' src='/tor-icon.png' />
      <div className='login-wrapper'>
        <LangSelector setLang={setLang} />
      </div>
    </div>
  )
}
