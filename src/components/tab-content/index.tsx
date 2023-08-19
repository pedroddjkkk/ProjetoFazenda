import { Paper } from "@mui/material";
import { useTabs } from "@/lib/stores";

export default function TabContent({ id, component }) {
  const selectedTab = useTabs((state) => state.selectedTab);

  if (id == selectedTab) {
    return (
      <Paper
        elevation={1}
        style={{ borderRadius: 0, borderLeft: "1px solid rgb(236 239 255)" }}
      >
        {component}
      </Paper>
    );
  } else {
    return null;
  }
}
