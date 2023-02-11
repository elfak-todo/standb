import { Card, CardContent, CardHeader } from '@mui/material';
import Comment from '../comment/Comment';
import CommentForm from '../commentForm/CommentForm';

import './CommentSection.css';

function CommentSection() {
  return (
    <Card className="section-main-div">
      <CardHeader
        title="Pitanja i komentari"
        subheader="Komentare mogu postaviti samo registrovani korisnici."
      />
      <CardContent>
        <CommentForm />
        <Comment />
        <Comment />
        <Comment />
      </CardContent>
    </Card>
  );
}

export default CommentSection;
