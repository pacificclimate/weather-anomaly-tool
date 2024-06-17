import React from 'react';
import PropTypes from 'prop-types';

import { Slider, Handles, Rail, Ticks } from "react-compound-slider";
import css from './SingleValueSlider.module.css';


function Handle({
  handle: { id, value, percent },
  formatLabel,
  getHandleProps
}) {
    return (
      <div
        className={css.handleBar}
        style={{ left: `${percent}%` }}
        {...getHandleProps(id)}
      >
        <div className={css.handleLabel}>
          {formatLabel({value, percent})}
        </div>
      </div>
    )
}


function Tick({
  tick, count, formatLabel,
}) {
  return (
    <div>
      <div
        className={css.tickMark}
        style={{ left: `${tick.percent}%` }}
      />
      <div
        className={css.tickLabel}
        style={{
          marginLeft: `${-(100 / count) / 2}%`,
          width: `${100 / count}%`,
          left: `${tick.percent}%`,
        }}
      >
        {formatLabel(tick)}
      </div>
    </div>
  )
}


function SingleValueSlider({
  value, onChange, minValue, maxValue,
  step = 1,
  formatLabel = ({value}) => value,
  ticks,
}) {
  const domain = [minValue, maxValue]
  const values = [value];
  let handleChange = values => {
    onChange(values[0])
  };

  return (
      <Slider
        className={css.sliderStyle}
        domain={domain}
        step={step}
        values={values}
        onChange={handleChange}
      >
        <Rail>
          {({ getRailProps }) => (
            <div className={css.railStyle} {...getRailProps()} />
          )}
        </Rail>
        <Handles>
          {
            ({ handles, getHandleProps }) => (
              <div className="slider-handles">
                {handles.map(handle => (
                  <Handle
                    key={handle.id}
                    handle={handle}
                    formatLabel={formatLabel}
                    getHandleProps={getHandleProps}
                  />
                ))}
              </div>
            )
          }
        </Handles>
        <Ticks {...ticks}>
          {
            ({ ticks }) => (
              <div className={"slider-ticks"}>
                {ticks.map(tick => (
                  <Tick key={tick.id} tick={tick} count={ticks.length} formatLabel={formatLabel}/>
                ))}
              </div>
            )
          }
        </Ticks>
      </Slider>
  );
}

SingleValueSlider.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};

export default SingleValueSlider;
