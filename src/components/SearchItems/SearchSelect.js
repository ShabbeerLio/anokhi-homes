import React, { useEffect, useRef, useState } from "react";
import "./SearchSelect.css";

const SearchSelect = ({
  label,
  placeholder = "Search...",
  options = [],
  value = null,
  onChange,
  displayKey = "name",
  searchKeys = ["name"],
  renderOption,
}) => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  // 🔍 Filter logic
  const filteredOptions = options.filter((option) =>
    searchKeys.some((key) =>
      option[key]
        ?.toString()
        .toLowerCase()
        .includes(search.toLowerCase())
    )
  );

  // 🖱 Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Sync input with selected value
  useEffect(() => {
    if (value) {
      setSearch(value[displayKey]);
    }
  }, [value, displayKey]);

  return (
    <div className="ss-container" ref={containerRef}>
      {label && <label className="ss-label">{label}</label>}

      <input
        className="ss-input"
        placeholder={placeholder}
        value={search}
        onFocus={() => setOpen(true)}
        onChange={(e) => {
          setSearch(e.target.value);
          setOpen(true);
        }}
      />

      {open && (
        <div className="ss-dropdown">
          {filteredOptions.length === 0 && (
            <div className="ss-item no-result">
              No results found
            </div>
          )}

          {filteredOptions.map((option) => (
            <div
              key={option.id}
              className="ss-item"
              onClick={() => {
                onChange(option);
                setSearch(option[displayKey]);
                setOpen(false);
              }}
            >
              {renderOption
                ? renderOption(option)
                : option[displayKey]}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchSelect;