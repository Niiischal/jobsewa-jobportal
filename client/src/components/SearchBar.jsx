import React from 'react'
import { Input } from 'antd';
const { Search } = Input;

const onSearch = (value, _e, info) => console.log(info?.source, value);
function SearchBar() {
  return (
    <Search
      placeholder="Enter the job title"
      allowClear
      enterButton="Search"
      size="small"
      onSearch={onSearch}
      variant="none"
    />
  )
}

export default SearchBar
