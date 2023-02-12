import { Card, CardContent, CardHeader } from '@mui/material';
import { Dispatch, SetStateAction, useState } from 'react';
import ApartmentDto from '../../dto/ApartmentDetails.dto';
import Apartment from '../../models/Apartment.model';
import Comment from '../../models/Comment.model';
import CommentCard from '../comment/Comment';
import CommentForm from '../commentForm/CommentForm';

import './CommentSection.css';

interface Props {
  apartment: Apartment;
  setApartment: Dispatch<SetStateAction<ApartmentDto>>;
}

function CommentSection({ apartment, setApartment }: Props) {
  const comments = apartment.comments;

  return (
    <Card className="section-main-div">
      <CardHeader
        title="Pitanja i komentari"
        subheader="Komentare mogu postaviti samo registrovani korisnici."
      />
      <CardContent>
        <CommentForm setApartment={setApartment} />
        {comments.map((c) => (
          <CommentCard
            key={c.id}
            comment={c}
            setApartment={setApartment}
          ></CommentCard>
        ))}
      </CardContent>
    </Card>
  );
}

export default CommentSection;
