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
  useDisclosure,
  HStack,
  Text,
  Spinner,
  Divider,
} from '@chakra-ui/react';
import { ChevronUpIcon, ChevronDownIcon, ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddEditPeopleModal from './AddEditPeopleModal';
import { getEmployees, createEmployee, updateEmployee, deleteEmployee } from '../services/employeeService';
import { Employee } from '../types';

const PeopleTable = () => {
  const [people, setPeople] = useState<Employee[]>([]);
  const [selectedPerson, setSelectedPerson] = useState<Employee | null>(null);
  const [employeeType, setEmployeeType] = useState<string | undefined>(undefined);
  const [sortBy, setSortBy] = useState<string | undefined>(undefined);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    fetchEmployees();
  }, [employeeType, sortBy, sortOrder, page]);

  const fetchEmployees = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getEmployees(employeeType, page, 5, sortBy, sortOrder);
      if ('error' in data) {
        throw new Error(data.error);
      }
      setPeople(data.employees || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error('Error fetching employees:', error);
      setError('Error fetching employees');
      toast.error('Error fetching employees');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (person: Employee) => {
    setSelectedPerson(person);
    onOpen();
    toast.info(`Edit ${person.displayName}`);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteEmployee(id);
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
      toast.error(`${error}`);
    }
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setEmployeeType(event.target.value || undefined);
  };

  const handleSort = (field: string) => {
    setSortBy(field);
    setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <Box p={5}>
      <Heading mb={5}>People</Heading>
      <Divider mb={2} borderWidth="1.5px"/>
      <Flex mb={5} justifyContent="Right" alignItems="center" marginRight='10px'>
        <Select placeholder="Employee Types" width="200px" marginRight='10px' onChange={handleTypeChange}>
          <option value="Full time">Full Time</option>
          <option value="Part time">Part Time</option>
          <option value="Contract">Contract Basis</option>
        </Select>
        <Button color="white" backgroundColor="#00318C" onClick={() => { setSelectedPerson(null); onOpen(); }}>Add People</Button>
      </Flex>
      {loading ? (
        <Flex justifyContent="center" alignItems="center" height="200px">
          <Spinner size="xl" />
        </Flex>
      ) : error ? (
        <Text color="red.500">{error}</Text>
      ) : (
        <TableContainer mx="auto" width="80%">
          <Table variant="" colorScheme="gray">
            <Thead backgroundColor="gray.100">
              <Tr>
                <Th border="1px solid" borderColor="gray.200">
                  <Flex alignItems="center">
                    Display Name
                    <IconButton
                      aria-label="Sort Display Name"
                      icon={<ChevronUpIcon />}
                      size="xs"
                      variant="ghost"
                      ml={1}
                      onClick={() => handleSort('displayName')}
                    />
                    <IconButton
                      aria-label="Sort Display Name Desc"
                      icon={<ChevronDownIcon />}
                      size="xs"
                      variant="ghost"
                      ml={1}
                      onClick={() => handleSort('displayName')}
                    />
                  </Flex>
                </Th>
                <Th border="1px solid" borderColor="gray.200">
                  <Flex alignItems="center">
                    Emp ID
                    <IconButton
                      aria-label="Sort Emp ID"
                      icon={<ChevronUpIcon />}
                      size="xs"
                      variant="ghost"
                      ml={1}
                      onClick={() => handleSort('employeeId')}
                    />
                    <IconButton
                      aria-label="Sort Emp ID Desc"
                      icon={<ChevronDownIcon />}
                      size="xs"
                      variant="ghost"
                      ml={1}
                      onClick={() => handleSort('employeeId')}
                    />
                  </Flex>
                </Th>
                <Th border="1px solid" borderColor="gray.200">Designation</Th>
                <Th border="1px solid" borderColor="gray.200">Emp. Type</Th>
                <Th border="1px solid" borderColor="gray.200">Experience</Th>
                <Th border="1px solid" borderColor="gray.200">Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {people.length > 0 ? (
                people.map((person) => (
                  <Tr key={person.employeeId}>
                    <Td border="1px solid" borderColor="gray.200">{person.displayName}</Td>
                    <Td border="1px solid" borderColor="gray.200">{person.employeeId}</Td>
                    <Td border="1px solid" borderColor="gray.200">{person.designation}</Td>
                    <Td border="1px solid" borderColor="gray.200">{person.employeeType}</Td>
                    <Td border="1px solid" borderColor="gray.200">{person.experience} Years</Td>
                    <Td border="1px solid" borderColor="gray.200">
                      <Button variant="link" colorScheme="blue" size="sm" onClick={() => handleEdit(person)}>Edit</Button>
                      <Button variant="link" colorScheme="red" size="sm" ml={2} onClick={() => handleDelete(person.employeeId as any)}>Delete</Button>
                    </Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan={6} textAlign="center" border="1px solid" borderColor="gray.200">
                    No employees found.
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </TableContainer>
      )}
      <HStack mt={4} spacing={4} justifyContent="center">
        <IconButton
          aria-label="Previous Page"
          icon={<ArrowLeftIcon />}
          isDisabled={page === 1}
          onClick={() => handlePageChange(page - 1)}
        />
        <Text>Page {page} of {totalPages}</Text>
        <IconButton
          aria-label="Next Page"
          icon={<ArrowRightIcon />}
          isDisabled={page === totalPages}
          onClick={() => handlePageChange(page + 1)}
        />
      </HStack>
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
