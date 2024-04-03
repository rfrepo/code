import './App.css';
import React, { ChangeEvent, useEffect } from 'react';
import { useQueryBookmarks } from '../../hooks/useQueryBookmarks';

const KeyOfInterestMap: { [key: string]: number } = { 'Enter': 1, 'Space': 1, 'ArrowUp': 1, 'ArrowDown': 1 }

const render = (bookmark: chrome.bookmarks.BookmarkTreeNode, index: any) => {
  const { url, id, title } = bookmark

  return (
    <a
      href={url}
      key={url + id}
      target="_blank"
      rel="noreferrer"
      className={`card ${!index ? 'selected' : ''}`}>
      <div
        className="image"
        style={{ "backgroundImage": `url(chrome://favicon/size/32@1x/${url})` }}/>
      <div className="info">
        <span className="title">{title}</span>
        <span title={url} className="url">{url}</span>
      </div>
    </a>
  )
}

const getSelectedElement = (): HTMLElement | null => document.querySelector('.selected')

const toggleSelectedOldAndNewElements = (oldElement: HTMLElement, direction: string) => {
  const newElement = direction === 'next' ? oldElement.nextElementSibling : oldElement.previousElementSibling;

  if (newElement) {
    oldElement.classList.toggle('selected');
    newElement.classList.toggle('selected');
    newElement.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
  }
}

const handleKeyDownHandler = (evt: KeyboardEvent): void => {
  if (!KeyOfInterestMap[evt.code]) return;

  const selectedElement = getSelectedElement();

  if (!selectedElement) return;

  if (evt.code === 'Enter' || evt.code === 'Space') selectedElement.click()

  if (evt.code === 'ArrowUp') toggleSelectedOldAndNewElements(selectedElement, 'previous')
  else toggleSelectedOldAndNewElements(selectedElement, 'next')
}

const App = () => {
  const { bookmarks, queryBookmarks } = useQueryBookmarks()

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = (e.currentTarget as HTMLInputElement).value

    queryBookmarks(searchTerm)
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDownHandler)
  }, [])

  return (
    <div>
      <div className="App">

        <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px"
          height="18px">
          <path d="M0 0h24v24H0z" fill="none"/>
          <path
            fill="#acb1ba"
            d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </svg>

        <input
          type="text"
          onChange={onChange} autoFocus
          placeholder="Where would you like to go to today?"/>

        {!!bookmarks.length && <div className="counter">{bookmarks.length}</div>}
      </div>
      {!!bookmarks.length && <div style={{ marginTop: '4rem' }}>{bookmarks.map(render)}</div>}
    </div>
  );
}

export default App;
