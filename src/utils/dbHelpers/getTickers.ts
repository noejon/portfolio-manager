import SharesConfigurations from "../../types/SharesConfigurations";

const getTickers = (configuration: SharesConfigurations) => {
    return Object.keys(configuration).map(key => {
        const {ticker} = configuration[key];
        return ticker;
    });
}

export default getTickers;