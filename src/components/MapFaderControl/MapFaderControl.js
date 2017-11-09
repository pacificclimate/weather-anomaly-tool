import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'react-bootstrap';

import { bindFunctions } from '../utils';
import StaticControl from '../StaticControl';

import './MapFaderControl.css';

class MapFaderControl extends PureComponent {
    constructor(props) {
        super(props);
        bindFunctions(this, 'handleChange');
    }

    handleChange(event) {
        this.props.onChange(event.target.checked);
    }

    render() {
        return (
            <StaticControl>
                <label>
                    <Checkbox
                        value={this.props.value}
                        onChange={this.handleChange}
                    >
                        Basemap fader controls
                    </Checkbox>
                </label>
            </StaticControl>
        );
    }
}

MapFaderControl.propTypes = {
    onChange: PropTypes.func.isRequired,
};

export default MapFaderControl;
