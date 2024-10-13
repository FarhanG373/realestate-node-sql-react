import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define the action types
const initialState = {
  loading: false,
  error: null,
  data: [],
  selectedProperty: null,
};

const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {
    setPropertyLoading: (state, action) => {
      state.loading = true;
    },
    setPropertyError: (state, action) => {
      state.error = action.message;
    },
    setPropertyData: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProp.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProp.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        
      })
      .addCase(getProp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const getProp = createAsyncThunk('getProp/property', async (setData) => {
  try {
    const response = await fetch('http://localhost:9090/property/getProperty');
    const data = await response.json();
    setData(data.data);
    return data.data;
  } catch (error) {
    throw error;
  }
});

export const getsingleProperty = createAsyncThunk('getProp/single', async (id) => {
  try {
    const response = await fetch(`http://localhost:9090/property/singleProperty/${id}`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    throw error;
  }
});

export const {
  setPropertyLoading,
  setPropertyError,
  setPropertyData,
  setSelectedProperty,
} = propertySlice.actions;

export default propertySlice.reducer;