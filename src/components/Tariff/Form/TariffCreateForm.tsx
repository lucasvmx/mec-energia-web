import { Typography } from '@mui/material'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsTariffCreateFormOpen, selectIsTariffEditFormOpen, setIsTariffEdiFormOpen } from '../../../store/appSlice'
import { CreateAndEditTariffForm } from '../../../types/tariffs'
import FormDrawer from '../../Form/Drawer'

const defaultValues: CreateAndEditTariffForm = {
  start_date: '',
  end_date: '',
  blue: {
    peak_tusd_in_reais_per_kw: 0,
    peak_tusd_in_reais_per_mwh: 0,
    peak_te_in_reais_per_mwh: 0,
    off_peak_tusd_in_reais_per_kw: 0,
    off_peak_tusd_in_reais_per_mwh: 0,
    off_peak_te_in_reais_per_mwh: 0,
  },
  green: {
    peak_tusd_in_reais_per_mwh: 0,
    peak_te_in_reais_per_mwh: 0,
    off_peak_tusd_in_reais_per_mwh: 0,
    off_peak_te_in_reais_per_mwh: 0,
    na_tusd_in_reais_per_kw: 0,
  }
}

const TariffCreateForm = () => {
  const dispatch = useDispatch();
  const isCreateTariffFormOpen = useSelector(selectIsTariffCreateFormOpen);
  const isEditTariffFormOpen = useSelector(selectIsTariffEditFormOpen)
  const [shouldShowCancelDialog, setShouldShowCancelDialog] = useState(false);
  const form = useForm()
  const {
    control,
    reset,
    handleSubmit,
    setValue,
    watch,
    formState: { isDirty }
  } = form;

  const handleCancelEdition = () => {
    if (isDirty) {
      setShouldShowCancelDialog(true);
      return;
    }
    handleDiscardForm();
  }

  const handleDiscardForm = () => {
    handleCloseDialog();
    reset();
    dispatch(setIsTariffEdiFormOpen(false));
  }

  const handleCloseDialog = () => {
    setShouldShowCancelDialog(false);
  }

  const onSubmitHandler: SubmitHandler<CreateAndEditTariffForm> = (data: any) => {
    console.log(data);
  }

  return (
    <FormDrawer open={isEditTariffFormOpen} handleCloseDrawer={
      handleCancelEdition
    }>
      <Typography>
        Editar Tarifa
      </Typography>

    </FormDrawer>
  )
}

export default TariffCreateForm;
