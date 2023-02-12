import { Box, TextField } from '@mui/material';
import { Dispatch, SetStateAction, useContext, useRef } from 'react';
import { useParams } from 'react-router';
import ApartmentDto from '../../dto/ApartmentDetails.dto';
import { CommentDto } from '../../dto/Comment.dto';
import Apartment from '../../models/Apartment.model';
import Comment from '../../models/Comment.model';
import { createComment } from '../../services/comment.service';

import UserContext from '../userManager/UserManager';

interface Props {
  setApartment: Dispatch<SetStateAction<ApartmentDto>>;
}

function CommentForm({ setApartment }: Props) {
  const { user } = useContext(UserContext);
  const { apartmentId } = useParams();

  const commentTextFieldRef = useRef<HTMLTextAreaElement>(null);

  const onPostComment = async () => {
    const commentText = commentTextFieldRef?.current?.value;

    if (!commentText || !apartmentId) return;

    const comment: CommentDto = { text: commentText };

    try {
      const { data: res } = await createComment(comment, apartmentId);

      setApartment((state) => {
        if (state == null) return null;
        return { ...state, comments: [res, ...state.comments] };
      });
      commentTextFieldRef.current.value = '';
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <TextField
        label="Postavite pitanje ili komentarišite oglas"
        placeholder="Da li terasa ima pogled na parkk?"
        fullWidth
        multiline
        rows={2}
        variant="outlined"
        inputRef={commentTextFieldRef}
        disabled={!user}
        onKeyPress={(ev) => {
          if (ev.key === 'Enter' && !ev.shiftKey) {
            onPostComment();
            ev.preventDefault();
          }
        }}
      />
    </Box>
  );
}

export default CommentForm;
