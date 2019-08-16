import React, { Component } from 'react';
import PropTypes from 'prop-types';

import NButton from './NButton';

export class Keypad extends Component {
    constructor(props) {
        super(props);
        
    }
    render() {
        const { props } = this;
        return(
            <>
            <div className="buttonCluster">
                <NButton id="seven" value={7} onClick={props.onClick} />
                <NButton id="eight" value={8} onClick={props.onClick} />
                <NButton id="nine" value={9} onClick={props.onClick} />
                <NButton id="four" value={4} onClick={props.onClick} />
                <NButton id="five" value={5} onClick={props.onClick} />
                <NButton id="six" value={6} onClick={props.onClick} />
                <NButton id="one" value={1} onClick={props.onClick} />
                <NButton id="two" value={2} onClick={props.onClick} />
                <NButton id="three" value={3} onClick={props.onClick} />
                <NButton id="zero" value={0} onClick={props.onClick} />
            </div>
            </>
        );
    }
};

Keypad.propTypes = {
    onClick: PropTypes.func.isRequired,
};

export default Keypad;