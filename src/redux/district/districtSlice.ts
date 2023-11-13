import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { District } from "../../api/district/districtType";
import { getDistricts } from "../../api/district/districtApiIndex";

export interface IDistrictState {
  districts: District[];
}

const initialState: IDistrictState = {
  districts: [],
};

export const getDistrictsThunk = createAsyncThunk(
  "district/districts",
  async () => {
    const response = await getDistricts();
    return response;
  }
);

const districtSlice = createSlice({
  name: "district",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDistrictsThunk.fulfilled, (state, action) => {
      if (action.payload) {
        state.districts = action.payload;
      }
    });
  },
});

export default districtSlice.reducer;
