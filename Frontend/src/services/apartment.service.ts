import axios from 'axios';
import { baseURL } from '../config';
import ApartmentDto from '../dto/ApartmentDetails.dto';
import { SearchParams } from '../interfaces/SearchParams.interface';
import Apartment from '../models/Apartment.model';

export const getApartments = (searchParams: SearchParams) => {
  const url = new URL('Apartment', baseURL);

  Object.entries(searchParams).forEach((entry) => {
    const [key, value] = entry;
    url.searchParams.append(key, value);
  });

  return axios.get<Apartment[]>(url.toString());
};

export const getFavouriteApartments = () => {
  return axios.get<Apartment[]>(`Apartment/favourites`);
};

export const getSingleApartment = (id: string) => {
  return axios.get<ApartmentDto>(`Apartment/${id}`);
};

export const createApartmentAd = (data: FormData) => {
  return axios.post<Apartment>(`Apartment`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const editApartmentAd = (id: string, data: FormData) => {
  return axios.patch<Apartment>(`/Apartment/${id}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const deleteApartmentAd = (id: string) => {
  return axios.delete<boolean>(`/Apartment/${id}`);
};
