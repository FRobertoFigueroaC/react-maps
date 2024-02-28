import { PlacesContext } from '../../context';
import { SearchResults } from '../SearchResults';
import './search-bar.css'

import { ChangeEvent, useContext, useRef } from 'react'

export const SearchBar = () => {

  const { searchByTerm } = useContext(PlacesContext)

  const debounceRef = useRef<NodeJS.Timeout>();
  const onChangeQuery = (event: ChangeEvent<HTMLInputElement>) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
     searchByTerm(event.target.value)
    }, 1000)
   
  }
  return (
    <div className="search-bar-container">
      <input type="text"
            className="form-control"
            placeholder="Buscar"
            onChange={onChangeQuery}
            />
      <SearchResults/>
    </div>
  )
}
