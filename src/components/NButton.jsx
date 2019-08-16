import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class NButton extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { props } = this;
        return(
            <>
            <button id={props.id} className={props.className} value={props.value} onClick={props.onClick}>{ props.value }</button>
            </>
        );
    }
}

NButton.defaultProps = {
    className: "btn waves-effect waves-light",
};

NButton.propTypes = {
    id: PropTypes.string.isRequired,
    className: PropTypes.string,
    value: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default NButton;