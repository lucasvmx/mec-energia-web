import React from 'react'
import { Button } from '@mui/material'
import { setIsContractCreateFormOpen, setIsContractEditFormOpen } from '../../store/appSlice';
import { useDispatch } from "react-redux";
import ContractCreateForm from '../Contract/Form/ContractCreateForm';

const Contract = () => {
  const dispatch = useDispatch();
  const handleCreateContractClick = () => {
    dispatch(setIsContractCreateFormOpen(true));
  };

  const handleEditContractClick = () => {
    dispatch(setIsContractEditFormOpen(true));
  };
  return (
    <>
      <h1>Contrato</h1>
      <Button
        variant="outlined"
        onClick={handleCreateContractClick}
      >
        Adicionar Contrato
      </Button>
      <ContractCreateForm />
    </>
  )
}
export default Contract;
