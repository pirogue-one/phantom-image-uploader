import './AutoRemoveSelect.scss'
import { useState } from 'react'
import Select, { components } from 'react-select'
import { Translation } from 'i18nano'

export default function AutoRemoveSelect({ onSelect }) {
  const options = [
    //{ value: '0', label: 'Never' },
    { value: '5', label: 'After 5 minutes' },
    { value: '15', label: 'After 15 minutes' },
    { value: '30', label: 'After 30 minutes' },
    { value: '60', label: 'After 1 hour' },
    { value: '180', label: 'After 3 hours' },
    { value: '360', label: 'After 6 hours' },
    { value: '720', label: 'After 12 hours' },
    { value: '1440', label: 'After 1 day' },
    { value: '2880', label: 'After 2 days' },
    { value: '4320', label: 'After 3 days' },
    { value: '5760', label: 'After 4 days' },
    { value: '7200', label: 'After 5 days' },
    { value: '8640', label: 'After 6 days' },
    { value: '10080', label: 'After 1 week' },
    { value: '20160', label: 'After 2 weeks' },
    { value: '30240', label: 'After 3 weeks' },
    { value: '40320', label: 'After 1 month' },
    { value: '80640', label: 'After 2 months' },
    { value: '120960', label: 'After 3 months' },
    { value: '161280', label: 'After 4 months' },
    { value: '201600', label: 'After 5 months' },
    { value: '241920', label: 'After 6 months' },
  ]

  const [selected, setSelected] = useState(options[18])

  const handleSelect = (el) => {
    setSelected(el)
    onSelect(el.value)
  }

  const SingleValue = ({ children, ...props }) => (
    <components.SingleValue {...props}>
      <Translation path={children} />
    </components.SingleValue>
  );

  const Option = (props) => (
    <components.Option {...props}>
      <Translation path={props.label} />
    </components.Option>
  )

  return (
    <div className='auto-remove-select'>
      <p className='auto-remove-select-title'>
        <Translation path='auto-delete-caption' />
      </p>
      <Select
        className='auto-remove-select-control'
        options={ options }
        menuPortalTarget={ document.body }
        onChange={ handleSelect }
        value={ selected }
        components={{
          Option,
          SingleValue
        }}
      />
    </div>
  )
}
