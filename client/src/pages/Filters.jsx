import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import { Button } from "antd";

const categories = [
  {
    name: "Accounting / Finance",
    value: "Accounting / Finance",
  },
  {
    name: "Architecture / Interior Design",
    value: "Architecture / Interior Design",
  },
  {
    name: "Banking / Insurance / Financial Services",
    value: "Banking / Insurance / Financial Services",
  },
  {
    name: "Commercial / Logistics / Supply Chain",
    value: "Commercial / Logistics / Supply Chain",
  },
  {
    name: "Construction / Engineering / Architects",
    value: "Construction / Engineering / Architects",
  },
  {
    name: "Creative / Content / Graphics / Video Editing",
    value: "Creative / Content / Graphics / Video Editing",
  },
  {
    name: "Hospitality / Tourism",
    value: "Hospitality / Tourism",
  },
  {
    name: "IT / Telecommunication",
    value: "IT / Telecommunication",
  },
];

const level = [
  {
    name: "Entry Level",
    value: "Entry Level",
  },
  {
    name: "Junior Level",
    value: "Junior Level",
  },
  {
    name: "Senior Level",
    value: "Senior Level",
  },
  {
    name: "Mid Level",
    value: "Mid Level",
  },
];

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
        <div className="flex gap-4 justify-between">
          <div className="flex flex-col">
            <h3 className="text-gray-600">Categories</h3>
            <div className="flex flex-col">
              {categories.map((category) => {
                return (
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="category"
                      checked={
                        filters?.categories?.includes(category.value)
                          ? true
                          : false
                      }
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFilters({
                            ...filters,
                            category: [...filters.category, category.value],
                          });
                        } else {
                          setFilters({
                            ...filters,
                            category: filters.category.filter(
                              (item) => item !== category.value
                            ),
                          });
                        }
                      }}
                    />
                    <label htmlFor="category">{category.name}</label>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Filters;
