import getLatestPrice from "../http/getLatestPrice";
import SharesConfigurations from "../types/SharesConfigurations";
import getFetchableShares from "./dbHelpers/getFetchableShares";
import getNonYahooPrices from "./dbHelpers/getNonYahooPrices";

const getPricesMatrix = async (configuration: SharesConfigurations): Promise<Record<string, number>> => {
    const nonFetchablePrices = await getNonYahooPrices(configuration);
    const fetchableShares = getFetchableShares(configuration);
    const fetchablePrices = await fetchableShares.reduce(async (prices, {ticker}) => {
        return {
            ...await prices,
            [ticker]: await getLatestPrice(ticker)
        }
    }, {});

    return {
        ...fetchablePrices,
        ...nonFetchablePrices
    }
}

export default getPricesMatrix;