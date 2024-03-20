import React, { useState, useEffect, useRef } from "react";
import "./style.scss";

interface Item {
  id: string;
  label: string;
}

interface Props {
  placeholder: string;
  name: string;
  Item: Item[];
}
const DropdownSelect = ({
  placeholder,
  name,
  Item,
}: Props) => {
  const [selectedItems, setSelectedItems] = useState<Item[]>(Item);
  const [inputValue, setInputValue] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter" && inputValue.trim()) {
      const newItem: Item = {
        id: Date.now().toString(),
        label: inputValue + "❓",
      };
      setSelectedItems([...selectedItems, newItem]);
      setInputValue("");
      setIsDropdownOpen(true);
    }
  };
  const handleCloseEvent = (item: Item) => {
    setInputValue(item.label);
    setIsDropdownOpen(false);
  };
  const handleDocumentClick = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);
  return (
    <div
      className={isDropdownOpen ? "dropdown" : "dropdown active"}
      ref={dropdownRef}
    >
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleInputKeyPress}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        placeholder={placeholder}
        name={name}
      />
      {isDropdownOpen && (
        <div className="option">
          <ul style={{ listStyleType: "none" }}>
            {selectedItems.map((item) => (
              <div onClick={() => handleCloseEvent(item)}>
                <li key={item.id}>{item.label}</li>
              </div>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownSelect;
