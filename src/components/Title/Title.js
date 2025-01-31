import './Title.scss'
import { Translation } from 'i18nano';


export default function Title() {
    return (
      <div className='title'>
      <h1>PHANTOM</h1>
      <p><Translation path="subtitle" /></p>
      </div>
      
    )
  }