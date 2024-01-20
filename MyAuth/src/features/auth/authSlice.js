import {createSlice, createAsyncThunk, createAction} from '@reduxjs/toolkit';
import {BASE_URL} from '../../extras/config';
import axios from '../axios';
import EncryptedStorage from 'react-native-encrypted-storage';

export const login = createAsyncThunk(
  'auth/login',
  async ({username, password}) => {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      username,
      password,
    });
    return response.data;
  },
);

export const register = createAsyncThunk(
  'auth/register',
  async ({username, email, password}) => {
    const response = await axios.post(
      `${BASE_URL}/auth/register`,
      {
        username,
        email,
        password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  },
);

// export const logout = createAsyncThunk('auth/logout', async () => {
//   const response = await axios.get(`${BASE_URL}/auth/logout`);
//   return response.data;
// });

export const isUserValid = createAsyncThunk('auth/isUserValid', async () => {
  const user = await EncryptedStorage.getItem('user').then(res =>
    JSON.parse(res),
  );
  if (user.username && user.token) {
    console.log('from storage', user, user.username);
    const response = await axios.post(`${BASE_URL}/auth/isUserValid`, user);
    console.log('post user', response.data);
    return response;
  }
  return user;
});

const todosSlice = createSlice({
  name: 'auth',
  initialState: {
    status: {loading: false, message: ''},
    user: {},
    isLoggedIn: false,
  },
  reducers: {
    logout(state) {
      EncryptedStorage.setItem('user', null);
      state.user = {};
      state.isLoggedIn = false;
      state.status = {
        loading: false,
      };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, (state, action) => {
        console.log('pending', action);
        state.user = {};
        state.isLoggedIn = false;
        state.status = {
          loading: true,
        };
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log('done', action.payload);
        EncryptedStorage.setItem('user', JSON.stringify(action.payload));
        state.isLoggedIn = true;
        state.user = action.payload;
        state.status = {
          loading: false,
          message: 'Kullanıcı girişi başarılı...',
        };
      })
      .addCase(login.rejected, (state, action) => {
        console.log('error', action);
        state.user = {};
        state.status = {loading: false, message: 'Kullanıcı girişi hatası...'};
      });

    builder
      .addCase(register.pending, state => {
        state.user = {};
        state.status = {
          loading: true,
        };
      })
      .addCase(register.fulfilled, (state, action) => {
        console.log('done', action.payload);
        state.user = action.payload;
        state.status = {
          loading: false,
          message: 'Kullanıcı kaydı başarılı...',
        };
      })
      .addCase(register.rejected, (state, action) => {
        console.log('error', action.error.code, action.error.message);
        state.user = {};
        state.status = {loading: false, message: 'Kullanıcı kayıt hatası...'};
      });

    builder
      .addCase(isUserValid.pending, (state, action) => {
        console.log('isUserValid', state, action.payload);
        state.user = action.payload;
        state.isLoggedIn = true;
        state.status = {
          loading: true,
        };
      })
      .addCase(isUserValid.fulfilled, (state, action) => {
        console.log('isUserValid', state, action.payload);
        state.user = action.payload;
        state.isLoggedIn = true;
        state.status = {
          loading: false,
          message: 'Kullanıcı başarıyla doğrulandı...',
        };
      })
      .addCase(isUserValid.rejected, (state, action) => {
        console.log('isUserValid', state, action.payload);
        state.user = action.payload;
        state.status = {
          loading: false,
          message: 'Kullanıcı doğrulanamadı. Lütfen tekrar giriş yapın...',
        };
      });
  },
});
export const {logout} = todosSlice.actions;

export default todosSlice.reducer;
