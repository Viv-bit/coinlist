import React from "react";
import { Input, InputGroup, InputRightElement, Button } from "@chakra-ui/react";

function Search({ handleChange }) {
  const [show, setShow] = React.useState(false);


  return (
    <InputGroup size="md" className="search-bar">
      <Input pr="4rem" type="text" placeholder="Search" name="searchTerm" onKeyUp={handleChange} />
    </InputGroup>
  );
}

export default Search;
