import SharesConfigurations from "../../types/SharesConfigurations";

const getFetchableShares = (configuration: SharesConfigurations) => {
    return Object.keys(configuration).map(shareName => configuration[shareName]).filter(({yahoo}) => Boolean(yahoo));
}

export default getFetchableShares;