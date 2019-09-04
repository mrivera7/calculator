import React, { Component } from 'react';
import PropTypes from 'prop-types';

class OperatorButton extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { props } = this;
        return(
            <>
                <button id={props.id}
                        className={props.className} 
                        value={props.value} 
                        onClick={props.event}>
                    {props.value}
                </button>
            </>
        );
    }
}

OperatorButton.defaultProps = {
    className: "btn waves-effect waves-light operatorButton",
};

OperatorButton.propTypes = {
    id: PropTypes.string.isRequired,
    className: PropTypes.string,
    value: PropTypes.string.isRequired,
    event: PropTypes.func.isRequired,
};

export default OperatorButton;