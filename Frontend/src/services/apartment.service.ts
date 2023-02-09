import axios from 'axios';
import { baseURL } from '../config';
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
