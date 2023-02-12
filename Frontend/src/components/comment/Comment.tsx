import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Dispatch, SetStateAction, useState } from 'react';
import Comment from '../../models/Comment.model';
import { dateSrp } from '../../dateParser';
import { deleteComment } from '../../services/comment.service';
import Apartment from '../../models/Apartment.model';
import ApartmentDto from '../../dto/ApartmentDetails.dto';

interface Props {
  comment: Comment;
  setApartment: Dispatch<SetStateAction<ApartmentDto>>;
}

function CommentCard({ comment, setApartment }: Props) {
  const author = comment.author;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleDelete = async () => {
    try {
      await deleteComment(comment.id);

      setApartment((state) => {
        if (!state) return state;
        return {
          ...state,
          comments: state.comments.filter((c) => c.id != comment.id),
        };
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Card sx={{ mt: 2.5 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }}>
            {author.firstName[0]}
            {author.lastName[0]}
          </Avatar>
        }
        action={
          <IconButton onClick={(event) => setAnchorEl(event.currentTarget)}>
            <MoreVertIcon />
          </IconButton>
        }
        title={author.firstName + ' ' + author.lastName}
        subheader={dateSrp(comment.publicationTime)}
      />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={handleDelete} sx={{ color: 'red' }}>
          Obriši
        </MenuItem>
      </Menu>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {comment.text}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default CommentCard;
