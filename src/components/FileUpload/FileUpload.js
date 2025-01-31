import { Fragment } from 'react'
import SelectButton from '../controls/SelectButton/SelectButton'
import ImageList from '../ImageList/ImageList'
import Toast from '../Toast/Toast'
import Modal from '../Modal/Modal'
import { useState, useEffect } from 'react'
import FormData from 'form-data'
import axios from 'axios'
import { BACKEND_ENDPOINT, BACKEND_METHODS } from '../../consts'
import { Translation } from 'i18nano'
import './FileUpload.scss';
import TextField from '../TextField/TextField';

export default function FileUpload() {
  const [loadedFiles, setLoadedFiles] = useState([])
  const [showToast, setShowToast] = useState(false)
  const [showUploadError, setShowUploadError] = useState(false)
  const [uploaded, setUploaded] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [autoDeleteTime, setAutoDeleteTime] = useState(5)
  const [showRemoveComfirm, setShowRemoveComfirm] = useState(false)
  const [removableFileName, setRemovableFileName] = useState(null)
  const [uploadMode, setUploadMode] = useState('progress')

  useEffect(() => {
    if (!loadedFiles.length) {
      setUploadMode('select')
    } else if (uploadProgress === 0) {
      setUploadMode('upload')
    } else {
      setUploadMode('progress')
    }
  }, [uploadProgress, loadedFiles])

  const onSelect = async (files) => {
    const images = await readFiles(files)
    //setLoadedFiles(images)
    setLoadedFiles((currentImages) => ([
      ...currentImages,
      ...images.filter(f => !currentImages.some(s => s.name === f.name))
    ]))
    setUploaded(false)
    setUploadProgress(0)
    setShowUploadError(false)
  }

  const onChangeAutoDeleteTime = (value) => {
    setAutoDeleteTime(+value)
  }

  // Show Toast
  const onCopy = () => {
    setShowToast(true)
    setTimeout(() => {
      setShowToast(false)
    }, 1000)
  }

  const removeImage = (fileName) => {
    const name = fileName || removableFileName
    if (uploaded) {
      const url = loadedFiles.find(el => el.name === name)?.url
      if (url) {
        try {
          axios.delete(`${BACKEND_ENDPOINT}/${BACKEND_METHODS.DELETE_FILE}/${url}`)
        } catch (e) {
          console.error(e)
        }
      }
    }
    setLoadedFiles(files => (
      files.filter(el => el.name !== name)
    ))
  }

  const onModalCancel = () => {
    setShowRemoveComfirm(false)
  }

  const onModalConfirm = () => {
    setShowRemoveComfirm(false)
    removeImage()
  }

  const onRemoveImage = (fileName) => {
    setRemovableFileName(fileName)
    if (uploaded) {
      setShowRemoveComfirm(true)
    } else {
      removeImage(fileName)
    }
  }

  const onUploadImages = () => {
    setUploadMode('progress')
    uploadFiles(loadedFiles.map(img => (img.file)))
  }

  const dragOverHandler = (event) => {
    event.preventDefault()
  }

  const dropHandler = (event) => {
    event.preventDefault()
    onSelect(Array.from(event.dataTransfer.files))
  }

  const readFiles = async (fileList) => {
    const images = await Promise.allSettled(fileList.map(file => (readAsDataURL(file))))
    //console.log(images)
    return images.filter(f => f.status === 'fulfilled').map(f => (f.value))
  }

  function readAsDataURL(file) {
    return new Promise((resolve) => {
      const fileReader = new FileReader();
      fileReader.onload = (event) => {
        return resolve({
          file,
          name: file.name,
          size: Math.round(file.size / 1024),
          data: event.target.result
        })
      }
      fileReader.readAsDataURL(file);
    })
  }

  const uploadFiles = (fileList) => {
    const formData = new FormData()
    if (autoDeleteTime > 0) formData.append('time_after_delete', autoDeleteTime)
    fileList.forEach(file => {
      formData.append('file', file)
    })
    axios.post(`${BACKEND_ENDPOINT}/${BACKEND_METHODS.UPLOAD_FILE}`, formData, {
      headers: {
        'accept': 'application/json',
        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
      },
      onUploadProgress: e => {
        setUploadProgress(Math.round((e.loaded * 100) / e.total))
      }
    }).then((response) => {
      const { result } = response?.data || {}
      if (result) {
        //console.log(result)
        setLoadedFiles(files => (
          files.map(el => {
            const { url } = result.find(f => f.name === el.name)
            return {
              ...el,
              url
            }
          })
        ))
        setUploaded(true)
        setShowUploadError(false)
      }
    }).catch(error => {
      console.error(error)
      setUploaded(false)
      setUploadProgress(0)
      setUploadMode('upload')
      setShowUploadError(true)
    })
  }

  return (
    <Fragment>
      <Toast show={ showToast } />
      { showRemoveComfirm && <Modal text={'Do you really want to remove image?'} onCancel={ onModalCancel } onConfirm={ onModalConfirm }/> }
      <div className='file-upload-drop-zone' onDrop={ dropHandler } onDragOver={ dragOverHandler }>
        {!loadedFiles.length && <p className='file-upload-title'><Translation path='upload-title' /></p>}
        {!!loadedFiles.length &&
          <ImageList
            images={ loadedFiles }
            uploaded={ uploaded }
            uploadError= { showUploadError }
            onCopy={ onCopy }
            onRemove={ onRemoveImage }
            onChangeAutoDeleteTime={ onChangeAutoDeleteTime }
          />
        }
        {!uploaded && <SelectButton mode={ uploadMode } progress={ uploadProgress } onSelect={ onSelect } onUploadImages={ onUploadImages }/>}
        <TextField />
      </div>
    </Fragment>
  )
}