import React, { Component } from 'react';
import * as _ from 'lodash';
// import './App.css';
import './App.sass';
import M from 'materialize-css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: null,
            test: '',
            evaluated: false,
        }
        this.buttonPressed = this.buttonPressed.bind(this);
        this.evaluate = this.evaluate.bind(this);
        this.clear = this.clear.bind(this);
        this.clearEntry = this.clearEntry.bind(this);
    }
    buttonPressed(e) {
        let { value } = e.target;
        let { input, evaluated } = this.state;
        
        try {
        if (!evaluated) {
            if (input === null) {
                if (!/[0*/+-]/.test(value)) {
                    this.setState({ input: value });
                }
            } else {
                if (/\d/.test(value)) {
                    this.setState({ input: input.concat(value) });
                } else if (/[*/+-]/.test(value)) {
                    if (/[*/+-]$/.test(input)) {
                        this.setState({ input: _.replace(input, /[*/+-]$/, value) });
                    } else {
                        this.setState({ input: input.concat(value) });
                    }
                } else {
                    if (/\./.test(value)) {
                        let match = _.split(input, /[*/+-]/);
                        if (!_.includes(match[match.length-1], ".")) {
                            this.setState({ input: input.concat(value) });
                        }
                    }
                }
            }
        } else {
            if (/[*/+-]/.test(value)) {
                this.setState({ 
                    input: input.concat(value),
                    evaluated: false
                });
            } else {
                this.setState({
                    input: value,
                    evaluated: false
                });
            }
        }
        }
        catch(e) {
            console.log(`Error in buttonPress: ${e}`);            
        }
    }
    evaluate() {
        let { input } = this.state;
        let placeholder = input;
        
        try {
            if(/[*/]/g.test(input)){
                let matchMD = [...input.match(/((?:[\d]+)?[.]?(?:[\d]*)?[*/](?:[\d]+)?[.]?(?:[\d]*)?)/g)];

                while(matchMD.length > 0) {
                        if (_.includes(matchMD[0], '*')) {
                            let arg = _.split(matchMD[0], '*');
                            input = _.replace(input, matchMD[0], _.multiply(Number(arg[0]), Number(arg[1])));
                        } else if (_.includes(matchMD[0], '/')) {
                            let arg = _.split(matchMD[0], '/');
                            input = _.replace(input, matchMD[0], _.divide(Number(arg[0]), Number(arg[1])));
                        }
                    // }
                    try {
                        matchMD = [...input.match(/((?:[\d]+)?[.]?(?:[\d]*)?[*/](?:[\d]+)?[.]?(?:[\d]*)?)/g)];
                    } catch(e) {
                        // console.log(e);
                        break;
                    }
                    console.log(matchMD, matchMD.length);
                }
            }
        } catch (e) {
            console.log(e);
        }
        
        try {
            if(/[+-]/g.test(input)) {
                let matchAS = [...input.match(/((?:[\d]+)?[.]?(?:[\d]*)?[+-](?:[\d]+)?[.]?(?:[\d]*)?)/g)];

                while(matchAS.length) {
                    if (_.includes(matchAS[0], '+')) {
                        let arg = _.split(matchAS[0], '+');
                        input = _.replace(input, matchAS[0], _.add(Number(arg[0]), Number(arg[1])));
                    } else {
                        let arg = _.split(matchAS[0], '-');
                        input = _.replace(input, matchAS[0], _.subtract(Number(arg[0]), Number(arg[1])));
                    }
                    // console.log(input);
                    try {
                    matchAS = [...input.match(/((?:-)?(?:[\d]+)?[.]?(?:[\d]*)?[+-](?:[\d]+)?[.]?(?:[\d]*)?)/g)];
                    } catch(e) {
                        // console.log(e);
                        break;
                    }
                }
            }
        } catch (e) {
            console.log(e);
        }

        if (_.includes(`${input}`, '.')) {
            this.setState({
                input: _.trim(`${Number(input).toFixed(8)}`, '0'),
                test: placeholder,
                evaluated: true
            });
        } else {
            this.setState({
                input: input,
                test: placeholder,
                evaluated: true
            });
        }
    }
    clear() {
        this.setState({
            input: null,
            test: null,
            evaluated: false
        });
    }
    
    clearEntry() {
        let { input } = this.state;
        let match = input.match(/([\d]+)$/);
        input = _.replace(input, match[0], '');
        this.setState({ 
            input: input,
        });
    }
    
    componentDidMount() {
        M.AutoInit();
    }
    render() {
        const { input } = this.state;
        return(
            <div className="App blue-grey lighten-5 z-depth-3">
                <div id="displayCluster">
                    <input id="display" type="text" readOnly value={ (input === null ? "0" : input) } />
                </div>
                <div id="buttonCluster">
                    <button id="clear" className="btn waves-effect waves-light" onClick={this.clear}>C</button>
                    <button id="clearEntry" className="btn waves-effect waves-light" onClick={this.clearEntry}>CE</button>
                    <button id="divide" className="btn waves-effect waves-light" value="/" onClick={this.buttonPressed}>/</button>
                    <button id="seven" className="btn waves-effect waves-light" value="7" onClick={this.buttonPressed}>7</button>
                    <button id="eight" className="btn waves-effect waves-light" value="8" onClick={this.buttonPressed}>8</button>
                    <button id="nine" className="btn waves-effect waves-light" value="9" onClick={this.buttonPressed}>9</button>
                    <button id="multiply" className="btn waves-effect waves-light" value="*" onClick={this.buttonPressed}>*</button>
                    <button id="four" className="btn waves-effect waves-light" value="4" onClick={this.buttonPressed}>4</button>
                    <button id="five" className="btn waves-effect waves-light" value="5" onClick={this.buttonPressed}>5</button>
                    <button id="six" className="btn waves-effect waves-light" value="6" onClick={this.buttonPressed}>6</button>
                    <button id="subtract" className="btn waves-effect waves-light" value="-" onClick={this.buttonPressed}>-</button>
                    <button id="one" className="btn waves-effect waves-light" value="1" onClick={this.buttonPressed}>1</button>
                    <button id="two" className="btn waves-effect waves-light" value="2" onClick={this.buttonPressed}>2</button>
                    <button id="three" className="btn waves-effect waves-light" value="3" onClick={this.buttonPressed}>3</button>
                    <button id="add" className="btn waves-effect waves-light" value="+" onClick={this.buttonPressed}>+</button>
                    <button id="zero" className="btn waves-effect waves-light" value="0" onClick={this.buttonPressed}>0</button>
                    <button id="decimal" className="btn waves-effect waves-light" value="." onClick={this.buttonPressed}>.</button>
                    <button id="equals" className="btn waves-effect waves-light" value="=" onClick={this.evaluate}>=</button>
                    {/*
                    <div class="buttonRow">
                        <button id="clear" className="btn waves-effect waves-light" onClick={this.clear}>C</button>
                        <button id="clearEntry" className="btn waves-effect waves-light" onClick={this.clearEntry}>CE</button>
                        <button id="divide" className="btn waves-effect waves-light" value="/" onClick={this.buttonPressed}>/</button>
                    </div>
                    <div class="buttonRow">
                        <button id="seven" className="btn waves-effect waves-light" value="7" onClick={this.buttonPressed}>7</button>
                        <button id="eight" className="btn waves-effect waves-light" value="8" onClick={this.buttonPressed}>8</button>
                        <button id="nine" className="btn waves-effect waves-light" value="9" onClick={this.buttonPressed}>9</button>
                        <button id="multiply" className="btn waves-effect waves-light" value="*" onClick={this.buttonPressed}>*</button>
                    </div>
                    <div class="buttonRow">
                        <button id="four" className="btn waves-effect waves-light" value="4" onClick={this.buttonPressed}>4</button>
                        <button id="five" className="btn waves-effect waves-light" value="5" onClick={this.buttonPressed}>5</button>
                        <button id="six" className="btn waves-effect waves-light" value="6" onClick={this.buttonPressed}>6</button>
                        <button id="subtract" className="btn waves-effect waves-light" value="-" onClick={this.buttonPressed}>-</button>
                    </div>
                    <div class="buttonRow">
                        <button id="one" className="btn waves-effect waves-light" value="1" onClick={this.buttonPressed}>1</button>
                        <button id="two" className="btn waves-effect waves-light" value="2" onClick={this.buttonPressed}>2</button>
                        <button id="three" className="btn waves-effect waves-light" value="3" onClick={this.buttonPressed}>3</button>
                        <button id="add" className="btn waves-effect waves-light" value="+" onClick={this.buttonPressed}>+</button>
                    </div>
                    <div class="buttonRow">
                        <button id="zero" className="btn waves-effect waves-light" value="0" onClick={this.buttonPressed}>0</button>
                        <button id="decimal" className="btn waves-effect waves-light" value="." onClick={this.buttonPressed}>.</button>
                        <button id="equals" className="btn waves-effect waves-light" value="=" onClick={this.evaluate}>=</button>
                    </div>
                    */}
                </div>
            </div>
        );
    }
}

export default App;