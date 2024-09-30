import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filter: 'all',  // default category
  search: '',     // default search term
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { setFilter, setSearch } = filterSlice.actions;
export default filterSlice.reducer;
