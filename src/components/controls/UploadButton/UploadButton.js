import './UploadButton.scss'
import { Translation } from 'i18nano';

export default function UploadButton({ onClick }) { 
  return (
    <button className="upload-file-button" onClick={onClick}>
      <Translation path='upload-file-button' />
    </button>
  )
}
