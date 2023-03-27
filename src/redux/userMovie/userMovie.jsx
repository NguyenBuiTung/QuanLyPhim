import { createSlice } from "@reduxjs/toolkit";
import { ACCESSTOKEN, http, settings } from "../../util/config";

const initialState = {
  userReducer: [],
  userRegister: [],
  infoUser: [],
  userList: [],
};

const userMovie = createSlice({
  name: "userMovie",
  initialState,
  reducers: {
    getUserReducerAction: (state, action) => {
      state.userReducer = action.payload;
    },
    getUserRegisterAction: (state, action) => {
      state.userRegister = action.payload;
    },
    getInfoUserAction: (state, action) => {
      state.infoUser = action.payload;
    },
    getUserListAction: (state, action) => {
      state.userList = action.payload;
    },
  },
});

export const {
  getUserReducerAction,
  getUserRegisterAction,
  getInfoUserAction,
  getUserListAction,
} = userMovie.actions;
export default userMovie.reducer;
export const getUserLoginApi = (values) => {
  return async (dispatch) => {
    const result = await http.post("/api/QuanLyNguoiDung/DangNhap", values);
    const action = getUserReducerAction(result.data.content);
    dispatch(action);
    settings.setCookie(ACCESSTOKEN, result.data.content.accessToken, 1);
  };
};
export const getUserRegisterApi = (values) => {
  return async (dispatch) => {
    await http.post("/api/QuanLyNguoiDung/DangKy", values);
    // const action = getUserRegisterAction(result.data.content);
    // dispatch(action);
  };
};
export const getInfoUserApi = () => {
  return async (dispatch) => {
    const result = await http.post("/api/QuanLyNguoiDung/ThongTinTaiKhoan");
    const action = getInfoUserAction(result.data.content);
    dispatch(action);
  };
};
export const getUserListApi = () => {
  // console.log(value);
  return async (dispatch) => {
    const result = await http.get(
      `/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP06`
    );
    // console.log(result);
    const action = getUserListAction(result.data.content);
    dispatch(action);
  };
};
export const searchUserListApi = (maNhom) => {
  // console.log(value);
  return async (dispatch) => {
    const result = await http.get(
      `/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${maNhom}`
    );
    const action = getUserListAction(result.data.content);
    dispatch(action);
  };
};
export const updateUserApi = (values) => {
  return async (dispatch) => {
    await http.post("/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung", values);
    const action = getUserListApi();
    dispatch(action);
  };
};
export const deleteUserApi = (taikhoan) => {
  return async (dispatch) => {
    await http.delete(`/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taikhoan}`);
    const action = searchUserListApi();
    dispatch(action);
  };
};
export const addUserApi = (user) => {
  return async (dispatch) => {
    await http.post(
      "https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/ThemNguoiDung",
      user
    );
    const action = getUserListApi();
    dispatch(action);
  };
};
