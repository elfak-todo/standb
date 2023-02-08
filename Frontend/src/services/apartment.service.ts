import axios from 'axios';
import Apartment from '../models/Apartment.model';

export const getApartments = () => {
  return axios.get<Apartment[]>(`Apartment`);
};

export const createApartmentAd = (data: FormData) => {
  return axios.post<Apartment>(`Apartment`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
