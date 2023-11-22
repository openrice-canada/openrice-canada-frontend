import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Photo } from "../../api/photo/PhotoType";
import { getMenuPhotos, getReviewPhotos } from "../../api/photo/photoApiIndex";

export interface IPhotoState {
  reviewPhotos: Photo[];
  menuPhotos: Photo[];
}

const initialState: IPhotoState = {
  reviewPhotos: [],
  menuPhotos: [],
};

export const getReviewPhotosThunk = createAsyncThunk(
  "photo/review",
  async (id: string) => {
    const response = await getReviewPhotos(id);
    return response;
  }
);

export const getMenuPhotosThunk = createAsyncThunk(
  "photo/menu",
  async (id: string) => {
    const response = await getMenuPhotos(id);
    return response;
  }
);

const photoReducer = createSlice({
  name: "photo",
  initialState,
  reducers: {
    updateReviewPhotos: (
      state: IPhotoState,
      action: PayloadAction<Photo[]>
    ) => {
      state.reviewPhotos = action.payload;
    },

    updateMenuPhotos: (state: IPhotoState, action: PayloadAction<Photo[]>) => {
      state.reviewPhotos = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getReviewPhotosThunk.fulfilled, (state, action) => {
      if (action.payload) {
        state.reviewPhotos = action.payload;
      }
    });

    builder.addCase(getMenuPhotosThunk.fulfilled, (state, action) => {
      if (action.payload) {
        state.menuPhotos = action.payload;
      }
    });
  },
});

export const { updateReviewPhotos, updateMenuPhotos } = photoReducer.actions;
export default photoReducer.reducer;
