import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isAuthenticated: false,
    token: "",
}

export const auth = createSlice({
    name: "auth",
    initialState,
    reducers: {
        toggleAuth: state => {
            state.isAuthenticated = !state.isAuthenticated
        },
        setToken: (state, action) => {
            state.token = action.payload
        }
    },
})

export const { toggleAuth, setToken } = auth.actions

export default auth.reducer

// import { useDispatch, useSelector } from "react-redux"
// const auth = useSelector(state => state.auth)
// const dispatch = useDispatch()
