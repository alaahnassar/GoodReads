import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

let initialState = {
  records: [],
  loading: false,
  error: null,
  viewStatus: 1,
};

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (data, thunkAPI) => {
    let id = data.id;
    let view = data.view;
    let token = data.token;
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch(`http://localhost:8080/user/${id}?view=${view}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateViewBook = createAsyncThunk(
  "user/updateViewBook",
  async (data, thunkAPI) => {
    let id = data.id;
    let view = data.view;
    let book_id = data.book_id;
    let token = data.token;

    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch(`http://localhost:8080/user/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          book_id: book_id,
          view: view,
        }),
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [fetchUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.records = action.payload;
    },
    [fetchUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [updateViewBook.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [updateViewBook.fulfilled]: (state, action) => {
      state.loading = false;
      state.viewStatus = ++state.viewStatus;
    },
    [updateViewBook.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default userSlice.reducer;
