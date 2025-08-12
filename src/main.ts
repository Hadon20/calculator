type Operator = '+' | '-' | '*' | '/'

let firstNumber: number
let secondNumber: number

const OPERATORS = {
    addition: '+' as Operator,
    subtraction: '-' as Operator,
    multiplication: '*' as Operator,
    division: '/' as Operator
}

function addition(firstNumber: number, secondNumber: number) {
    return firstNumber + secondNumber
}

function subtraction(firstNumber: number, secondNumber: number) {
    return firstNumber - secondNumber
}

function multiplication(firstNumber: number, secondNumber: number) {
    return firstNumber * secondNumber
}

function division(firstNumber: number, secondNumber: number) {
    if (secondNumber === 0) {
        throw new Error('Division by zero is not allowed')
    }
    return firstNumber / secondNumber
}

function operate(firstNumber: number, secondNumber: number, operator: Operator) {
    switch (operator) {
        case OPERATORS.addition:
            return addition(firstNumber, secondNumber)
        case OPERATORS.subtraction:
            return subtraction(firstNumber, secondNumber)
        case OPERATORS.multiplication:
            return multiplication(firstNumber, secondNumber)
        case OPERATORS.division:
            return division(firstNumber, secondNumber)
        default:
            throw new Error(`Unknown Error: ${operator}`)
    }
}
