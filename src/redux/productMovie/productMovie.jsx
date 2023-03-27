import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../util/config";

const initialState = {
  movieList: [],
};

const productMovie = createSlice({
  name: "productMovie",
  initialState,
  reducers: {
    getDataMovieAction: (state, action) => {
      state.movieList = action.payload;
    },
    getSearchMovieAction: (state, action) => {
      state.movieList = action.payload;
    },
  },
});

export const { getDataMovieAction, getSearchMovieAction } =
  productMovie.actions;
export default productMovie.reducer;

// Hàm tìm danh sách phim
export const searchDataMoviApi = (maNhom) => {
  // console.log(maNhom);
  return async (dispatch) => {
    const result = await http.get(
      `/api/QuanLyPhim/LayDanhSachPhim?maNhom=${maNhom}`
    );
    const action = getSearchMovieAction(result.data.content);
    dispatch(action);
  };
};
export const getDataMovieApi = () => {
  return async (dispatch) => {
    const result = await http.get(
      `/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP06`
    );
    // console.log(result);
    const action = getDataMovieAction(result.data.content);
    dispatch(action);
  };
};

export const deleteMovieApi = (maPhim) => {
  return async (dispatch) => {
    await http.delete(`/api/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`);
    const action = getDataMovieApi();
    dispatch(action);
  };
};
export const uploadApi = (maPhim) => {
  return async (dispatch) => {
    await http.delete(`vn/api/QuanLyPhim/ThemPhimUploadHinh`,maPhim);
    const action = getDataMovieApi();
    dispatch(action);
  };
};
