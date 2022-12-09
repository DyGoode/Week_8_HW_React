import { createSlice } from '@reduxjs/toolkit';

const rootSlice = createSlice({
    name: "root",
    initialState: {
        name: 'Planty Plattapus',
        species: 'alien',
        description: "Plantiest plant you ever did see",
        typical_climate: 'mystical/futuristic',
        known_uses: 'grants wishes to those who can find it',
        years_grown: 10000000
    },
    reducers: {
        chooseName: (state, action) => { state.name = action.payload},
        chooseSpecies: (state, action) => { state.species = action.payload},
        chooseDescription: (state, action) => { state.description = action.payload},
        chooseClimate: (state, action) => { state.typical_climate = action.payload},
        chooseUses: (state, action) => { state.known_uses = action.payload},
        chooseYears: (state, action) => { state.years_grown = action.payload}
    }
})


export const reducer = rootSlice.reducer;
export const { 
    chooseName, 
    chooseSpecies, 
    chooseDescription, 
    chooseClimate, 
    chooseUses, 
    chooseYears 
} = rootSlice.actions;