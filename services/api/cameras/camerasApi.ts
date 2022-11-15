import Api from "../base/apiConfig";
import axios from "axios";

axios.defaults.withCredentials = true;
const URL = (process.env.NEXT_PUBLIC_API_URL || "") + "/v1/user/cameras";
const PLATFORM = process.env.NEXT_PUBLIC_PLATFORM || "";
const X_API_KEY = process.env.NEXT_PUBLIC_X_API_KEY || "";
const VERSION = process.env.NEXT_PUBLIC_VERSION || "";
const X_AGENT = process.env.NEXT_PUBLIC_X_AGENT || "";
const HEADERS = {
    platform: PLATFORM,
    version: VERSION,
    "x-agent": X_AGENT,
    "x-api-key": X_API_KEY,
};

export default new Api(URL, HEADERS);
