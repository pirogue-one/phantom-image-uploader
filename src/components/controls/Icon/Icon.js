import './Icon.scss'
import {ReactComponent as Switch} from './icons/switch.svg'
import {ReactComponent as CaretDown} from './icons/caretDown.svg'
import {ReactComponent as CaretLeft} from './icons/caretLeft.svg'
import {ReactComponent as List} from './icons/list.svg'

export default function Icon({ iconName }) {
  return (
    <div className='icon'>
      { (iconName === 'switch') && <Switch /> }
      { (iconName === 'caretDown') && <CaretDown /> }
      { (iconName === 'caretLeft') && <CaretLeft /> }
      { (iconName === 'list') && <List /> }
    </div>
  )
}
