import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../api/api";
import { ENDPOINTS } from "../../api/endpoints";

// ================= FETCH ALL MENU ITEMS =================
export const fetchMenuItems = createAsyncThunk(
  "menu/fetchMenuItems",
  async (_, { rejectWithValue }) => {
    console.log("fetchMenuItems thunk called");

    try {
      const res = await fetch(`${BASE_URL}${ENDPOINTS.MENU_LIST}`);

      console.log("Fetch Response:", res);

      const json = await res.json();
      if (!res.ok) return rejectWithValue(json);

      return json.data;
    } catch (err) {
      console.error("Fetch Error:", err);
      return rejectWithValue(err.message);
    }
  },
);
// ================= FETCH SINGLE MENU ITEM (Edit ke liye) =================
export const fetchMenuItemById = createAsyncThunk(
  "menu/fetchMenuItemById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}${ENDPOINTS.MENU_SINGLE(id)}`);
      const json = await res.json();
      if (!res.ok) return rejectWithValue(json);
      return json.data;
    } catch (err) {
      return rejectWithValue("Failed to fetch item");
    }
  },
);

// ================= FETCH RESTAURANTS (dropdown ke liye) =================
export const fetchRestaurants = createAsyncThunk(
  "menu/fetchRestaurants",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}${ENDPOINTS.MENU_RESTAURANTS}`);
      const json = await res.json();
      if (!res.ok) return rejectWithValue(json);
      return json.data;
    } catch (err) {
      return rejectWithValue("Failed to fetch restaurants");
    }
  },
);

// ================= FETCH CATEGORIES (dropdown ke liye) =================
export const fetchCategories = createAsyncThunk(
  "menu/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}${ENDPOINTS.MENU_CATEGORIES}`);
      const json = await res.json();
      if (!res.ok) return rejectWithValue(json);
      return json.data;
    } catch (err) {
      return rejectWithValue("Failed to fetch categories");
    }
  },
);

// ================= CREATE MENU ITEM =================
export const createMenuItem = createAsyncThunk(
  "menu/createMenuItem",
  async (formValues, { dispatch, getState, rejectWithValue }) => {
    try {
      const token = getState().auth.accessToken;
      const body = new FormData();
      body.append("name", formValues.name);
      body.append("description", formValues.description);
      body.append("price", formValues.price);
      body.append("restaurant_id", formValues.restaurant_id);
      body.append("category_id", formValues.category_id);
      body.append("is_available", formValues.is_available);
      body.append("is_featured", formValues.is_featured);
      if (formValues.image) body.append("image", formValues.image);

      const res = await fetch(`${BASE_URL}${ENDPOINTS.MENU_CREATE}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body,
      });

      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        data = text;
      }

      if (!res.ok) return rejectWithValue(data);

      dispatch(fetchMenuItems()); // list refresh
      return data;
    } catch (err) {
      return rejectWithValue("Failed to add item");
    }
  },
);

// ================= UPDATE MENU ITEM =================
export const updateMenuItem = createAsyncThunk(
  "menu/updateMenuItem",
  async ({ id, formValues }, { dispatch, getState, rejectWithValue }) => {
    try {
      const token = getState().auth.accessToken;
      const body = new FormData();
      body.append("name", formValues.name);
      body.append("description", formValues.description);
      body.append("price", formValues.price);
      body.append("restaurant_id", formValues.restaurant_id);
      body.append("category_id", formValues.category_id);
      body.append("is_available", formValues.is_available);
      body.append("is_featured", formValues.is_featured);
      if (formValues.image) body.append("image", formValues.image);

      // Swagger confirms this endpoint expects PATCH, not PUT
      const res = await fetch(`${BASE_URL}${ENDPOINTS.MENU_UPDATE(id)}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
        body,
      });

      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        data = text;
      }

      if (!res.ok) return rejectWithValue(data);

      dispatch(fetchMenuItems()); // list refresh
      return data;
    } catch (err) {
      return rejectWithValue("Failed to update item");
    }
  },
);

// ================= DELETE MENU ITEM =================
export const deleteMenuItem = createAsyncThunk(
  "menu/deleteMenuItem",
  async (id, { dispatch, getState, rejectWithValue }) => {
    try {
      const token = getState().auth.accessToken;
      const res = await fetch(`${BASE_URL}${ENDPOINTS.MENU_DELETE(id)}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const errText = await res.text();
        return rejectWithValue(errText);
      }

      dispatch(fetchMenuItems()); // list refresh
      return id;
    } catch (err) {
      return rejectWithValue("Failed to delete item");
    }
  },
);

// ================= INITIAL STATE =================
const initialState = {
  items: [],
  restaurants: [],
  categories: [],
  selectedItem: null,
  loading: false,
  submitting: false,
  fetchingSingle: false,
  error: null,
};

// ================= SLICE =================
const menuAdminSlice = createSlice({
  name: "menuAdmin",
  initialState,
  reducers: {
    clearMenuError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // LIST
      .addCase(fetchMenuItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMenuItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchMenuItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // SINGLE ITEM (Edit)
      .addCase(fetchMenuItemById.pending, (state) => {
        state.fetchingSingle = true;
        state.error = null; // optional
      })
      .addCase(fetchMenuItemById.fulfilled, (state, action) => {
        state.fetchingSingle = false;
        state.selectedItem = action.payload;
      })
      .addCase(fetchMenuItemById.rejected, (state, action) => {
        state.fetchingSingle = false;
        state.error = action.payload;
      })

      // RESTAURANTS
      .addCase(fetchRestaurants.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.loading = false;
        state.restaurants = action.payload;
      })

      .addCase(fetchRestaurants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // CATEGORIES
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })

      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CREATE
      .addCase(createMenuItem.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(createMenuItem.fulfilled, (state) => {
        state.submitting = false;
      })
      .addCase(createMenuItem.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
      })

      // UPDATE
      .addCase(updateMenuItem.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(updateMenuItem.fulfilled, (state) => {
        state.submitting = false;
      })
      .addCase(updateMenuItem.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
      })

      // DELETE
      .addCase(deleteMenuItem.pending, (state) => {
        state.submitting = true;
      })

      .addCase(deleteMenuItem.fulfilled, (state) => {
        state.submitting = false;
      })

      .addCase(deleteMenuItem.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
      });
  },
});

export const { clearMenuError } = menuAdminSlice.actions;
export default menuAdminSlice.reducer;
