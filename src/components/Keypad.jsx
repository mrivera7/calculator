import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from './Button';

class Keypad extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render() {
        const { props } = this;
        return(
            <div className="Keypad">
                <Button id="clear" value="C" event={props.event} />
                <Button id="clearEntry" value="CE" event={props.event} />
                <Button id="divide" value="/" event={props.event} />
                <Button id="multiply" value="*" event={props.event} />
                <Button id="seven" value={7} event={props.event} />
                <Button id="eight" value={8} event={props.event} />
                <Button id="nine" value={9} event={props.event} />
                <Button id="subtract" value="-" event={props.event} />
                <Button id="four" value={4} event={props.event} />
                <Button id="five" value={5} event={props.event} />
                <Button id="six" value={6} event={props.event} />
                <Button id="add" value="+" event={props.event} />
                <Button id="one" value={1} event={props.event} />
                <Button id="two" value={2} event={props.event} />
                <Button id="three" value={3} event={props.event} />
                <Button id="zero" value={0} event={props.event} />
                <Button id="decimal" value="." event={props.event} />
                <Button id="equal" value="=" event={props.event} />
            </div>
        );
    }
};

Keypad.propTypes = {
    event: PropTypes.func.isRequired,
};

export default Keypad;