import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class NumberButton extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { props } = this;
        return(
            <>
            <button id={props.id} 
                    className={props.className} 
                    value={(props.sign === '-' ? Number(`${props.sign}${props.value}`) : props.value)} 
                    onClick={props.event}>
                { props.value }
            </button>
            </>
        );
    }
}

NumberButton.defaultProps = {
    className: "btn waves-effect waves-light numberButton",
};

NumberButton.propTypes = {
    id: PropTypes.string.isRequired,
    className: PropTypes.string,
    sign: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    event: PropTypes.func.isRequired,
};

export default NumberButton;