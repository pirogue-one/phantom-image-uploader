import './Toast.scss'

export default function Toast({ show }) {  
  return (
    <div className={`toast ${show ? 'show' : ''}`}>
      Copyed to clipboard!
    </div>
  )
}
