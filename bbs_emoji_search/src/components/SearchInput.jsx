import { Box, TextField } from "@mui/material";

export default function SearchInput({ handleChange }) {
    function handleOnchange(e) {
    handleChange(e.target.value)
    }

    return (
    <Box>
        <TextField onChange={handleOnchange} fullWidth label='Rechercher un emoji'/>
    </Box>
    )
}