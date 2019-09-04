import React, { Component } from 'react';
import PropTypes from 'prop-types';

import NumberButton from './NumberButton';
import OperatorButton from './OperatorButton';

class Keypad extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { props } = this;
        return(
            <>
                <div className="buttonCluster">
                    <NumberButton id="seven" value={7} sign={props.sign} event={props.event} />
                    <NumberButton id="eight" value={8} sign={props.sign} event={props.event} />
                    <NumberButton id="nine" value={9} sign={props.sign} event={props.event} />
                    <OperatorButton id="multiply" value="*" event={props.event} />
                    <NumberButton id="four" value={4} sign={props.sign} event={props.event} />
                    <NumberButton id="five" value={5} sign={props.sign} event={props.event} />
                    <NumberButton id="six" value={6} sign={props.sign} event={props.event} />
                    <OperatorButton id="subtract" value="-" event={props.event} />
                    <NumberButton id="one" value={1} sign={props.sign} event={props.event} />
                    <NumberButton id="two" value={2} sign={props.sign} event={props.event} />
                    <NumberButton id="three" value={3} sign={props.sign} event={props.event} />
                    <OperatorButton id="add" value="+" event={props.event} />
                    <NumberButton id="zero" value={0} sign={props.sign} event={props.event} />
                    <button id="decimal" className="btn waves-effect waves-light numberButton" value="." event={props.event}>.</button>
                    <OperatorButton id="equal" value="=" event={props.event} />
                </div>
            </>
        );
    }
};

Keypad.propTypes = {
    sign: PropTypes.string.isRequired,
    event: PropTypes.func.isRequired,
};

export default Keypad;