import {configureStore} from "@reduxjs/toolkit";
import logger from "redux-logger";
import moviesReducer from "./movies";
import peopleReducer from "./people";
import searchReducer from "./search";
import showsReducer from "./tvshows";
import userReducer from "./user";

const store = configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    reducer: {
      movies: moviesReducer,
      user: userReducer,
      tvshows: showsReducer,
      people: peopleReducer,
      search:searchReducer,
    },
  });

export default store;
