import React, { useEffect, useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Box,
  Heading,
  Select,
  Flex,
  IconButton,
  useDisclosure
} from '@chakra-ui/react';
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddEditPeopleModal from './AddEditPeopleModal';
import { getEmployees, createEmployee, updateEmployee, deleteEmployee } from '../services/employeeService';
import { Employee } from '../types';

const PeopleTable = () => {
  const [people, setPeople] = useState<Employee[]>([]);
  const [selectedPerson, setSelectedPerson] = useState<Employee | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const data = await getEmployees();
      if ('error' in data) {
        throw new Error(data.error);
      }
      setPeople(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
      toast.error('Error fetching employees');
    }
  };

  const handleEdit = (person: Employee) => {
    setSelectedPerson(person);
    onOpen();
    toast.info(`Edit ${person.displayName}`);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await deleteEmployee(id);
      // if ('error' in response) {
      //   throw new Error(response.error);
      // }
      fetchEmployees();
      toast.success('Employee deleted successfully');
    } catch (error) {
      console.error('Error deleting employee:', error);
      toast.error('Error deleting employee');
    }
  };

  const handleSave = async (employeeData: Employee) => {
    try {
      if (selectedPerson) {
        const response = await updateEmployee(selectedPerson.employeeId as any, employeeData);
        if ('error' in response) {
          throw new Error(response.error);
        }
        toast.success('Employee updated successfully');
      } else {
        const response = await createEmployee(employeeData);
        if ('error' in response) {
          throw new Error(response.error);
        }
        toast.success('Employee added successfully');
      }
      fetchEmployees();
      onClose();
    } catch (error) {
      console.error('Error saving employee:', error);
      toast.error(`Error saving employee: ${error}`);
    }
  };

  return (
    <Box p={5}>
      <Heading mb={5}>People</Heading>
      <Flex mb={5} justifyContent="space-between" alignItems="center">
        <Select placeholder="Employee Types" width="200px">
          <option value="Full time">Full Time</option>
          <option value="Part time">Part Time</option>
          <option value="Contract">Contract Basis</option>
        </Select>
        <Button colorScheme="blue" onClick={() => { setSelectedPerson(null); onOpen(); }}>Add People</Button>
      </Flex>
      <TableContainer>
        <Table variant="striped" colorScheme="gray">
          <Thead>
            <Tr>
              <Th>
                <Flex alignItems="center">
                  Display Name
                  <IconButton
                    aria-label="Sort Display Name"
                    icon={<ChevronUpIcon />}
                    size="xs"
                    variant="ghost"
                    ml={1}
                  />
                  <IconButton
                    aria-label="Sort Display Name Desc"
                    icon={<ChevronDownIcon />}
                    size="xs"
                    variant="ghost"
                    ml={1}
                  />
                </Flex>
              </Th>
              <Th>
                <Flex alignItems="center">
                  Emp ID
                  <IconButton
                    aria-label="Sort Emp ID"
                    icon={<ChevronUpIcon />}
                    size="xs"
                    variant="ghost"
                    ml={1}
                  />
                  <IconButton
                    aria-label="Sort Emp ID Desc"
                    icon={<ChevronDownIcon />}
                    size="xs"
                    variant="ghost"
                    ml={1}
                  />
                </Flex>
              </Th>
              <Th>Designation</Th>
              <Th>Emp. Type</Th>
              <Th>Experience</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {people.map((person) => (
              <Tr key={person.employeeId}>
                <Td>{person.displayName}</Td>
                <Td>{person.employeeId}</Td>
                <Td>{person.designation}</Td>
                <Td>{person.employeeType}</Td>
                <Td>{person.experience}</Td>
                <Td>
                  <Button colorScheme="blue" size="sm" onClick={() => handleEdit(person)}>Edit</Button>
                  <Button colorScheme="red" size="sm" ml={2} onClick={() => handleDelete(person.employeeId as any)}>Delete</Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <AddEditPeopleModal
        isOpen={isOpen}
        onClose={onClose}
        initialData={selectedPerson}
        onSave={handleSave}
      />
      <ToastContainer />
    </Box>
  );
};

export default PeopleTable;
