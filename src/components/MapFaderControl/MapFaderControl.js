import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';
import { FormControl, ControlLabel } from 'react-bootstrap';

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

    handleChangeOpacity(event) {
        this.props.onChangeFaderOpacity(+event.target.value);
    }

    render() {
        return (
                <StaticControl>
                    <div
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
                            <Col lg={2}>Opacity</Col>
                            <Col lg={10}>
                                <FormControl
                                    style={{width: '10em', display: 'inline'}}
                                    type={'range'}
                                    min={0} max={1} step={0.05}
                                    value={this.props.faderOpacity}
                                    onChange={this.handleChangeOpacity}
                                />
                                <span style={{width: '6em', display: 'inline-block', textAlign: 'left'}}>
                                    ({this.props.faderOpacity})
                                </span>
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
