const Money = require("./money")
const Bank = require("./bank")
class Portfolio {
    constructor() {
        this.moneys = []
    }
    add(...moneys) {
        this.moneys = this.moneys.concat(moneys)
    }
    evaluate(bank, currency) {
        let failures = []
        let total = this.moneys.reduce((sum, money) => {
            try {
                let convertedAmount = bank.convert(money, currency)
                return sum + convertedAmount
            } catch (error) {
                failures.push(error.message)
                return sum
            }
        }, 0)
        if (!failures.length) {
            return new Money(total, currency)
        }
        throw new Error("Missing exchange rate(s): [" + failures.join(", ") + "]");
    }
    convert(money, currency) {

        let exchangeRate = new Map();
        exchangeRate.set("EUR->USD", 1.2)
        exchangeRate.set("USD->KRW", 1100)
        if (money.currency == currency) {
            return money.amount
        }
        let key = `${money.currency}->${currency}`
        let rate = exchangeRate.get(key)
        if (rate === undefined) {
            return undefined
        }
        return money.amount * rate;
    }
}

module.exports = Portfolio