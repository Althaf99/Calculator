class Calculator {
    constructor(previousOperandTextElement, currrentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currrentOperandTextElement = currrentOperandTextElement;
        this.clear()
    }

    clear() {
        this.previousOperand = ''
        this.currentOperand = ''
        this.operation = undefined
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.currentOperand == '') return
        if (this.previousOperand != '') {
            this.comput()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    comput() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        //Nan ==== Not a number
        if (isNaN(current) || isNaN(prev)) return

        switch (this.operation) {
            case '+':
                computation = current + prev
                break;

            case '-':
                computation = current - prev
                break;

            case '*':
                computation = current * prev
                break;

            case '÷':
                computation = current / prev
                break;

            default:
                return

        }
        this.currentOperand = computation
        this.operation = ''
        this.previousOperand = undefined
    }

    updateDisplay() {
        this.currrentOperandTextElement.innerText = this.currentOperand
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = this.previousOperand
        }

    }
}



const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currrentOperandTextElement = document.querySelector('[data-current-operand]')


const calculator = new Calculator(previousOperandTextElement, currrentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.comput()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})
