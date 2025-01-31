import './ProgressBar.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

export default function ProgressBar({ progress }) {
  return (
    <div className='progress-bar'>
      <span className='progress-bar-text' >
        <FontAwesomeIcon className='progress-bar-icon' icon={faSpinner} spin />
        Uploading... { progress }%
      </span>
      <div style={{width: progress + '%'}} className='progress-bar-fill' />
    </div>
  )
}
