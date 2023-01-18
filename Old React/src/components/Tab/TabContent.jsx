import { Paper } from "@mui/material";
import { useSelector } from "react-redux";

export default function TabContent({ id, children }) {
  const selectedTab = useSelector((state) => state.tabs.selectedTab);

  if (id == selectedTab) {
    return (
      <Paper
        elevation={1}
        style={{ borderRadius: 0, borderLeft: "1px solid #dddfeb" }}
      >
        {children}
      </Paper>
    );
  } else {
    return null;
  }
}
