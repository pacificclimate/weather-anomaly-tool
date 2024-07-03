import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import moment from "moment";

import Help from "@/components/help/Help";
import Loading from "@/components/util/Loading";
import DatasetSelector from "@/components/controls/DatasetSelector";
import VariableSelector from "@/components/controls/VariableSelector";
import YearSelector from "@/components/controls/YearSelector";
import MonthSelector from "@/components/controls/MonthSelector";
import IncrementDecrement from "@/components/controls/IncrementDecrement";
import ColourScale from "@/components/map/ColourScale";
import DataMap from "@/components/map/DataMap";
import VariableTitle from "@/components/variables/VariableTitle";

import { useConfigContext } from "@/state/context-hooks/use-config-context";
import useBaseline from "@/state/query-hooks/use-baseline";
import useMonthly from "@/state/query-hooks/use-monthly";
import useDateState from "@/state/query-hooks/use-date-state";

import "@/components/main/Tool.css";
import { clipMoment } from "@/components/utils";

// Note: We use package `moment` for date arithmetic. It is excellent but it
// *mutates* its objects. We are using functional components,
// which require values whose identity changes when their value is changed,
// i.e., a new object. Therefore every change to a `moment` date object should
// be preceded by `.clone()`; for example, `y = x.clone().subtract(1, 'month')`
// yields a new moment object with a value 1 month before the original `x`
// object. `x` is unchanged by this operation, and `y` is a different object
// than `x`.

export default function Tool() {
  const config = useConfigContext();

  // Application state
  const [variable, setVariable] = useState(config.ui.variableSelector.initial);
  const [dataset, setDataset] = useState(config.ui.datasetSelector.initial);
  const {
    isPending: dateIsPending,
    lastDateWithMonthlyData,
    date,
    setDate,
  } = useDateState();

  // Server state
  const { isPending: baselineIsPending } = useBaseline(variable, date);
  const { isPending: monthlyIsPending } = useMonthly(variable, date);

  const minYear = config.ui.yearSelector.minYear;
  const minDate = moment({ year: minYear })
  // There's a tricky and unresolved problem when dates are incremented beyond
  // lastDateWithMonthlyData: the stations displayed on the map get out of sync
  // with the actual date and data. This prevents such incrementing, and so the
  // erroneous maps, but it does not fix the bug causing the error with the station
  // markers.
  const maxDate = lastDateWithMonthlyData;
  const clipDate = (date) => clipMoment(date, minDate, maxDate);

  // TODO: It would be much better to isolate the date-handling mechanism in
  //  a separate component, but it requires quite a bit of data that will be
  //  tedious to pass around, so we will delay this until state is
  //  moved to Zustand.
  const handleChangeMonth = (month) => {
    setDate((date) => date.clone().month(month));
  };

  const handleChangeYear = (year) => {
    setDate((date) => date.clone().year(year));
  };

  const handleIncrementYear = (by) => {
    setDate((date) => clipDate(date.clone().add(by, "year")));
  };

  const handleIncrementMonth = (by) => {
    setDate((date) => clipDate(date.clone().add(by, "month")));
  };

  const stationDataIsPending = baselineIsPending || monthlyIsPending;
  const isBaselineDataset = dataset === "baseline";

  const displayColWidths = { xs: 12, md: "auto" };
  const rowSpacing = "mt-3";

  if (dateIsPending) {
    return <Loading>Starting...</Loading>;
  }

  return (
    <>
      <Row className="Tool">
        <Col xs={3} className="selectors">
          <Row className={"my-1"}>
            <Col>
              <Help />
            </Col>
          </Row>
          <Row className={rowSpacing}>
            <Col>Display</Col>
          </Row>
          <Row className={`${rowSpacing} justify-content-md-center`}>
            <Col {...displayColWidths} className="mb-sm-2 mb-lg-0">
              <VariableSelector
                vertical
                disabled={stationDataIsPending}
                value={variable}
                onChange={setVariable}
                styling={config.ui.variableSelector.styling}
              />
            </Col>
            <Col {...displayColWidths}>
              <DatasetSelector
                vertical
                value={dataset}
                onChange={setDataset}
                styling={config.ui.datasetSelector.styling}
              />
            </Col>
          </Row>
          <Row className={rowSpacing}>
            <Col>for</Col>
          </Row>
          <Row className={`${rowSpacing} mt-1 ps-2 pe-5`}>
            <Col>
              <MonthSelector
                disabled={stationDataIsPending}
                value={date.month()}
                onChange={handleChangeMonth}
              />
            </Col>
          </Row>
          <Row className="mt-0">
            <Col>
              <IncrementDecrement
                id="month-increment"
                disabled={stationDataIsPending}
                defaultBy={config.ui.monthIncrementDecrement.defaultBy}
                bys={config.ui.monthIncrementDecrement.by}
                onIncrement={handleIncrementMonth}
                styling={config.ui.monthIncrementDecrement.styling}
              />
            </Col>
          </Row>
          {!isBaselineDataset && (
            <>
              <Row className={`${rowSpacing} ps-2 pe-5`}>
                <Col>
                  <YearSelector
                    disabled={stationDataIsPending}
                    minValue={minYear}
                    maxValue={maxDate.year()}
                    value={date.year()}
                    onChange={handleChangeYear}
                  />
                </Col>
              </Row>
              <Row className="mt-0">
                <Col>
                  <IncrementDecrement
                    id="year-increment"
                    disabled={stationDataIsPending}
                    defaultBy={config.ui.yearIncrementDecrement.defaultBy}
                    bys={config.ui.yearIncrementDecrement.by}
                    onIncrement={handleIncrementYear}
                    styling={config.ui.yearIncrementDecrement.styling}
                  />
                </Col>
              </Row>
            </>
          )}
        </Col>
        <Col xs={9}>
          <Row className="my-1">
            <Col>
              <VariableTitle
                variable={variable}
                dataset={dataset}
                date={date}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <ColourScale variable={variable} dataset={dataset} />
            </Col>
          </Row>
          <Row>
            <DataMap dataset={dataset} variable={variable} date={date} />
          </Row>
        </Col>
      </Row>
    </>
  );
}
