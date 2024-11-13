import React, { useState, useEffect } from "react";
import Select from "react-select";
import usePlacesAutocomplete from "use-places-autocomplete";

const PlacesAutocomplete = ({ setSelected, address }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const [inputValue, setInputValue] = useState(address || ""); // Track what the user types, with initial value

  // Handle the user input and update inputValue
  const handleInputChange = (newInputValue) => {
    setInputValue(newInputValue); // Update the typed input value
    setValue(newInputValue, true); // Query places based on what the user types
  };

  // Handle when a suggestion is selected
  const handleSelect = async (selectedOption) => {
    const selectedAddress = selectedOption.label;
    setValue(selectedAddress, false); // Update the input field with the selected address
    clearSuggestions(); // Clear suggestions from the dropdown
    setSelected(selectedAddress); // Pass the selected address back to the parent component
  };

  // Map suggestions to react-select options format
  const options = data.map(({ place_id, description }) => ({
    label: description,
    value: place_id,
  }));

  // Update input value if the address prop changes
  useEffect(() => {
    setInputValue(address || ""); // Reset input value if address prop changes
  }, [address]);

  const customStyles = {
    control: (provided) => ({
      ...provided,
      height: 35, // Adjust the height of the input
      borderRadius: "8px", // Rounded corners
      padding: "0 10px", // Padding inside the input
      border: "1px solid #d1d5db", // Border color
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "white", // Dropdown background
      borderRadius: "8px", // Rounded corners for the dropdown
      zIndex: 10,
    }),
    option: (provided, state) => ({
      ...provided,
      padding: "10px",
      backgroundColor: state.isSelected
        ? "#e0f7fa"
        : state.isFocused
        ? "#f0f0f0"
        : "white",
      color: "black",
      cursor: "pointer",
    }),
  };

  return (
    <Select
      options={options} // Use the suggestions as options
      onChange={handleSelect} // Handle selection of an option
      onInputChange={handleInputChange} // Track input change
      inputValue={inputValue} // Ensure the typed value is shown in the input field
      isDisabled={!ready} // Disable if Places API is not ready
      className="select-input flex-col my-2 mx-0 h-8 rounded-lg outline-emerald-400"
      placeholder="Search location"
      styles={customStyles}
    />
  );
};

export default PlacesAutocomplete;
