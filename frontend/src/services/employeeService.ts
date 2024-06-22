import axios from 'axios';
import { Employee } from '../types';

const API_URL = 'http://localhost:5000/v1/employees';

export const getEmployees = async (
  type?: string,
  page: number = 1,
  limit: number = 5,
  sortBy?: string,
  sortOrder: 'asc' | 'desc' = 'asc'
) => {
  try {
    const response = await axios.get(API_URL, {
      params: { type, page, limit, sortBy, sortOrder }
    });
    if (response.status === 200) {
      return response.data;
    } else {
      return { status: response.status, error: 'Failed to fetch employees' };
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return { status: error.response?.status || 500, error: error.message };
    } else {
      return { status: 500, error: 'An unknown error occurred' };
    }
  }
};

export const getEmployeeById = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    if (response.status === 200) {
      return response.data;
    } else {
      return { status: response.status, error: 'Failed to fetch employee' };
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return { status: error.response?.status || 500, error: error.message };
    } else {
      return { status: 500, error: 'An unknown error occurred' };
    }
  }
};

export const createEmployee = async (employeeData: Employee) => {
  try {
    const response = await axios.post(API_URL, employeeData);
    if (response.status === 201) {
      return response.data;
    } else {
      return { status: response.status, error: 'Failed to create employee' };
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return { status: error.response?.status || 500, error: error.message };
    } else {
      return { status: 500, error: 'An unknown error occurred' };
    }
  }
};

export const updateEmployee = async (employeeId: number, employeeData: Employee) => {
  try {
    const response = await axios.patch(`${API_URL}/${employeeId}`, employeeData);
    if (response.status === 200) {
      return response.data;
    } else {
      return { status: response.status, error: 'Failed to update employee' };
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return { status: error.response?.status || 500, error: error.message };
    } else {
      return { status: 500, error: 'An unknown error occurred' };
    }
  }
};

export const deleteEmployee = async (id: string) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    if (response.status === 200) {
      return response.data;
    } else {
      return { status: response.status, error: 'Failed to delete employee' };
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return { status: error.response?.status || 500, error: error.message };
    } else {
      return { status: 500, error: 'An unknown error occurred' };
    }
  }
};
