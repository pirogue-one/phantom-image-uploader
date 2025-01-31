import './CopyButton.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-regular-svg-icons'

export default function CopyButton({ value, onClick }) {
  const handleClick = () => {
    navigator.clipboard.writeText(value)
    onClick()
  }

  return (
    <button className="copy-button" onClick={handleClick}>
      <FontAwesomeIcon icon={faCopy} className="copy-button-icon" />
      Copy
    </button>
  )
}
