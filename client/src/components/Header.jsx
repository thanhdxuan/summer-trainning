import { Typography, Box, useTheme } from "@mui/material"
import { tokens } from "../theme"

const Header = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode)
    return (
         // Header
        <Box>
            <Typography
               variant="h4"
               color={colors.blackAccent[800]}
               fontWeight="bold"
            >Browse exam</Typography>
        </Box>
    )
}

export default Header;