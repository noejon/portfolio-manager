import { prependOnceListener } from 'process';
import prompt, { Schema } from 'prompt';
import SharesConfigurations from "../../types/SharesConfigurations";

const getNonYahooPrices = async (configuration: SharesConfigurations) => {
    
    const nonYahooShares = Object.keys(configuration).map(shareName => ({shareName, ...configuration[shareName]})).filter(({yahoo}) => !Boolean(yahoo)).map(({ticker}) => ticker);
    
    const prices = await prompt.get(nonYahooShares);
    return prices;
}

export default getNonYahooPrices;