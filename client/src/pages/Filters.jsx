
import React from "react";
import SearchBar from "../components/SearchBar";

function Filters({ showFilters, setShowFilters, filters, setFilters }) {
  return (
    <div className="pl-[10px] pr-[10px]">
      <div className="flex justify-center">
        <SearchBar />
      </div>
    </div>
  );
}

export default Filters;
