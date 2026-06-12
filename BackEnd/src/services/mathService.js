module.exports = {
    add: (a, b) => {
        return a + b;
    },
    subtract: (a, b) => {
        return a - b;
    },
    multiply: (a, b) => {
        return a * b;
    },
    divide: (a, b) => {
        if (b === 0) {
            throw new Error("Division by zero is not allowed.");
        }
        return a / b;
    },
    calculateExpression: (expression) => {
        try {
            return eval(expression);
        } catch (error) {
            throw new Error("Invalid expression.");
        }
    }
};