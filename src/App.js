import React, { Component } from 'react';
import * as _ from 'lodash';

import Display from './components/Display';
import Keypad from './components/Keypad';

// import './App.css';
import './sass/main.scss';
// import M from 'materialize-css';

export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: null,
            test: '',
            evaluated: false,
            sign: '+',
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
    /*
    componentDidMount() {
        M.AutoInit();
    }*/
    render() {
        const { input } = this.state;
        return(
            <>
                <div className="App">
                    {/*
                    <div id="displayCluster">
                        <input id="display" 
                               type="text" 
                               value={ (input === null ? "0" : input) } 
                               readOnly 
                        />
                    </div>*/}
                    <Display input={input} />
                    <Keypad input={input} event={this.buttonPressed} />
                </div>
            </>
        );
    }
};

export default App;
