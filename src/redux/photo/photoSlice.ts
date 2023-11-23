import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MenuPhoto, ReviewPhoto } from "../../api/photo/PhotoType";
import {
  createMenuPhoto,
  getMenuPhotos,
  getReviewPhotos,
} from "../../api/photo/photoApiIndex";

export interface IPhotoState {
  reviewPhotos: ReviewPhoto[];
  menuPhotos: MenuPhoto[];
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

export const createMenuPhotoThunk = createAsyncThunk(
  "photo/create",
  async ({
    imagePrefix,
    restaurantID,
    imageName,
    photoCategory,
  }: {
    imagePrefix: string;
    restaurantID: string;
    imageName: string;
    photoCategory: string;
  }) => {
    const response = await createMenuPhoto(
      imagePrefix,
      restaurantID,
      imageName,
      photoCategory
    );
    return response;
  }
);

const photoReducer = createSlice({
  name: "photo",
  initialState,
  reducers: {
    updateReviewPhotos: (
      state: IPhotoState,
      action: PayloadAction<ReviewPhoto[]>
    ) => {
      state.reviewPhotos = action.payload;
    },

    updateMenuPhotos: (
      state: IPhotoState,
      action: PayloadAction<MenuPhoto[]>
    ) => {
      state.menuPhotos = action.payload;
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
