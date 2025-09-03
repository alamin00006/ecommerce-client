import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DataState {
  items: any[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
}

const initialState: DataState = {
  items: [],
  loading: false,
  error: null,
  searchTerm: "",
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<any[]>) => {
      state.items = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    addItem: (state, action: PayloadAction<any>) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateItem: (state, action: PayloadAction<any>) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
  },
});

export const {
  setItems,
  setLoading,
  setError,
  setSearchTerm,
  addItem,
  removeItem,
  updateItem,
} = dataSlice.actions;

export default dataSlice.reducer;
