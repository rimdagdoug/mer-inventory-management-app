import { createSlice } from '@reduxjs/toolkit';

//récupère la valeur de name depuis le stockage local du navigateur 
const name = JSON.parse(localStorage.getItem("name"))

// définit l'état initial de la slice
const initialState = {
  //isloggedIn: Indique si l'utilisateur est connecté ou non, initialisé à false
    isloggedIn: false,
    name: name ? name: "",
    user:{
      name:"",
      email:"",
      phone:"",
      bio:"",
      photo:"",

    },

}

///////////////////////////////////////////////////////////////////////////
//Création de la slice authSlice:en utilisant la fonction createSlice de Redux Toolkit.
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //SET_LOGIN: Reducer pour mettre à jour l'état isloggedIn. 
    //Lorsqu'il est appelé, il met à jour isloggedIn avec la valeur passée dans action.payload.
    SET_LOGIN(state,action){
      state.isloggedIn = action.payload
    },
    //mettre à jour le nom stocké dans l'état et dans le stockage local. 
    SET_NAME(state,action){
      localStorage.setItem("name",JSON.stringify(action.payload))
      state.name = action.payload
    },
    //mettre à jour les détails de l'utilisateur.
    SET_USER(state,action){
      const profile = action.payload;
      state.user.name = profile.name;
      state.user.email = profile.email;
      state.user.phone = profile.phone;
      state.user.bio = profile.bio;
      state.user.photo = profile.photo;
    },
  },
});

export const {SET_LOGIN,SET_NAME,SET_USER} = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isloggedIn
export const selectName = (state) => state.auth.name
export const selectUser = (state) => state.auth.user

export default authSlice.reducer;