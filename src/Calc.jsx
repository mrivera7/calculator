import React, { Component } from 'react';
import * as _ from 'lodash';

import Display from './components/Display';
import Button from './components/Button';

import './sass/main.scss';

export class Calc extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            output: '',
            lastInput: '',
            test: '',
            terms: [],
        }
        this.numberPressed = this.numberPressed.bind(this);
        this.zeroPressed = this.zeroPressed.bind(this);
        this.decimalPressed = this.decimalPressed.bind(this);
        this.operatorPressed = this.operatorPressed.bind(this);
        this.negate = this.negate.bind(this);
        this.evaluate = this.evaluate.bind(this);
        this.clear = this.clear.bind(this);
        this.clearEntry = this.clearEntry.bind(this);
    }
    operatorPressed(e) {
        const { value } = e.target;
        const { input, lastInput, terms, output } = this.state;

        if (terms.length === 0) {
            this.setState({ 
                input: '',
                output: output.concat(value),
                lastInput: value,
                terms: [ input, value ],
            });
        } else {
            if ( /[.*/+-]/.test(lastInput) ) {
                this.setState({
                    input: '',
                    output: output.substring(0, output.length - 1).concat(value),
                    lastInput: value,
                    terms: terms.slice(0, terms.length - 1).concat(value),
                });
            } else {
                this.setState({ 
                    input: '',
                    output: output.concat(value),
                    lastInput: value,
                    terms: [ ...terms, input, value ],
                });
            }
        }   
    }
    negate() {
        const { input, output } = this.state;

        this.setState({
            input: input.concat('-'),
            output: output.concat('-'),
            lastInput: '-',
        });
    }
    decimalPressed() {
        const { input, lastInput, output } = this.state;

        if (( input === '' ) || ( /[*/+-]/.test(lastInput) )) {
            this.setState({ 
                input: input.concat('.'),
                output: output.concat('.'),
                lastInput: '.',
            });
        } else {
            const match = input.match( /[*/+-]/ );

            if (match !== null) {
                const lastTerm = input.slice( input.lastIndexOf( match[match.length - 1] ) + 1 );
                
                if (!/[.]/.test(lastTerm)) {
                    this.setState({ 
                        input: input.concat('.'),
                        output: output.concat('.'),
                        lastInput: '.',
                    });
                }
            } else {
                if (!/[.]/.test(input)) {
                    this.setState({
                        input: input.concat('.'),
                        output: output.concat('.'),
                        lastInput: '.',
                    });
                }
            }
        }
    }
    zeroPressed() {
        const { input, output } = this.state;

        if (( input !== '' ) || ( /[.]$/.test(input) )) {
            this.setState({ 
                input: input.concat('0'),
                output: output.concat('0'),
                lastInput: '0',
            });
        }
    }
    numberPressed(e) {
        let { value } = e.target;
        let { input, output } = this.state;

        this.setState({ 
            input: input.concat(value),
            output: output.concat(value),
            lastInput: value,
        });
    }
    evaluate() {
        const { input, terms } = this.state;
        let allTerms = [ ...terms, input ];
        let result = [ ...allTerms ];

        const operations = {
            '*': (x, y) => _.multiply(x, y),
            '/': (x, y) => _.divide(x, y),
            '+': (x, y) => _.add(x, y),
            '-': (x, y) => _.subtract(x, y),
        };

        for (let o of [[ '*', '/' ], [ '+', '-' ]]) 
        {
            if (( _.includes(result, o[0]) ) || ( _.includes(result, o[1]) ))
            {
                for (let i=0; i <= result.length; i++) 
                {
                    let currentTerm = result[i];
                    if (( currentTerm === o[0] ) || ( currentTerm === o[1] ))
                    {
                        let a = i - 1, b = i + 1;
                        let x = Number(result[a]);
                        let y = Number(result[b]);
                        let answer = operations[currentTerm](x, y);

                        if (result.length === 3) 
                        {
                            result = answer;
                        } else 
                        {
                            result.splice(a, 3, `${answer}`);
                        }
                        if(( o[1] === '-' ) && ( result.length > 1 )) { i = 0 };
                        if ( result.length === 1 ) { break };
                    }
                }
            } 
        }

        this.setState({
            input: `${result}`,
            lastInput: `${result}`,
            output: `${result}`,
            terms: [],
        });
    }
    clear() {
        this.setState({
            input: '',
            output: '',
            lastInput: '',
            terms: [],
        });
    }
    
    clearEntry() {
        let { output, lastInput, terms } = this.state;

        if ( /\d/.test(lastInput) )
        {
            this.setState({ 
                input: '',
                lastInput: terms[terms.length - 1],
                output: output.substring(0, output.lastIndexOf(lastInput.substring(0))),
            });
        }  /*
        else if ( terms.length === 0 && lastInput !== '' ) 
        {
            this.clear();
        }*/
        else {
            this.setState({
                input: '',
                lastInput: terms[terms.length - 1],
                output: output.substring(0, output.lastIndexOf(lastInput.substring(0))),
                terms: terms.slice(0, terms.length - 1),
            });
        }
        
    }
    render() {
        const { output, input, /* lastInput, terms */ } = this.state;
        // console.log(terms, input, lastInput, output);
        return(
            <>
                <div className="App">
                    <Display input={output} />
                    <div className="Keypad">
                        <Button id="clear" value="C" event={this.clear} />
                        <Button id="clearEntry" value="CE" event={this.clearEntry} />
                        <Button id="divide" value="/" event={this.operatorPressed} />
                        <Button id="multiply" value="*" event={this.operatorPressed} />
                        <Button id="seven" value={7} event={this.numberPressed} />
                        <Button id="eight" value={8} event={this.numberPressed} />
                        <Button id="nine" value={9} event={this.numberPressed} />
                        <Button id="subtract" 
                                value="-" 
                                event={( input === '' ? this.negate : this.operatorPressed )} 
                        />
                        <Button id="four" value={4} event={this.numberPressed} />
                        <Button id="five" value={5} event={this.numberPressed} />
                        <Button id="six" value={6} event={this.numberPressed} />
                        <Button id="add" value="+" event={this.operatorPressed} />
                        <Button id="one" value={1} event={this.numberPressed} />
                        <Button id="two" value={2} event={this.numberPressed} />
                        <Button id="three" value={3} event={this.numberPressed} />
                        <Button id="zero" value={0} event={this.zeroPressed} />
                        <Button id="decimal" value="." event={this.decimalPressed} />
                        <Button id="equals" value="=" event={this.evaluate} />
                    </div>
                </div>
            </>
        );
    }
};

export default Calc;
