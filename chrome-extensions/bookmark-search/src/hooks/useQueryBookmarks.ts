import { useState } from 'react';
// import { data } from '../support/mockData';
import { refineSearch } from '../support/refineSearch'

let searchResults: chrome.bookmarks.BookmarkTreeNode[] = [];

let filteredResultsMap: { [key: string]: chrome.bookmarks.BookmarkTreeNode[] } = {};

const removeDuplicates = (target: any[]) =>
  target.filter((item, index, array) => array.findIndex(t => t.title === item.title && t.url === item.url) === index);

const relevanceCheck = (value: string, searchTerm: string) => value.startsWith(searchTerm) || value.includes(searchTerm)


const filter = (searchTerm: string, setBookmarks: Function) => {

  const pureBookmarks = searchResults.filter((bookmark: any) => Boolean(bookmark.url));

  const uniqueBookmarks = refineSearch(searchTerm, removeDuplicates(pureBookmarks))

  const orderByRelevance = uniqueBookmarks.sort((a, b) => {
    if (relevanceCheck(b.title.toLowerCase(), searchTerm)) return 1
    if (relevanceCheck(a.title.toLowerCase(), searchTerm)) return -1
    return 0;
  })

  if (orderByRelevance.length) {
    filteredResultsMap[searchTerm] = orderByRelevance;
    setBookmarks(orderByRelevance)
  } else {
    filteredResultsMap[searchTerm] = searchResults;
  }
}

const getResultsFromPreviousFilterResult = (searchTerm: string) => {
  const key: string = searchTerm.substr(0, searchTerm.length - 1);
  return filteredResultsMap[key];

}
const filterBookmarks = (searchTerm: string, setBookmarks: Function) => {
  const cachedResults = filteredResultsMap[searchTerm]

  if (cachedResults) {
    searchResults = cachedResults;
    setBookmarks(cachedResults)
    return;
  }

  const resultFromPreviousFilter = getResultsFromPreviousFilterResult(searchTerm)

  if (resultFromPreviousFilter) {
    searchResults = resultFromPreviousFilter;
    filter(searchTerm, setBookmarks)
    return;
  }

  if (!resultFromPreviousFilter) {
    chrome.bookmarks.search(searchTerm, _searchResults => {
      searchResults = _searchResults;
      filter(searchTerm, setBookmarks)
    })
  }
};


export const useQueryBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<any>([])

  const queryBookmarks = (searchTerm: string) => {
    if (searchTerm.length < 2) {
      if (searchResults.length) {
        searchResults = [];
        filteredResultsMap = {};
        setBookmarks([])
      }
      return;
    }

    filterBookmarks(searchTerm, setBookmarks)
  }

  return { bookmarks, queryBookmarks }
}