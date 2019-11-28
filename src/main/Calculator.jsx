import React, { Component } from 'react';
import './Calculator.css';

import Display from '../components/Display'
import Button from '../components/Button'

const initialState = {
    oldValueDisplay: "0",
    currentValueDisplay: "0",
    operationExists: false,
    executeOperation: false,
    previousOperation: null,
    lastCharacter: null
};

const operations = ['+', '-', '*', '/', '='];

export default class Calculator extends Component {

    state = { ...initialState }

    clearMemory = () => this.setState({ ...initialState });

    addDigit = (digit) => {
        if (this.state.currentValueDisplay === "0" || this.state.operationExists) {
            this.setState({ currentValueDisplay: digit, operationExists: false });
        } else {
            if (!this.state.currentValueDisplay.includes('.') || digit !== '.') {
                const currentValueDisplay = this.state.currentValueDisplay + digit;
                this.setState({ currentValueDisplay });
            }
        }

        this.setState({ lastCharacter: digit })
    }


    setOperation = (operation) => {
        const isEqual = operation === '=' ? this.state.previousOperation : operation

        if (this.state.executeOperation && (operation === '='
            || !operations.includes(this.state.lastCharacter))) {
            this.setState({
                oldValueDisplay: this.getOperation(operation),
                currentValueDisplay: this.getOperation(operation)
            });
        } else {
            this.setState({
                oldValueDisplay: this.state.currentValueDisplay,
                executeOperation: true
            });
        }

        this.setState({
            operationExists: true, previousOperation: isEqual,
            lastCharacter: operation
        });
    }

    getOperation = (operation) => {
        const oldValueDisplay = Number(this.state.oldValueDisplay);
        const currentValueDisplay = Number(this.state.currentValueDisplay);

        switch (operation) {
            case '+':
                return oldValueDisplay + currentValueDisplay;
            case '-':
                return oldValueDisplay - currentValueDisplay;
            case '*':
                return oldValueDisplay * currentValueDisplay;
            case '/':
                return oldValueDisplay / currentValueDisplay;
            default:
                return this.getOperation(this.state.previousOperation);
        }
    }

    render() {
        return (
            <div className="calculator">
                <Display value={this.state.currentValueDisplay} />
                <Button label="AC" click={this.clearMemory} triple />
                <Button label="/" click={this.setOperation} operation />
                <Button label="7" click={this.addDigit} />
                <Button label="8" click={this.addDigit} />
                <Button label="9" click={this.addDigit} />
                <Button label="*" click={this.setOperation} operation />
                <Button label="4" click={this.addDigit} />
                <Button label="5" click={this.addDigit} />
                <Button label="6" click={this.addDigit} />
                <Button label="-" click={this.setOperation} operation />
                <Button label="1" click={this.addDigit} />
                <Button label="2" click={this.addDigit} />
                <Button label="3" click={this.addDigit} />
                <Button label="+" click={this.setOperation} operation />
                <Button label="0" click={this.addDigit} double />
                <Button label="." click={this.addDigit} />
                <Button label="=" click={this.setOperation} operation />
            </div>
        )
    }
}
