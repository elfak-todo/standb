import axios from 'axios';
import { CommentDto } from '../dto/Comment.dto';
import Comment from '../models/Comment.model';

export const createComment = (commentDto: CommentDto, apartmentId: string) => {
  return axios.post<Comment>(`Comment/${apartmentId}`, commentDto);
};

export const deleteComment = (commentId: string) => {
  return axios.delete<Comment>(`Comment/${commentId}`);
};
