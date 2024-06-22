import axios from 'axios';
import { Employee } from '../types';

const API_URL = 'http://localhost:5000/v1/employees';

export const getEmployees = async (type?: string, page: number = 1, limit: number = 5) => {
  const response = await axios.get(API_URL, {
    params: { type, page, limit }
  });
  return response.data;
};

export const getEmployeeById = async (id: string) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createEmployee = async (employeeData: Employee) => {
  const response = await axios.post(API_URL, employeeData);
  return response.data;
};

export const updateEmployee = async (employeeId: number, employeeData: Employee) => {
  const response = await axios.patch(`${API_URL}/${employeeId}`, employeeData);
  return response.data;
};

export const deleteEmployee = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
