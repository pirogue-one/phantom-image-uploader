import './DownloadButton.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudArrowDown } from '@fortawesome/free-solid-svg-icons'
import { BACKEND_ENDPOINT, BACKEND_METHODS } from '../../../consts'

export default function DownloadButton({ link }) { 
  const href = `${BACKEND_ENDPOINT}/${BACKEND_METHODS.GET_FILE}/${link}`

  return (
    <a className="download-file-button" href={href} target="_blank" rel="noreferrer">
      <FontAwesomeIcon icon={faCloudArrowDown} className="download-file-button-icon" />
      Download image
    </a>
  )
}
