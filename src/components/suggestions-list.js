import React from "react";
const SuggestionList = ({
  suggestions = [],
  highlight,
  dataKey,
  onSuggestionClick,
}) => {
  const getHighlightedText = (text, highlight) => {
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return (
      <span>
        {parts.map((part, index) => {
          return part.toLowerCase() === highlight.toLowerCase() ? (
            <b key={index}>{part}</b>
          ) : (
            part
          );
        })}
      </span>
    );
  };

  return (
    <React.Fragment>
      {suggestions.map((suggestion, index) => {
        const current = suggestion[dataKey];
        return (
          <li
            key={index}
            onClick={() => {
              onSuggestionClick(suggestion);
            }}
            className="suggestionItem"
          >
            {getHighlightedText(current, highlight)}
          </li>
        );
      })}
    </React.Fragment>
  );
};

export default SuggestionList;
