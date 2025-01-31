import './LinksTextArea.scss'
import { useState } from 'react'
import Select from 'react-select'
import CopyButton from '../CopyButton/CopyButton'
import { BACKEND_ENDPOINT, BACKEND_METHODS } from '../../../consts'

export default function LinksTextArea({ list, onCopy }) {
  const imageUri = `${BACKEND_ENDPOINT}/${BACKEND_METHODS.GET_FILE}`

  const options = [
    { value: 'Orig', label: 'Original' },
    { value: 'HTML', label: 'HTML' },
    { value: 'BB', label: 'BBCode' },
  ]

  const [linksType, setLinksType] = useState(options[0])

  const getLinksListText = () => {
    const { value } = linksType
    let fn
    if (value === 'Orig') fn = (el) => (`${window.location.origin}/${el}`)
    if (value === 'HTML') fn = (el) => (`<a href="${imageUri}/${el}"><img src="${imageUri}/${el}" alt="${el}" border="0" /></a>`)
    if (value === 'BB') fn = (el) => (`[url=${imageUri}/${el}][img]${imageUri}/${el}[/img][/url]`)

    return list.map(fn).join('\n')
  }

  /*const handleClick = () => {
    navigator.clipboard.writeText(value)
    onClick()
  }*/

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      background: '#fff',
      borderColor: '#9e9e9e',
      minHeight: '1.875rem',
      height: '1.875rem',
      boxShadow: state.isFocused ? null : null,
    }),

    valueContainer: (provided) => ({
      ...provided,
      height: '1.875rem',
      padding: '0 6px'
    }),

    input: (provided) => ({
      ...provided,
      margin: '0px',
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      height: '1.875rem',
    }),
  }

  return (
    <div className='links-text-area'>
      <div className='links-text-area-title'>
        <div className='links-text-area-title-links'>
          <p>Links:</p>
          <Select
            className='links-text-area-title-links-type'
            styles={ customStyles }
            options={ options }
            menuPortalTarget={ document.body }
            onChange={ el => setLinksType(el) }
            value={ linksType }
          />
        </div>
        <CopyButton value={getLinksListText()} onClick={onCopy} />
      </div>
      <textarea value={ getLinksListText() } readOnly />
    </div>
  )
}
