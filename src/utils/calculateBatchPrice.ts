const calculateBatchPrice = (pricesMatrix: Record<string, number>, weight: Record<string, number>) => 
    Object.keys(pricesMatrix).reduce((totalPrice, ticker) => {
        return totalPrice + pricesMatrix[ticker] * weight[ticker];
    }, 0);

export default calculateBatchPrice;