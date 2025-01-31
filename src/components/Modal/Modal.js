import './Modal.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons'

export default function Modal({ text, onConfirm, onCancel }) {

  return (
    <div className='modal-container'>
      <div className='modal'>
        <div className='modal-title'>
          <FontAwesomeIcon icon={faXmarkCircle} className="modal-title-icon" />
          <span>{ text }</span>
        </div>
        <div className='modal-footer'>
          <button className='modal-footer-confirm' onClick={ onConfirm }>
            Confirm
          </button>
          <button className='modal-footer-cancel' onClick={ onCancel }>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
