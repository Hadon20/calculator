import { roundUpDecimals } from './utils/helper'
import { formatResult } from './utils/helper'

type Operator = '+' | '-' | '*' | '/'

let firstNumber: number | null = null
let secondNumber: number | null = null
let result: number | null = null
let currentOperator: Operator | null = null
let resetDisplay: boolean = false
let lastClickWasOperator: boolean = false
let dotUsed: boolean = false

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

function screenDisplay() {
    const keys = document.querySelectorAll('.key') as NodeListOf<HTMLButtonElement>
    const display = document.querySelector('.display') as HTMLParagraphElement
    keys.forEach(key => {
        const value = key.textContent
        key.addEventListener('click', () => {
            if (key.classList.contains('number')) {
                if (display.textContent === '0' || resetDisplay) {
                    display.textContent = value
                    resetDisplay = false
                } else {
                    if (display.textContent.length > 9) {
                        return
                    } else {
                        display.textContent += value
                    }
                }

                if (currentOperator === null) {
                    firstNumber = Number(display.textContent)
                } else {
                    secondNumber = Number(display.textContent)
                }

                lastClickWasOperator = false

            } else if (key.classList.contains('operator')) {
                if (display.textContent === '-') { return }
                if (lastClickWasOperator) { return }
                if (firstNumber !== null && secondNumber !== null && currentOperator) {
                    firstNumber = operate(firstNumber, secondNumber, currentOperator)
                    display.textContent = String(formatResult(firstNumber))
                    secondNumber = null
                }

                currentOperator = value as Operator
                resetDisplay = true
                lastClickWasOperator = true
                dotUsed = false

            } else if (key.classList.contains('dot')) {
                if (!dotUsed) {
                    if (resetDisplay) {
                        display.textContent = '0.'
                        resetDisplay = false
                    } else {
                        display.textContent += value
                    }
                    dotUsed = true
                }
            } else if (key.classList.contains('equal')) {
                if (display.textContent === '-') {
                    display.textContent = '0'
                    return
                }
                if (firstNumber !== null && secondNumber !== null && currentOperator) {
                    result = operate(firstNumber, secondNumber, currentOperator)
                    display.textContent = String(formatResult(result))
                    firstNumber = result
                    secondNumber = null
                    currentOperator = null
                    resetDisplay = true
                }
                lastClickWasOperator = false
                dotUsed = false
            } else if (key.classList.contains('toggle')) {
                if (display.textContent.startsWith('-') && display.textContent.length > 1) {
                    display.textContent = display.textContent.slice(1)
                } else if (display.textContent === '-') {
                    display.textContent = '0'
                } else {
                    if (display.textContent === '0') {
                        display.textContent = '-'
                    } else {
                        display.textContent = '-' + display.textContent
                    }
                }
                if (display.textContent !== '-')
                    if (currentOperator === null) {
                        firstNumber = Number(display.textContent)
                    } else {
                        secondNumber = Number(display.textContent)
                    }
            }
        })
    });
}

function clear() {
    const clearKey = document.querySelector('.clear') as HTMLButtonElement
    const display = document.querySelector('.display') as HTMLParagraphElement
    clearKey.addEventListener('click', () => {
        display.textContent = '0'
        firstNumber = null
        secondNumber = null
        currentOperator = null
        resetDisplay = false
        lastClickWasOperator = false
        dotUsed = false
    })
}

function operate(firstNumber: number, secondNumber: number, operator: Operator) {
    switch (operator) {
        case '+':
            return roundUpDecimals(addition(firstNumber, secondNumber))
        case '-':
            return roundUpDecimals(subtraction(firstNumber, secondNumber))
        case '*':
            return roundUpDecimals(multiplication(firstNumber, secondNumber))
        case '/':
            return roundUpDecimals(division(firstNumber, secondNumber))
        default:
            throw new Error(`Unknown Error: ${operator}`)
    }
}

function keyboardSupport() {
    document.addEventListener('keydown', (event) => {
        const key = event.key
        if (!isNaN(Number(key))) {
            document.querySelector(`.key.number[data-key="${key}"]`)?.dispatchEvent(new Event('click'))
        } else if (key === '.') {
            document.querySelector('.key.dot')?.dispatchEvent(new Event('click'))
        } else if (key === 'Enter' || key === '=') {
            if (key === 'Enter') {
                event.preventDefault()
            }
            document.querySelector('.key.equal')?.dispatchEvent(new Event('click'))
        } else if (['+', '-', '*', '/'].includes(key)) {
            document.querySelector(`.key.operator[data-key="${key}"]`)?.dispatchEvent(new Event('click'))
        } else if (key === 'c') {
            document.querySelector('.key.clear')?.dispatchEvent(new Event('click'))
        }
    })
}

function main() {
    screenDisplay()
    clear()
    keyboardSupport()
}

main()
