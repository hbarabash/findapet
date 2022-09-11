import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import { Button } from "@material-ui/core";
import { isCookie } from "../../utils/cookieUtils";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";

interface CustomButtonProps {
  title: string;
  id: number;
  image: string | undefined;
  onClick: () => void;
  className: string;
}

export const BookmarkButton = (props: CustomButtonProps) => {
  const { title, onClick } = props;
  return (
    <Button className={props.className} variant={"contained"} onClick={onClick}>
      {isCookie(title) ? <BookmarkAddedIcon /> : <BookmarkAddIcon />}
    </Button>
  );
};
