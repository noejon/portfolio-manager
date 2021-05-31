
import axios from "axios";
import { YAHOO_URL } from "../constants";

const getLatestPrice = async (ticker: string ): Promise<number> => {
    try {
        const query = `${YAHOO_URL}${ticker}`
        const response = await axios.get(query);
        const latestPrice = response.data?.chart?.result[0].meta?.regularMarketPrice;
        return latestPrice;
    } catch (error) {
        console.log(`An error happened while retrieving the latest price for ${ticker}: \n${error}`)
        return -1;
    }
}

export default getLatestPrice;