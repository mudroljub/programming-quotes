import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'

import Filters from './Filters'
import AuthorThumb from './AuthorThumb'
import {getThumbnails, getImg} from '../../utils/helpers'
import { LS } from '../../config/localstorage'
import './sidebar.css'

const Sidebar = () => {
  const {allAuthors, filteredAuthors} = useSelector(state => state)
  const [thumbnails, setThumbnails] = useState(new Map())
  const [sidebarOpen, setSidebarOpen] = useState(localStorage.getItem(LS.showSidebar) === 'true')

  const getAuthorThumbs = allAuthors => {
    const withImg = [...allAuthors].filter(x => !getImg(x))
    const withoutImg = [...allAuthors].filter(x => getImg(x))
    getThumbnails(withImg)
      .then(mapa => {
        withoutImg.forEach(name => {
          mapa.set(name, getImg(name))
        })
        setThumbnails(mapa)
      })
  }

  useEffect(() => {
    if (sidebarOpen && allAuthors.size) getAuthorThumbs(allAuthors)
  }, [allAuthors, sidebarOpen])

  const toggle = () => {
    localStorage.setItem(LS.showSidebar, !sidebarOpen)
    setSidebarOpen(!sidebarOpen)
  }

  const authorThumbs = filteredAuthors.map(author =>
    <AuthorThumb
      key={author}
      author={author}
      image={thumbnails.get(author)}
    />
  )

  return (
    <aside className="sidebar">
      <button onClick={toggle} className="no-button toggle-button">
        <span role="img" aria-label="search" className="search-icon">&#x1F50D;</span>
      </button>
      {sidebarOpen &&
        <div className="sidebar-inner">
          <Filters/>
          <div className="authors">
            {authorThumbs}
          </div>
        </div>
      }
    </aside>
  )
}

export default Sidebar
