import React from "react";
import { Box } from "@mui/material";
import CountdownTimer from "./components/CountdownTimer";

const App: React.FC = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", width: "100%" }}>
      <CountdownTimer />
    </Box>
  );
};

export default App;
