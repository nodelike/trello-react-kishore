import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";

const ErrorPage = () => {
  return (
    <Box
      className="content"
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
        flexDirection: "column",
        bgcolor: "#111",
      }}
    >
      <Typography 
        variant="h1" 
        sx={{ 
          fontSize: { xs: "2rem", sm: "3rem", md: "4rem", lg: "5rem" }, 
          fontWeight: 700, 
          mb: 2, 
          color: "white" 
        }}
      >
        404
      </Typography>

      <Typography 
        variant="h3" 
        sx={{ 
          fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem", lg: "3rem" }, 
          mb: 2, 
          color: "white" 
        }}
      >
        Page Not Found
      </Typography>

      <Button
        component={Link}
        to="/boards"
        variant="text"
        sx={{ 
          fontSize: "1rem", 
          textDecoration: "none", 
          color: "white" 
        }}
      >
        Go back to view boards
      </Button>
    </Box>
  );
};

export default ErrorPage;
