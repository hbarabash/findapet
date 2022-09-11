import { Button } from "@material-ui/core";

interface CustomButtonProps {
  title: string;
  onClick: () => void;
  className: string;
}

export const CustomButton = (props: CustomButtonProps) => {
  const { title, onClick } = props;
  return (
    <Button className={props.className} variant={"contained"} onClick={onClick}>
      {title}
    </Button>
  );
};
