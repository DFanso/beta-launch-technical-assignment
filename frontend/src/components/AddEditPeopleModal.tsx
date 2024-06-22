import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Grid,
  GridItem
} from '@chakra-ui/react';
import { Employee } from '../types';

interface AddEditPeopleModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: Employee | null;
  onSave: (data: Employee) => void;
}

const defaultEmployee: Employee = {
  fullName: '',
  initials: '',
  displayName: '',
  gender: '',
  dateOfBirth: '',
  email: '',
  mobileNumber: '',
  designation: '',
  employeeType: 'Full time',
  experience: 0,
  joinedDate: '',
  salary: 0,
  personalNotes: ''
};

const AddEditPeopleModal: React.FC<AddEditPeopleModalProps> = ({ isOpen, onClose, initialData, onSave }) => {
  const [formData, setFormData] = useState<Employee>(initialData || defaultEmployee);

  useEffect(() => {
    setFormData(initialData || defaultEmployee);
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'experience' || name === 'salary') {
      setFormData({ ...formData, [name]: Number(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = () => {
    const { _id, __v, ...cleanData } = formData;
    onSave(cleanData as Employee);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{initialData ? 'Edit People' : 'Add People'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Grid templateColumns="repeat(2, 1fr)" gap={4}>
            <GridItem colSpan={2}>
              <FormControl id="fullName" isRequired>
                <FormLabel>Full Name</FormLabel>
                <Input name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} />
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl id="initials" isRequired>
                <FormLabel>Name with Initials</FormLabel>
                <Input name="initials" placeholder="Name with Initials" value={formData.initials} onChange={handleChange} />
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl id="displayName" isRequired>
                <FormLabel>Preferred / Display Name</FormLabel>
                <Input name="displayName" placeholder="Preferred / Display Name" value={formData.displayName} onChange={handleChange} />
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl id="gender" isRequired>
                <FormLabel>Gender</FormLabel>
                <Select name="gender" placeholder="Select Gender" value={formData.gender} onChange={handleChange}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Select>
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl id="dateOfBirth" isRequired>
                <FormLabel>Date of Birth</FormLabel>
                <Input name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleChange} />
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl id="mobileNumber" isRequired>
                <FormLabel>Mobile Number</FormLabel>
                <Input name="mobileNumber" placeholder="Mobile Number" value={formData.mobileNumber} onChange={handleChange} />
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl id="designation" isRequired>
                <FormLabel>Designation</FormLabel>
                <Input name="designation" placeholder="Designation" value={formData.designation} onChange={handleChange} />
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl id="employeeType" isRequired>
                <FormLabel>Employee Type</FormLabel>
                <Select name="employeeType" placeholder="Select Employee Type" value={formData.employeeType} onChange={handleChange}>
                  <option value="Full time">Full Time</option>
                  <option value="Part time">Part Time</option>
                  <option value="Contract">Contract Basis</option>
                </Select>
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl id="joinedDate" isRequired>
                <FormLabel>Joined Date</FormLabel>
                <Input name="joinedDate" type="date" value={formData.joinedDate} onChange={handleChange} />
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl id="experience" isRequired>
                <FormLabel>Experience</FormLabel>
                <Input name="experience" type="number" placeholder="Experience" value={formData.experience} onChange={handleChange} />
              </FormControl>
            </GridItem>
            <GridItem colSpan={2}>
              <FormControl id="salary" isRequired>
                <FormLabel>Salary</FormLabel>
                <Input name="salary" type="number" placeholder="Salary" value={formData.salary} onChange={handleChange} />
              </FormControl>
            </GridItem>
            <GridItem colSpan={2}>
              <FormControl id="personalNotes">
                <FormLabel>Personal Notes</FormLabel>
                <Textarea name="personalNotes" placeholder="Personal Notes" value={formData.personalNotes} onChange={handleChange} />
              </FormControl>
            </GridItem>
          </Grid>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={handleSubmit}>{initialData ? 'Save Changes' : 'Add People'}</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddEditPeopleModal;
