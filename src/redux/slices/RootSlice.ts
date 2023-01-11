import { createSlice } from '@reduxjs/toolkit';

const rootSlice = createSlice({
    name: "root",
    initialState: {
        make: 'Make',
        model: 'Model',
        color: 'Color',
        year: 'Year',
    },
    reducers: {
        chooseName: (state, action) => { state.make = action.payload},
        chooseEmail: (state, action) => { state.model = action.payload},
        choosePhone: (state, action) => { state.color = action.payload},
        chooseAddress: (state, action) => { state.year = action.payload},
    }
})

// Export Reducer
export const reducer = rootSlice.reducer;
export const { chooseName, chooseEmail, choosePhone, chooseAddress } = rootSlice.actions;