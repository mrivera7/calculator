import React, { Component } from 'react';
import PropTypes from 'prop-types';

import NumberButton from './NumberButton';
import Button from './Button';

export class Keyboard extends Component {
    constructor(props) {
        super(props);
        this.zero = React.createRef();
        this.inputVal = this.inputVal.bind(this);
    }
    inputVal() {
        
    }
    render() {
        return(
            <div>
                <NumberButton id="zero" value={0} ref={} />
            </div>
        );
    }
}