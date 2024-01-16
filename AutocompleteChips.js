import React, { useState, useRef } from 'react';
import './AutocompleteChips.css';

const AutocompleteChips = () => {
  const [inputValue, setInputValue] = useState('');
  const [availableItems, setAvailableItems] = useState(['Apple', 'Banana', 'Orange', 'Grapes','Gauva','Pineaaple']);
  const [selectedChips, setSelectedChips] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [showList, setShowList] = useState(false);
  const inputRef = useRef(null);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    // Filter and update availableItems based on input value
    const filtered = availableItems.filter(
      (item) => item.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredItems(filtered);
    setShowList(true);
  };

  const handleItemClick = (item) => {
    setSelectedChips([...selectedChips, item]);
    setAvailableItems(availableItems.filter((i) => i !== item));
    setInputValue('');
    setFilteredItems([]);
    setShowList(false);
    inputRef.current.focus();
  };

  const handleChipRemove = (chip) => {
    setSelectedChips(selectedChips.filter((item) => item !== chip));
    setAvailableItems([...availableItems, chip]);
  };

  const handleInputFocus = () => {
    setShowList(true);
  };

  const handleInputKeyDown = (event) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      setSelectedChips([...selectedChips, inputValue.trim()]);
      setInputValue('');
      setShowList(false);
    } else if (event.key === 'Backspace' && inputValue === '' && selectedChips.length > 0) {
      const lastChip = selectedChips[selectedChips.length - 1];
      handleChipRemove(lastChip);
    }
  };

  return (
    <div className="autocomplete-chips-container">
      <div className="chips-container">
        {selectedChips.map((chip, index) => (
          <div key={index} className="chip">
            {chip}
            <button className="delete-button" onClick={() => handleChipRemove(chip)}>
              X
            </button>
          </div>
        ))}
      </div>
      <div className="autocomplete-box">
      <h3>Pick User</h3>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyDown={handleInputKeyDown}
          placeholder="Add users."
          ref={inputRef}
          className="autocomplete-input"
        />
        {showList && filteredItems.length > 0 && (
          <div className="autocomplete-list">
            {filteredItems.map((item) => (
              <div key={item} onClick={() => handleItemClick(item)}>
                {item}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AutocompleteChips;
