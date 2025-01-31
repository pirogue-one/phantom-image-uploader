import './ImageList.scss'
//import UploadButton from '../controls/UploadButton/UploadButton'
//import ProgressBar from '../controls/ProgressBar/ProgressBar'
import AutoRemoveSelect from '../controls/AutoRemoveSelect/AutoRemoveSelect'
import LinksTextArea from '../controls/LinksTextArea/LinksTextArea'
import { Translation } from 'i18nano';

function ImageList({ images, uploaded, uploadProgress, uploadError, onCopy, onRemove, onUpload, onChangeAutoDeleteTime }) {
  const clickImageHandler = (image) => {
    if (image.url) {
      window.open(`/uploaded/${image.url}`, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <div className='image-list-wrapper'>
      <div className='image-list-container'>
        <div className='image-list'>
          {
            images.map((image, index) => (
              <div className='image-item' key={ index } title={ image.name }>
                <img
                  className={`image-preview ${image.url ? 'uploaded' : ''}`}
                  src={image.data}
                  alt=""
                  onClick={() => clickImageHandler(image)}
                />
                <div className='remove-button' onClick={() => onRemove(image.name)}>
                  <span className='remove-button-xmark'>✖</span>
                </div>
              </div>
            ))
          }
        </div>
        { uploadError && <div className='image-upload-error'><Translation path='image-upload-error' /><br/><Translation path='try-again' /></div> }
        { !uploaded && !uploadProgress && <AutoRemoveSelect onSelect={onChangeAutoDeleteTime}/> }
        { /*!uploaded && !uploadProgress && <UploadButton onClick={onUpload}/> */}
        { /*!uploaded && !!uploadProgress && <ProgressBar progress={ uploadProgress } />*/ }
        { uploaded && <LinksTextArea list={ images.map(image => (image.url)) } onCopy={ onCopy }/> }
      </div>
    </div>
  );
}

export default ImageList