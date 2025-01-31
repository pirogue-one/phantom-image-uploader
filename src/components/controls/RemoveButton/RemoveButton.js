import './RemoveButton.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCanArrowUp } from '@fortawesome/free-solid-svg-icons'

export default function RemoveButton({ onClick }) {
  return (
    <button className="remove-file-button" onClick={ onClick }>
      <FontAwesomeIcon icon={faTrashCanArrowUp} className="remove-file-button-icon" />
      Delete image
    </button>
  )
}
