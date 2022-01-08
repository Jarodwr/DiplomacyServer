import {
  Box
} from "@mui/material";
import { BeginGameForm } from "./BeginGameForm";

export type SidePanelProps = {

}

export const SidePanel: React.FC<SidePanelProps> = props => {
  return (
    <Box sx={{ padding: 1 }}>
      <BeginGameForm />
    </Box>
  );
}