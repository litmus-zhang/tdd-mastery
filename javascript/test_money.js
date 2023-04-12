const assert = require("assert");
const Money = require("./money");
const Portfolio = require("./portfolio")


class MoneyTest {
    testMultiplication() {

        let tenEuros = new Money(10, "EUR");
        let twentyEuros = new Money(20, "EUR");
        assert.deepStrictEqual(tenEuros.times(2), twentyEuros)
    }

    testDivision() {
        let originalMoney = new Money(4002, "KRW");
        let expectedMoneyAfterDivision = new Money(1000.5, "KRW")
        assert.deepStrictEqual(originalMoney.divide(4), expectedMoneyAfterDivision)
    }
    testAddition() {
        let fiveDollars = new Money(5, "USD")
        let tenDollars = new Money(10, "USD")
        let fifteenDollar = new Money(15, "USD")
        let portfolio = new Portfolio()
        portfolio.add(fiveDollars, tenDollars);
        assert.deepStrictEqual(portfolio.evaluate("USD"), fifteenDollar)
    }
    testAdditionOfDollarsAndEuros() {
        let fiveDollars = new Money(5, "USD")
        let tenEuros = new Money(10, "EUR")
        let portfolio = new Portfolio()
        portfolio.add(fiveDollars, tenEuros);
        let expectedMoney = new Money(17, "USD");
        assert.deepStrictEqual(portfolio.evaluate("USD"), expectedMoney)
    }
    getAllTests() {
        let moneyPrototype = MoneyTest.prototype;
        let allProps = Object.getOwnPropertyNames(moneyPrototype);
        let testMethods = allProps.filter(p => {
            return typeof moneyPrototype[p] === 'function' && p.startsWith("test")
        })
        return testMethods

    }
    runAllTests() {
        let testsMethods = this.getAllTests();
        testsMethods.map(m => {
            console.log("Running: %s()", m)
            let method = Reflect.get(this, m);
            try {
                Reflect.apply(method, this, []);

            } catch (error) {
                if (error instanceof assert.AssertionError) {
                    console.log(error)
                }
                else {
                    throw error
                }
            }
        })
    }
}


new MoneyTest().runAllTests();
