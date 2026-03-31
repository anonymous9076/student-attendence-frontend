import { createSlice } from '@reduxjs/toolkit';

// Safe localStorage helpers for iOS Safari Private Browsing
const safeGetItem = (key) => {
  try { return localStorage.getItem(key); } catch (e) { return null; }
};
const safeSetItem = (key, value) => {
  try { localStorage.setItem(key, value); } catch (e) {}
};
const safeRemoveItem = (key) => {
  try { localStorage.removeItem(key); } catch (e) {}
};

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isHydrated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    hydrate: (state) => {
      const token = safeGetItem('token');
      const user = safeGetItem('user');
      if (token && user) {
        try {
          state.token = token;
          state.user = JSON.parse(user);
          state.isAuthenticated = true;
        } catch (e) {
          // Corrupted user JSON — clear it
          safeRemoveItem('token');
          safeRemoveItem('user');
        }
      }
      state.isHydrated = true;
    },
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      safeSetItem('token', action.payload.token);
      safeSetItem('user', JSON.stringify(action.payload.user));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      safeRemoveItem('token');
      safeRemoveItem('user');
    },
  },
});

export const { setCredentials, logout, hydrate } = authSlice.actions;
export default authSlice.reducer;

