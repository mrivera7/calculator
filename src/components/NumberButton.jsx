import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from './Button';

export class NumberButton extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { props } = this;
        return(
            <>
                <Button id={props.id} value={props.value} onClick={props.onClick} />
            </>
        );
    }
}


NumberButton.propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    value: PropTypes.number,
    onClick: PropTypes.func,
};

export default NumberButton;