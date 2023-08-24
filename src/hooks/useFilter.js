import {useSelector} from "react-redux";

export function useFilterHook(searchValue) {
  const {data} = useSelector((state) => state.allProducts);

  //   let filteredData = data;

  if (searchValue !== "")
    return data.filter((item) => item.name === searchValue);
  else return data;
  // Return the filtered data
  //   return filteredData;
}
