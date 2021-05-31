import ShareConfiguration from "../types/ShareConfiguration";
import SharesConfigurations from "../types/SharesConfigurations";

const checkConfigurationValidity = (configuration: SharesConfigurations) => {
    const fullAllocation = Object.keys(configuration).reduce((acc, key) => {
        return acc + configuration[key]['allocation'];
    }, 0)
    return fullAllocation === 1;
    // if (fullAllocation > 1){
    //     console.log('Error in configuration: allocation > 1: ', fullAllocation)
    //     return
    // }
    // if(fullAllocation < 1) {
    //     console.log('Error in configuration: allocation < 1: ', fullAllocation)
    //     return
    // }
}

export default checkConfigurationValidity;