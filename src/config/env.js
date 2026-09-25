// process.loadEnvFile();
// export  default process.env;
import "dotenv/config"
const env = {
    db_url: process.env.db_url,
    JWT_ACCESS:process.env.JWT_ACCESS,
    JWT_REFRESH:process.env.JWT_REFRESH
}
export default env;