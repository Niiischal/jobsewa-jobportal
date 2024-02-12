import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import { Button } from "antd";

function Filters({ showFilters, setShowFilters, filters, setFilters }) {
  const [showText, setShowText] = useState(false);

  const toggleText = () => {
    setShowText(!showText);
  };

  return (
    <div className="pl-[10px] pr-[10px]">
      <div className="flex justify-center">
        <SearchBar />
      </div>
      <div className="flex justify-end mt-3">
        <Button type="primary" onClick={toggleText}>
          Filters
        </Button>
      </div>
      {showText && (
        <div className="mt-3 text-center">
          This text is shown when the filter button is clicked.
        </div>
      )}
    </div>
  );
}

export default Filters;
