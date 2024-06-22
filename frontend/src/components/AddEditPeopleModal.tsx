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
  GridItem,
  FormErrorMessage
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

const formatDateString = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const validatePhoneNumber = (phone: string) => {
  const re = /^\d{10}$/; // Simple validation for 10 digit phone number
  return re.test(phone);
};

const AddEditPeopleModal: React.FC<AddEditPeopleModalProps> = ({ isOpen, onClose, initialData, onSave }) => {
  const [formData, setFormData] = useState<Employee>(initialData || defaultEmployee);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      const formattedData = {
        ...initialData,
        dateOfBirth: initialData.dateOfBirth ? formatDateString(initialData.dateOfBirth) : '',
        joinedDate: initialData.joinedDate ? formatDateString(initialData.joinedDate) : ''
      };
      setFormData(formattedData);
    } else {
      setFormData(defaultEmployee);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'experience' || name === 'salary') {
      setFormData({ ...formData, [name]: Number(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName) newErrors.fullName = 'Full Name is required';
    if (!formData.initials) newErrors.initials = 'Name with Initials is required';
    if (!formData.displayName) newErrors.displayName = 'Preferred / Display Name is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of Birth is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.mobileNumber) {
      newErrors.mobileNumber = 'Mobile Number is required';
    } else if (!validatePhoneNumber(formData.mobileNumber)) {
      newErrors.mobileNumber = 'Invalid phone number format';
    }
    if (!formData.designation) newErrors.designation = 'Designation is required';
    if (!formData.employeeType) newErrors.employeeType = 'Employee Type is required';
    if (!formData.joinedDate) newErrors.joinedDate = 'Joined Date is required';
    if (!formData.experience) newErrors.experience = 'Experience is required';
    if (!formData.salary) newErrors.salary = 'Salary is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    const { _id, __v, ...cleanData } = formData;  // Exclude _id and __v
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
              <FormControl id="fullName" isRequired isInvalid={!!errors.fullName}>
                <FormLabel>Full Name</FormLabel>
                <Input name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} />
                <FormErrorMessage>{errors.fullName}</FormErrorMessage>
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl id="initials" isRequired isInvalid={!!errors.initials}>
                <FormLabel>Name with Initials</FormLabel>
                <Input name="initials" placeholder="Name with Initials" value={formData.initials} onChange={handleChange} />
                <FormErrorMessage>{errors.initials}</FormErrorMessage>
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl id="displayName" isRequired isInvalid={!!errors.displayName}>
                <FormLabel>Preferred / Display Name</FormLabel>
                <Input name="displayName" placeholder="Preferred / Display Name" value={formData.displayName} onChange={handleChange} />
                <FormErrorMessage>{errors.displayName}</FormErrorMessage>
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl id="gender" isRequired isInvalid={!!errors.gender}>
                <FormLabel>Gender</FormLabel>
                <Select name="gender" placeholder="Select Gender" value={formData.gender} onChange={handleChange}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Select>
                <FormErrorMessage>{errors.gender}</FormErrorMessage>
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl id="dateOfBirth" isRequired isInvalid={!!errors.dateOfBirth}>
                <FormLabel>Date of Birth</FormLabel>
                <Input name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleChange} />
                <FormErrorMessage>{errors.dateOfBirth}</FormErrorMessage>
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl id="email" isRequired isInvalid={!!errors.email}>
                <FormLabel>Email</FormLabel>
                <Input name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl id="mobileNumber" isRequired isInvalid={!!errors.mobileNumber}>
                <FormLabel>Mobile Number</FormLabel>
                <Input name="mobileNumber" placeholder="Mobile Number" value={formData.mobileNumber} onChange={handleChange} />
                <FormErrorMessage>{errors.mobileNumber}</FormErrorMessage>
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl id="designation" isRequired isInvalid={!!errors.designation}>
                <FormLabel>Designation</FormLabel>
                <Input name="designation" placeholder="Designation" value={formData.designation} onChange={handleChange} />
                <FormErrorMessage>{errors.designation}</FormErrorMessage>
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl id="employeeType" isRequired isInvalid={!!errors.employeeType}>
                <FormLabel>Employee Type</FormLabel>
                <Select name="employeeType" placeholder="Select Employee Type" value={formData.employeeType} onChange={handleChange}>
                  <option value="Full time">Full Time</option>
                  <option value="Part time">Part Time</option>
                  <option value="Contract">Contract Basis</option>
                </Select>
                <FormErrorMessage>{errors.employeeType}</FormErrorMessage>
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl id="joinedDate" isRequired isInvalid={!!errors.joinedDate}>
                <FormLabel>Joined Date</FormLabel>
                <Input name="joinedDate" type="date" value={formData.joinedDate} onChange={handleChange} />
                <FormErrorMessage>{errors.joinedDate}</FormErrorMessage>
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl id="experience" isRequired isInvalid={!!errors.experience}>
                <FormLabel>Experience</FormLabel>
                <Input name="experience" type="number" placeholder="Experience" value={formData.experience} onChange={handleChange} />
                <FormErrorMessage>{errors.experience}</FormErrorMessage>
              </FormControl>
            </GridItem>
            <GridItem colSpan={2}>
              <FormControl id="salary" isRequired isInvalid={!!errors.salary}>
                <FormLabel>Salary</FormLabel>
                <Input name="salary" type="number" placeholder="Salary" value={formData.salary} onChange={handleChange} />
                <FormErrorMessage>{errors.salary}</FormErrorMessage>
              </FormControl>
            </GridItem>
            <GridItem colSpan={2}>
              <FormControl id="personalNotes" isInvalid={!!errors.personalNotes}>
                <FormLabel>Personal Notes</FormLabel>
                <Textarea name="personalNotes" placeholder="Personal Notes" value={formData.personalNotes} onChange={handleChange} />
                <FormErrorMessage>{errors.personalNotes}</FormErrorMessage>
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
