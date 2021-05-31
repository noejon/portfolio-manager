import checkConfigurationValidity from "./utils/checkConfigValidity";
import configuration from './database/config.json';
import portfolio from './database/db.json';
import getNextPurchaseBatch from "./utils/getNextPurchaseBatch";
import getPricesMatrix from "./utils/getPricesMatrix";
import calculateBatchPrice from "./utils/calculateBatchPrice";
import isPortfolioBalanced from "./utils/isPortfolioBalanced";

(async () => {

    /**
     * STEP 1: CHECK THAT THE CONFIGURATION IS VALID
     */

    const isAllocationValid = checkConfigurationValidity(configuration)
    
    console.log('----------- CONFIG --------------');
    console.log('Checking Configuration: Allocation is valid?');
    console.log(isAllocationValid);
    console.log('----------- CONFIG --------------');

    /**
     * STEP 2: GENERATE THE PRICES MATRIX
     */

    const pricesMatrix = await getPricesMatrix(configuration);

    /**
     * STEP 3: CALCULATE THE WEIGHT OF THE NEXT PURCHASE BATCH
     */
    
    const nextPurchaseBatch = getNextPurchaseBatch(configuration, pricesMatrix);

    console.log('----------- PURCHASE --------------');
    console.log('Here is what the next purchase should be:');
    console.log(nextPurchaseBatch);
    console.log('----------- PURCHASE --------------');
    console.log('----------- TOTAL PRICE --------------');
    console.log(calculateBatchPrice(pricesMatrix, nextPurchaseBatch), 'AUD');
    console.log('----------- TOTAL PRICE --------------');

    /**
     * STEP 4: CHECK IF THE PORTFOLIO IN TOTAL IS BALANCED
     */
    isPortfolioBalanced(configuration, pricesMatrix, portfolio);


})();
