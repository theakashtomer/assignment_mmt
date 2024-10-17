import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  step: 1,
  personalInfo: {
    firstName: '',
    lastName: '',
    email: '',
    companyName: '',
    companyWebsite: '',
    state: '',
    zipCode: '',
  },
  companyInfo: {
    fields: [],
    employees: '',
    wfhPolicy: '',
  },
  planSelection: {
    planDate: '',
    planType: '',
    price: 0,
    numberOfUsers: 1,
  }
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    savePersonalInfo: (state, action) => {
      state.personalInfo = action.payload;
    },
    saveCompanyInfo: (state, action) => {
      state.companyInfo = action.payload;
    },
    savePlanSelection: (state, action) => {
      state.planSelection = action.payload;
    },
    nextStep: (state) => {
      state.step += 1;
    },
    prevStep: (state) => {
      state.step -= 1;
    },
    resetForm: () => initialState,
  },
});

export const {
  savePersonalInfo,
  saveCompanyInfo,
  savePlanSelection,
  nextStep,
  prevStep,
  resetForm,
} = formSlice.actions;

export default formSlice.reducer;
