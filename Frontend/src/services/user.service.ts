import axios from 'axios';
import UserLoginDetails from '../dto/User.login.details.dto';
import UserLoginDto from '../dto/User.login.dto';
import UserRegisterDto from '../dto/User.register.dto';

export const login = (data: UserLoginDto) => {
  return axios.post<UserLoginDetails>(`User/login`, data);
};

export const register = (data: UserRegisterDto) => {
  return axios.post<boolean>(`User/register`, data);
};

export const toggleFavouriteApartment = (apartmentId: string) => {
  return axios.patch<boolean>(`User/toggleFavourite/${apartmentId}`);
};
