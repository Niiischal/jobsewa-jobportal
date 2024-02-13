import { Button } from "antd";
import React, { useState } from "react";
import SearchBar from "../components/SearchBar";

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

const levels = [
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

const types = [
  {
    name: "Remote",
    value: "Remote",
  },
  {
    name: "On-site",
    value: "On-site",
  },
  {
    name: "Hybrid",
    value: "Hybrid",
  },
];

function Filters({ filters, setFilters }) {
  const [showText, setShowText] = useState(false);

  const toggleText = () => {
    setShowText(!showText);
  };

  return (
    <div className="pl-[10px] pr-[10px]">
      <div className="flex sm:w-[50%] sm:ml-[25%] sm:justify-center">
        <SearchBar />
      </div>
      <div className="flex justify-end mt-3 sm:justify-center">
        <Button type="primary" onClick={toggleText}>
          Filters
        </Button>
      </div>
      {showText && (
        <div className="flex bg-gray-100 rounded-lg justify-between pl-4 pr-4 sm:w-[60%] sm:ml-[20%]">
          <div className="flex flex-col">
            <h3 className="text-gray-600">Categories</h3>
            {categories.map((category) => {
              return (
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="category"
                    checked={filters?.categories?.includes(category.value)}
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
          <div className="flex flex-col">
            <h3 className="text-gray-600">Level</h3>
            {levels.map((level) => {
              return (
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="level"
                    checked={filters?.level?.includes(level.value)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFilters({
                          ...filters,
                          level: [...filters.level, level.value],
                        });
                      } else {
                        setFilters({
                          ...filters,
                          level: filters.level.filter(
                            (item) => item !== level.value
                          ),
                        });
                      }
                    }}
                  />
                  <label htmlFor="level">{level.name}</label>
                </div>
              );
            })}
          </div>
          <div className="flex flex-col">
            <h3 className="text-gray-600">Type</h3>
            {types.map((type) => {
              return (
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="type"
                    checked={filters?.type?.includes(type.value)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFilters({
                          ...filters,
                          type: [...filters.type, type.value],
                        });
                      } else {
                        setFilters({
                          ...filters,
                          type: filters.type.filter(
                            (item) => item !== type.value
                          ),
                        });
                      }
                    }}
                  />
                  <label htmlFor="type">{type.name}</label>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default Filters;
