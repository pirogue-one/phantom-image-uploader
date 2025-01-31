import './FileView.scss'
import { Fragment } from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { BACKEND_ENDPOINT, BACKEND_METHODS } from '../../consts'
import RemoveButton from '../controls/RemoveButton/RemoveButton'
import DownloadButton from '../controls/DownloadButton/DownloadButton'
import CopyButton from '../controls/CopyButton/CopyButton'
import Toast from '../Toast/Toast'
import Modal from '../Modal/Modal'
import axios from 'axios';

export default function FileView({ owner }) {
  const { imageId } = useParams();
  const [imageLink, setImageLink] = useState(null)
  const [imageHasError, setImageHasError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [showRemoveComfirm, setShowRemoveComfirm] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    setImageHasError(false)
    setImageLink(imageId ? `${BACKEND_ENDPOINT}/${BACKEND_METHODS.GET_FILE}/${imageId}` : null)
    // setImageLink(imageId ? './1618119326_16-p-kotiki-obnimashki-zhivotnie-krasivo-foto-16.jpg': null)
  }, [imageId])

  const imageErrorHandler = (error) => {
    setImageHasError(true)
    console.error(error)
  }

  const imageLoadedHandler = () => {
    setImageLoaded(true)
  }

  // Show Toast
  const onCopyLink = () => {
    setShowToast(true)
    setTimeout(() => {
      setShowToast(false)
    }, 1000)
  }

  const onModalCancel = () => {
    setShowRemoveComfirm(false)
  }

  const onModalConfirm = () => {
    setShowRemoveComfirm(false)
    removeImage()
  }

  const removeClickHandler = (event) => {
    event.stopPropagation()
    event.preventDefault()
    setShowRemoveComfirm(true)
  }

  const removeImage = () => {
    try {
      axios.delete(`${BACKEND_ENDPOINT}/${BACKEND_METHODS.DELETE_FILE}/${imageId}`)
    } catch (e) {
      console.error(e)
    } finally {
      navigate('/')
    }
  }

  const embedCodes = [
    { label: 'Download:', link: imageLink || '' },
    { label: 'HTML:', link: `<a href="${imageLink}"><img src="${imageLink}" alt="${imageId}" border="0" /></a>` },
    { label: 'BBCode:', link: `[url=${imageLink}][img]${imageLink}[/img][/url]` }
  ]

  return (
    <div className="file-view">
      <Toast show={ showToast } />
      { showRemoveComfirm && <Modal text={'Do you really want to remove image?'} onCancel={ onModalCancel } onConfirm={ onModalConfirm }/> }
      {!imageHasError &&
        <Fragment>
          <div className="imgage-container">
            <img className="image-view" src={ imageLink } alt="" onError={ imageErrorHandler } onLoad={ imageLoadedHandler }></img>
          </div>
          { imageLoaded &&
            <div className="image-detail">
              { owner &&
                <div className="image-detail-buttons">
                  <DownloadButton link={ imageId } />
                  <RemoveButton onClick={ removeClickHandler } />
                </div>
              }
              <p className="image-detail-title">Embed codes:</p>
              <div className="image-detail-links">
                {embedCodes.map((el, index) => (
                  <div key={ index } className="image-detail-links-line">
                    <p className="image-detail-links-line-titles" >{ embedCodes[index].label }</p>
                    <div className="image-detail-links-line-values">
                      <input className="image-detail-links-line-values-input" type="text" value={ el.link } readOnly />
                      <CopyButton value={ el.link } onClick={ onCopyLink } />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          }
        </Fragment>
      }
      {imageHasError && <p className="image-error">Oops! Looks like this image is not exist anymore :(</p>}
    </div>
  )
}
