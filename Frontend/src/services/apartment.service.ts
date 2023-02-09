import axios from 'axios';
import Apartment from '../models/Apartment.model';

export const getApartments = () => {
  return axios.get<Apartment[]>(`Apartment`);
};

export const getSingleApartment = (id: string) => {
  return axios.get<Apartment>(`Apartment/${id}`);
};

export const createApartmentAd = (data: FormData) => {
  return axios.post<Apartment>(`Apartment`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
