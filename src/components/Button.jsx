import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Button extends Component {
    render() {
        const { props } = this;
        return(
            <>
            <button id={props.id} 
                    className={props.className} 
                    value={props.value} 
                    onClick={props.event}>
                { props.value }
            </button>
            </>
        );
    }
}

Button.defaultProps = {
    className: "Button",
};

Button.propTypes = {
    id: PropTypes.string.isRequired,
    className: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.oneOf(['=', '+', '-', '*', '/', '.', 'C', 'CE']),
        PropTypes.number,
    ]).isRequired,
    event: PropTypes.func.isRequired,
};

export default Button;