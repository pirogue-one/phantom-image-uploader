import './LangSelector.scss'
import { useState, useRef, useEffect } from 'react'
import { useTranslationChange } from 'i18nano'
import { useCookies } from 'react-cookie'
import Icon from '../Icon/Icon'

export default function LangSelector() {
  const translation = useTranslationChange()
  const [expanded, setExpanded] = useState(false)
  const [listWidth, setListWidth] = useState(0)
  const [, setCookie] = useCookies()
  const langSelector = useRef(null)
  const langCurrent = useRef(null)

  const outsideClick = (event) => {
    if (langSelector.current && !langSelector.current.contains(event.target)) {
      setExpanded(false)
    }
  }

  useEffect(() => {
    window.addEventListener("click", outsideClick)
    window.addEventListener("scroll", outsideClick, true)
    return () => {
      window.removeEventListener("click", outsideClick)
      window.removeEventListener("scroll", outsideClick, true)
    }
  })

  const currentClickHandler = () => {
    setListWidth(langCurrent.current.offsetWidth)
    setExpanded(!expanded)
  }

  const langClickHandler = (lang) => {
    setCookie('lang', lang)
    translation.change(lang)
    setExpanded(false)
  }

  return (
    <div ref={langSelector} className={'lang-selector' + (expanded ? ' expanded' : '') }>
      <div className='lang-selector-current' ref={langCurrent} onClick={currentClickHandler}>
        <span>{ translation.lang.toUpperCase() }</span>
        <Icon className='icon' iconName={'caretDown'} />
      </div>
      { expanded &&
        <div className='lang-selector-list' style={{ width: listWidth }}>
          {
            translation.all.filter(f => f !== translation.lang)
              .map(lang => (
                <div className='lang-selector-list-item'
                  key={lang}
                  onClick={(e) => { e.stopPropagation(); langClickHandler(lang) }}
                >
                  { lang.toUpperCase() }
                </div>
              ))
          }
        </div>
      }
    </div>
  )
}
