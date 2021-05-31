import SharesConfigurations from "../types/SharesConfigurations";
import calculateBatchPrice from "./calculateBatchPrice";

const getNextPurchaseBatch = (configuration: SharesConfigurations, pricesMatrix: Record<string, number>, minPurchaseAmount: number = 100): Record<string, number> => {
    const initialPurchase = generateInitialPurchase(pricesMatrix, minPurchaseAmount);

    return getFinalPurchase(pricesMatrix, configuration, initialPurchase, 0.11);
}

const generateInitialPurchase = (pricesMatrix: Record<string, number>, minPurchaseAmount: number) => {
    return Object.keys(pricesMatrix).reduce((initialPurchase, ticker) => {
        return {
            ...initialPurchase,
            [ticker]: calculateMinimumAmountOfSharesToPurchase(pricesMatrix, ticker, minPurchaseAmount)
        };
    }, {})
}

const calculateMinimumAmountOfSharesToPurchase = (pricesMatrix: Record<string, number>, ticker: string, minPurchaseAmount: number) => {
    const price = pricesMatrix[ticker];
    return Math.ceil(minPurchaseAmount / price);
}

const getPurchaseBalance = (pricesMatrix: Record<string, number>, weight: Record<string, number>): Record<string, number> => {
    const totalPrice = calculateBatchPrice(pricesMatrix, weight);
    return Object.keys(weight).reduce((purchaseBalance, ticker) => {
        const tickerPrice = pricesMatrix[ticker];
        const tickerAmount = weight[ticker];
        return {
            ...purchaseBalance,
            [ticker]: (tickerPrice * tickerAmount) / totalPrice
        } 
    }, {})
}

const checkPurchaseBalance = (purchaseBalance: Record<string, number>, configuration: SharesConfigurations, threshold = 0.15): Record<string, number> => {
    return Object.keys(configuration).reduce((checkResult, shareName) => {
        const {ticker, allocation} = configuration[shareName];
        const balance = purchaseBalance[ticker];
        const isWithinThreshold = balance > allocation - allocation * threshold && balance < allocation + allocation * threshold;
        const check = isWithinThreshold ? 1 : allocation - balance;
        return {
            ...checkResult,
            [ticker]: check
        };
    }, {}
    );
}

const getTickerWithBiggestDifference = (balanceCheck: Record<string, number>): string => {
    let maxDiff = 0;
    let tickerWithBiggestDifference = '';
    Object.entries(balanceCheck).forEach(([ticker, value]) => {
        if(value < 1 && value > maxDiff){
            maxDiff = value;
            tickerWithBiggestDifference = ticker;
        }
    })
    return tickerWithBiggestDifference;
}

const getFinalPurchase = (pricesMatrix: Record<string, number>, configuration: SharesConfigurations, initialPurchase: Record<string, number>,  threshold = 0.1): Record<string, number> => {
    let purchaseBalance = getPurchaseBalance(pricesMatrix, initialPurchase);
    let balanceCheck = checkPurchaseBalance(purchaseBalance, configuration);
    let tickerWithBiggestDifference = getTickerWithBiggestDifference(balanceCheck);
    let finalPurchase = initialPurchase;
    while(tickerWithBiggestDifference){
        finalPurchase[tickerWithBiggestDifference] += 1;
        purchaseBalance = getPurchaseBalance(pricesMatrix, finalPurchase);
        balanceCheck = checkPurchaseBalance(purchaseBalance, configuration, threshold);
        tickerWithBiggestDifference = getTickerWithBiggestDifference(balanceCheck);
    }
    return finalPurchase;
} 
 
export default getNextPurchaseBatch;