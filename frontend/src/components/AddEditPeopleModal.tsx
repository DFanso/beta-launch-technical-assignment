import React from 'react';
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

const AddEditPeopleModal = ({ isOpen, onClose, initialData }: { isOpen: boolean, onClose: () => void, initialData?: any }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{initialData ? 'Edit People' : 'Add People'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Grid templateColumns="repeat(2, 1fr)" gap={4}>
            <GridItem colSpan={2}>
              <FormControl id="fullName" isRequired>
                <FormLabel>Full Name</FormLabel>
                <Input placeholder="Full Name" defaultValue={initialData?.fullName} />
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl id="initials" isRequired>
                <FormLabel>Name with Initials</FormLabel>
                <Input placeholder="Name with Initials" defaultValue={initialData?.initials} />
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl id="preferredName">
                <FormLabel>Preferred / Display Name</FormLabel>
                <Input placeholder="Preferred / Display Name" defaultValue={initialData?.preferredName} />
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl id="gender">
                <FormLabel>Gender</FormLabel>
                <Select placeholder="Select Gender" defaultValue={initialData?.gender}>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Select>
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl id="dob">
                <FormLabel>Date of Birth</FormLabel>
                <Input type="date" defaultValue={initialData?.dob} />
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Input placeholder="Email" defaultValue={initialData?.email} />
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl id="mobile">
                <FormLabel>Mobile Number</FormLabel>
                <Input placeholder="Mobile Number" defaultValue={initialData?.mobile} />
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl id="designation">
                <FormLabel>Designation</FormLabel>
                <Input placeholder="Designation" defaultValue={initialData?.designation} />
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl id="employeeType">
                <FormLabel>Employee Type</FormLabel>
                <Select placeholder="Select Employee Type" defaultValue={initialData?.employeeType}>
                  <option value="full-time">Full Time</option>
                  <option value="part-time">Part Time</option>
                  <option value="contract">Contract Basis</option>
                  <option value="other">Other</option>
                </Select>
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl id="joinedDate">
                <FormLabel>Joined Date</FormLabel>
                <Input type="date" defaultValue={initialData?.joinedDate} />
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl id="experience">
                <FormLabel>Experience</FormLabel>
                <Select placeholder="Select Experience" defaultValue={initialData?.experience}>
                  <option value="1">01 Year</option>
                  <option value="2">02 Years</option>
                  <option value="3">03 Years</option>
                  <option value="4">04 Years</option>
                  <option value="5">05 Years</option>
                  <option value="6">06 Years</option>
                  <option value="7">07 Years</option>
                  <option value="8">08 Years</option>
                  <option value="9">09 Years</option>
                  <option value="10">10 Years</option>
                </Select>
              </FormControl>
            </GridItem>
            <GridItem colSpan={2}>
              <FormControl id="salary">
                <FormLabel>Salary</FormLabel>
                <Input placeholder="Salary" defaultValue={initialData?.salary} />
              </FormControl>
            </GridItem>
            <GridItem colSpan={2}>
              <FormControl id="notes">
                <FormLabel>Personal Notes</FormLabel>
                <Textarea placeholder="Personal Notes" defaultValue={initialData?.notes} />
              </FormControl>
            </GridItem>
          </Grid>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue">{initialData ? 'Save Changes' : 'Add People'}</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddEditPeopleModal;
