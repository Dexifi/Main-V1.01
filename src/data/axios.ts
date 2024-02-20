import Ax from "axios";
import { setupCache } from "axios-cache-interceptor";

const instance = Ax.create({});

export default instance;
