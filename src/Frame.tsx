import { Container } from "@mui/material";

export type FrameProps = {

}

export const Frame: React.FC<FrameProps> = props => {
  return (
    <Container>
      {props.children}
    </Container>
  );
}