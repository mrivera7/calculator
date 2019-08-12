import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Button extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { props } = this;
        return(
            <button id={props.id} className={props.className} value={props.value} onClick={props.onClick}>{ props.value }</button>
        );
    }
}

Button.defaultProps = {
    className: "btn waves-effect waves-light",
};

Button.propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    value: PropTypes.number,
    onClick: PropTypes.func,
};

export default Button;