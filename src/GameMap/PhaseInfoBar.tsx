import {
  Paper,
  Stack,
  Typography,
  Stepper,
  Step,
  StepLabel
} from "@mui/material";
import { SeasonEnum } from "../model/Turn";
import { useStore } from "../Store";

export const PhaseInfoBar = () => {
  const turn = useStore(state => state.turn);
  return (
    <Paper sx={{ marginX: 3 }}>
      <Stack
        direction='row'
        spacing={3}
        sx={{ flexGrow: 1 }}
        alignItems='stretch'>
        <Stack direction='column' alignItems='center'>
          <Typography variant='subtitle1'>
            {turn.year}
          </Typography>
          <Typography variant='subtitle2'>
            {turn.season}
          </Typography>
        </Stack>
        <Stepper activeStep={turn.phase.type} sx={{ flexGrow: 1 }}>
          <Step key={0}>
            <StepLabel>Order</StepLabel>
          </Step>
          <Step key={1}>
            <StepLabel>Resolve</StepLabel>
          </Step>
          <Step key={2}>
            <StepLabel>Retreat</StepLabel>
          </Step>
          <Step key={3}>
            <StepLabel>Disband</StepLabel>
          </Step>
          {turn.season === SeasonEnum.Fall &&
            <Step key={4}>
              <StepLabel>Build</StepLabel>
            </Step>}
        </Stepper>
      </Stack>
    </Paper>
  );
}