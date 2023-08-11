import { useState } from 'react';
import { Box, IconButton, useTheme } from '@mui/material'
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search'
import { tokens } from '../../../theme';

const SearchBar = ({ onSearch }) => {
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);

   const [searchTerm, setSearchTerm] = useState("");

   const handleInputChange = (event) => {
      setSearchTerm(event.target.value);
   };

   const handleSubmit = (event) => {
      event.preventDefault();
      onSearch(searchTerm);
   };

   const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
         handleSubmit(event);
      }
   };

   return (
      <Box
         display="flex"
         backgroundColor={colors.grayAccent[100]}
         borderRadius="3px"
         border='0.5px solid'
         borderColor={colors.grayAccent[600]}
         height='50px'
      >
         <InputBase
            sx={{
               ml: 2,
               flex: 1,
               '.MuiInputBase-input::placeholder': {
                  color: colors.blackAccent[800],
                  fontWeight: "bold"
               }
            }}
            placeholder='Find the topic'
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            value={searchTerm}
         >
            Search Topics
         </InputBase>
         <IconButton onClick={handleSubmit}>
            <SearchIcon></SearchIcon>
         </IconButton>
      </Box>
   );
}

export default SearchBar;