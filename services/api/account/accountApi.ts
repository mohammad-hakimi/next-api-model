import Api from "../base/apiConfig";
import axios from "axios";

axios.defaults.withCredentials = true;
const URL = `${process.env.NEXT_PUBLIC_API_URL || ""}/v1/account`;
const X_API_KEY = process.env.NEXT_PUBLIC_X_API_KEY || "";
const VERSION = process.env.NEXT_PUBLIC_VERSION || "";
const HEADERS = {
  version: VERSION,
  "x-api-key": X_API_KEY,
};

export default new Api(URL, HEADERS);
