import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1OTNiYjgwNjM5ODBkN2U5MGEzMjQ3MjVjMGZjZmQ5YyIsInN1YiI6IjY1N2FkNGJmNTY0ZWM3MDExYjIxNjBkMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NkVWclXQlVWw6hH58gmDReh7pkYsdDyViUbmFWyzpIs";

const headers = {
    Authorization : "bearer " + TMDB_TOKEN,
};

export const fetchDataFromApi = async (url, params) => {
    try {
        const {data} = await axios.get(BASE_URL + url, { 
                headers,
                params
            });
        return data; 
    } catch (error) {
        console.log(error);
        return error;
    }
};
