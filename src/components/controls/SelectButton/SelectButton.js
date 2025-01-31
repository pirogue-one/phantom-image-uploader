import { Fragment, useRef, useState } from 'react'
import './SelectButton.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileImage } from '@fortawesome/free-solid-svg-icons'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import { Translation } from 'i18nano';

export default function SelectButton({ mode, progress, onSelect, onUploadImages }) {
  // mode in ('select', 'upload', 'progress')
  const hiddenFileInput = useRef(null)
  const [isHovered, setIsHovered] = useState(false)

  const clickHandler = () => {
    if (mode === 'select') hiddenFileInput.current.click()
    if (mode === 'upload') onUploadImages()
  }

  const handleChange = (event) => {
    onSelect([...event.target.files])
  }

  const handleClick = (event) => {
    event.target.value = null
  }

  const mouseEnterHandler = () => {
    setIsHovered(true)
  }

  const mouseLeaveHandler = () => {
    setIsHovered(false)
  }

  return (
    <Fragment>
      <div className="select-file-button-wrapper">
        <button
          className="select-file-button"
          onClick={clickHandler}
          onMouseEnter={mouseEnterHandler}
          onMouseLeave={mouseLeaveHandler}
        >
          <Translation path='upload-file-button' />
        </button>
        <input
          name="files"
          accept="image/*"
          type='file'
          className="file-input"
          multiple
          ref={hiddenFileInput}
          onChange={handleChange}
          onClick={handleClick}
        />
        <label for="files"><Translation path='files-input' /></label>
      </div>
    </Fragment>
  );
}
