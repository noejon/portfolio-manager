import Portfolio from "../types/Portfolio";
import SharesConfigurations from "../types/SharesConfigurations";


const isPortfolioBalanced = (configuration: SharesConfigurations, pricesMatrix: Record<string, number>, portfolio: Portfolio) : boolean => {
    const portfolioHoldings = getPortfolioHoldings(portfolio);
    console.log(portfolioHoldings);
    const totalPortfolioAmount = getTotalPortfolioAmount(portfolioHoldings);
    const portfolioBalance = getPortfolioBalance(pricesMatrix, portfolioHoldings, totalPortfolioAmount);
    console.log(portfolioBalance);
    return false;
}

const getPortfolioHoldings = (portfolio: Portfolio): Record<string, number> => 
    Object.entries(portfolio).reduce((batch, [ticker, sharePurchases]) => ({
        ...batch,
        [ticker]: sharePurchases.reduce((totalPrice, {amount, price}) => {
            return totalPrice + amount * price;
        }, 0)
    }), {})

const getTotalPortfolioAmount = (balance: Record<string, number>): number => 
    Object.entries(balance).reduce((price, [_ticker, amount]) => 
        price + amount, 0)

const getPortfolioBalance = (pricesMatrix: Record<string, number>, holdings: Record<string, number>, totalAmount: number) => 
    Object.entries(holdings).reduce((balance, [ticker, amount]) => {
        const tickerPrice = pricesMatrix[ticker];
        return {
            ...balance,
            [ticker]: (tickerPrice * amount) / totalAmount
        } 
    }, {})

export default isPortfolioBalanced;