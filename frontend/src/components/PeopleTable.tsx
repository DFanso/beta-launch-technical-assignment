import React from 'react';
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
  Flex
} from '@chakra-ui/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PeopleTable = () => {
  const people = [
    { displayName: "Corey Curtis", empId: "0001", designation: "Senior Developer", empType: "Full Time", experience: "02 Years" },
    { displayName: "Alfonso Stanton", empId: "0002", designation: "Senior Front-End Developer", empType: "Part Time", experience: "03 Years" },
    { displayName: "Justin Aminoff", empId: "0003", designation: "Senior Developer", empType: "Contract Basis", experience: "02 Years" },
    { displayName: "Leo Geidt", empId: "0004", designation: "User Experience Designer", empType: "Other", experience: "01 Year" },
    { displayName: "Jaydon Workman", empId: "0005", designation: "Senior Developer", empType: "Part Time", experience: "03 Years" },
    { displayName: "Buben Levin", empId: "0006", designation: "Senior Developer", empType: "Contract Basis", experience: "03 Years" },
    { displayName: "Omar Passaquindici Arcand", empId: "0007", designation: "Senior Developer", empType: "Full Time", experience: "02 Years" },
    { displayName: "Phillip Mango", empId: "0008", designation: "Senior Developer", empType: "Contract Basis", experience: "05 Years" },
    { displayName: "Martin Workman", empId: "0009", designation: "Sales Officer", empType: "Full Time", experience: "02 Years" },
    { displayName: "Ruben Dokidis", empId: "0010", designation: "Senior Developer", empType: "Full Time", experience: "06 Years" },
    { displayName: "Ruben Dokidis", empId: "0011", designation: "Guest Admin", empType: "Part Time", experience: "09 Years" },
  ];

  const handleEdit = (name: string) => {
    toast.info(`Edit ${name}`);
  };

  const handleDelete = (name: string) => {
    toast.error(`Delete ${name}`);
  };

  return (
    <Box p={5}>
      <Heading mb={5}>People</Heading>
      <Flex mb={5} justifyContent="space-between" alignItems="center">
        <Select placeholder="Employee Types" width="200px">
          <option value="full-time">Full Time</option>
          <option value="part-time">Part Time</option>
          <option value="contract">Contract Basis</option>
          <option value="other">Other</option>
        </Select>
        <Button colorScheme="blue">Add People</Button>
      </Flex>
      <TableContainer>
        <Table variant="striped" colorScheme="gray">
          <Thead>
            <Tr>
              <Th>Display Name</Th>
              <Th>Emp ID</Th>
              <Th>Designation</Th>
              <Th>Emp. Type</Th>
              <Th>Experience</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {people.map((person) => (
              <Tr key={person.empId}>
                <Td>{person.displayName}</Td>
                <Td>{person.empId}</Td>
                <Td>{person.designation}</Td>
                <Td>{person.empType}</Td>
                <Td>{person.experience}</Td>
                <Td>
                  <Button colorScheme="blue" size="sm" onClick={() => handleEdit(person.displayName)}>Edit</Button>
                  <Button colorScheme="red" size="sm" ml={2} onClick={() => handleDelete(person.displayName)}>Delete</Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <ToastContainer />
    </Box>
  );
};

export default PeopleTable;
