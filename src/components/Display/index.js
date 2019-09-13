import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Display extends Component {
    render() {
        const { input } = this.props;
        return(
            <>
                <input id="display" 
                       type="text" 
                       value={( input === '' ? "0" : input )}
                       readOnly 
                />
            </>
        );
    }
}

Display.propTypes = {
    input: PropTypes.oneOfType([
        PropTypes.string,
         PropTypes.instanceOf(null),
    ]),
};

export default Display;