import axios from "axios";

const instance = axios.create({
    baseURL: "https://burgerbuilder-cb640-default-rtdb.firebaseio.com/"
});

export default instance;