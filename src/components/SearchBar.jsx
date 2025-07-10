import React from 'react'

const SearchBar = ({setSearchQuery}) => {
  return (
    <input type='text' placeholder='search for tasks...' onChange={(e)=>setSearchQuery(e.target.value)}/>
  )
}

export default SearchBar;