import { useEffect, useState } from "react";
import SuggestionList from "./suggestions-list";
import useDebounce from "../hooks/debounce";
import "./styles.css";
const AutoComplete = ({
  placeholder = "",
  dataKey,
  customLoading = "Loading ....",
}) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  console.log(suggestions);
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const getSuggestions = async (query) => {
    setError(null);
    setLoading(true);
    try {
      let result = await useDebounce(query);
      setSuggestions(result);
    } catch (error) {
      console.log(error);
      setError("Failed to fetch suggestions");
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (inputValue.length > 1) {
      getSuggestions(inputValue);
    } else {
      setSuggestions([]);
    }
  }, [inputValue]);

  const onSuggestionClick = (suggestionSelected) => {
    const current = suggestionSelected[dataKey];
    setInputValue(current);
    setSuggestions([]);
  };
  return (
    <div className="container">
      <input
        type="text"
        value={inputValue}
        placeholder={placeholder}
        onChange={(e) => {
          handleInputChange(event);
        }}
      />
      {error && <div className="error">{error}</div>}
      {loading && <div className="loading">{customLoading}</div>}
      {suggestions && suggestions.length > 0 && !loading && !error && (
        <ul className="suggestionList">
          <SuggestionList
            dataKey={dataKey}
            suggestions={suggestions}
            highlight={inputValue}
            onSuggestionClick={onSuggestionClick}
          />
        </ul>
      )}
    </div>
  );
};

export default AutoComplete;
