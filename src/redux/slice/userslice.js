import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getAllUsers = createAsyncThunk("getAllUsers", async () => {
  try {
    let data = await fetch("https://64947afb0da866a95367d7c6.mockapi.io/users");
    let response = await data.json();
    return response;
  } catch (error) {
    console.log(error);
  }
});

export const addNewUser = createAsyncThunk("addNewUser", async (user) => {
  try {
    let data = await fetch(
      "https://64947afb0da866a95367d7c6.mockapi.io/users",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body : JSON.stringify(user)
      }
    );
    let response = await data.json();
    return response;
  } catch (error) {
    console.log(error);
  }
});
export const updateUser = createAsyncThunk("updateUser", async (data1) => {
  try {
     let data = await fetch(
      "https://64947afb0da866a95367d7c6.mockapi.io/users/"+data1.id,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
         body : JSON.stringify(data1.userDetails)
      }
    );
    let response = await data.json();
    return response;
  } catch (error) {
    console.log(error);
  }
});

export const deleteUser = createAsyncThunk("deleteUser", async (id) => {
  try {
    let data = await fetch(
      `https://64947afb0da866a95367d7c6.mockapi.io/users/${id}`,
      {
        method: "DELETE",
      }
    );
    let response = await data.json();
    // console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    isError: false,
    allUsers: [],
  },
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.allUsers = action.payload;
    });
    builder.addCase(getAllUsers.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(deleteUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.isLoading = false;
      // console.log(action.payload);
      let data = state.allUsers.filter((ele) => ele.id !== action.payload.id);
      state.allUsers = data;
    });
    builder.addCase(deleteUser.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(addNewUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addNewUser.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log(action.payload);
      state.allUsers.push(action.payload)
    });
    builder.addCase(addNewUser.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(updateUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.isLoading = false;
      const data =  state.allUsers.map((ele)=>ele.id===action.payload.id?action.payload:ele)
      state.allUsers = data
    });
    builder.addCase(updateUser.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default userSlice.reducer;
