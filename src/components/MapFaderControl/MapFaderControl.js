import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';

import InputRange from 'react-input-range';

import { bindFunctions } from '../utils';
import StaticControl from '../StaticControl';
import RadioButtonSelector from '../RadioButtonSelector';

import './MapFaderControl.css';

class MapFaderControl extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            showControls: false,
        };
        bindFunctions(this, 'handleMouseEnter handleMouseLeave handleChangeOpacity');
    }

    handleMouseEnter() {
        this.setState({showControls: true});
    }

    handleMouseLeave() {
        this.setState({showControls: false});
    }

    handleChangeOpacity(value) {
        this.props.onChangeFaderOpacity(value);
    }

    render() {
        return (
                <StaticControl>
                    <div
                        className={'MapFaderControl'}
                        onMouseEnter={this.handleMouseEnter}
                        onMouseLeave={this.handleMouseLeave}
                    >
                        <Row>
                            <Col lg={12}>Basemap Fader</Col>
                        </Row>

                        {this.state.showControls &&
                        <Row>
                            <Col lg={2}>Color</Col>
                            <Col lg={10}>
                                <RadioButtonSelector
                                    name={'fader-color'}
                                    options={[
                                        {label: 'Black', value: 'black'},
                                        {label: 'Grey', value: '#777777'},
                                        {label: 'White', value: 'white'},
                                    ]}
                                    value={this.props.faderColor}
                                    bsSize={'xsmall'}
                                    onChange={this.props.onChangeFaderColor}
                                />
                            </Col>
                        </Row>
                        }

                        {this.state.showControls &&
                        <Row>
                            <Col lg={3}>Opacity</Col>
                            <Col lg={8}>
                                <InputRange
                                    minValue={0} maxValue={1} step={0.05}
                                    formatLabel={value => value.toFixed(2)}
                                    value={this.props.faderOpacity}
                                    onChange={this.handleChangeOpacity}
                                />
                            </Col>
                        </Row>
                        }
                    </div>
                </StaticControl>
        );
    }
}

MapFaderControl.propTypes = {
    faderOpacity: PropTypes.number,
    faderColor: PropTypes.string,
    onChangeFaderOpacity: PropTypes.func.isRequired,
    onChangeFaderColor: PropTypes.func.isRequired,
};

export default MapFaderControl;
