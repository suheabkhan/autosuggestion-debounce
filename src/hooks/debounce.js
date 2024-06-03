const debounce = (fn, d) => {
  console.log("inside 1");
  let timeout;
  return function (...args) {
    if (timeout) {
      clearTimeout(timeout);
    }
    return new Promise((resolve) => {
      clearTimeout(timeout);
      timeout = setTimeout(async () => {
        const data = await fn(...args);
        resolve(data);
      }, d);
    });
  };
};
const fetchSuggestions = async (query) => {
  console.log("Query is ", query);
  const response = await fetch(
    `https://dummyjson.com/recipes/search?q=${query}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const result = await response.json();
  console.log(result);
  return result.recipes;
};
const useDebounce = debounce(fetchSuggestions, 1000);

export default useDebounce;
