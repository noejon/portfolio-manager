import SharesConfigurations from "../types/SharesConfigurations";

const checkConfigurationValidity = (configuration: SharesConfigurations) => {
    const fullAllocation = Object.keys(configuration).reduce((acc, key) => {
        return acc + configuration[key]['allocation'];
    }, 0) / 10000;
    if (fullAllocation > 1){
        console.log('Error in configuration: allocation > 1: ', fullAllocation)
    }
    if(fullAllocation < 1) {
        console.log('Error in configuration: allocation < 1: ', fullAllocation)
    }
    return fullAllocation === 1;
}

export default checkConfigurationValidity;