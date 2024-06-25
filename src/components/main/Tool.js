import React, { useEffect, useState } from "react";
import { Col, Row, Stack } from "react-bootstrap";
import moment from "moment";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";

import DatasetSelector from "@/components/controls/DatasetSelector";
import VariableSelector from "@/components/controls/VariableSelector";
import YearSelector from "@/components/controls/YearSelector";
import MonthSelector from "@/components/controls/MonthSelector";
import IncrementDecrement from "@/components/controls/IncrementDecrement";
import ColourScale from "@/components/map/ColourScale";
import DataMap from "@/components/map/DataMap";
import VariableTitle from "@/components/variables/VariableTitle";
import Help from "@/components/help/Help";

import {
  getBaselineData,
  getLastDateWithDataBefore,
  getMonthlyData,
} from "@/data-services/weather-anomaly-data-service";
import { useConfigContext } from "@/state/context-hooks/use-config-context";

import "@/components/main/Tool.css";

// Note: We use package `moment` for date arithmetic. It is excellent but it
// *mutates* its objects. We are using functional components,
// which require values whose identity changes when their value is changed,
// i.e., a new object. Therefore every change to a `moment` date object should
// be preceded by `.clone()`; for example, `y = x.clone().subtract(1, 'month')`
// yields a new moment object with a value 1 month before the original `x`
// object. `x` is unchanged by this operation, and `y` is a different object
// than `x`.

// Compute likely latest possible date of available data = current date - 15 d.
// This allows for cron jobs that run in first half of month.
// Subtract fewer/more days if cron jobs run earlier/later in month.
// But it is not guaranteed that there is data for this date; that can only be
// determined by consulting the backend.
const latestPossibleDataDate = moment().subtract(15, "days");

export default function Tool() {
  const config = useConfigContext();
  const wadsUrl = config.backends.weatherAnomalyDataService;

  const [variable, setVariable] = useState(config.ui.variableSelector.initial);
  const [dataset, setDataset] = useState(config.ui.datasetSelector.initial);
  const [date, setDate] = useState(latestPossibleDataDate);
  const [baseline, setBaseline] = useState(null);
  const [monthly, setMonthly] = useState(null);

  // Determine latest date with data, and set date to it. This happens once,
  // on first render.
  useEffect(() => {
    setBaseline(null);
    setMonthly(null);
    getLastDateWithDataBefore(variable, date, wadsUrl).then((date) => {
      setDate(date);
    });
  }, []);

  // When variable or date changes, get data.
  // (Both datasets are is retrieved for all values of `dataset`. This could
  // be refined to get only the dataset(s) required by the value of `dataset`.)
  // Consider splitting this into two separate effects, with an if on `dataset`.
  useEffect(() => {
    setBaseline(null);
    setMonthly(null);
    getBaselineData(variable, date, wadsUrl).then((r) => {
      setBaseline(r.data);
    });
    getMonthlyData(variable, date, wadsUrl).then((r) => {
      setMonthly(r.data);
    });
  }, [variable, date]);

  const handleChangeMonth = (month) => {
    console.log("handleChangeMonth month", month);
    setDate((date) => date.clone().month(month));
    console.log("handleChangeMonth date", date);
  };

  const handleChangeYear = (year) => {
    setDate((date) => date.clone().year(year));
  };

  const handleIncrementYear = (by) => {
    setDate((date) => date.clone().add(by, "year"));
  };

  const handleIncrementMonth = (by) => {
    setDate((date) => date.clone().add(by, "month"));
  };

  const isDataLoading = baseline === null || monthly === null;
  const isBaselineDataset = dataset === "baseline";

  const displayColWidths = { xs: 12, md: "auto" };
  const rowSpacing = "mt-3";

  return (
    <>
      <Row className="Tool">
        <Col xs={3} className="selectors">
          <Row className={"my-1"}>
            <Col>
              <Stack direction={"horizontal"} gap={2}>
                <div>Help:</div>
                {config.help.offcanvas.map((item, i) => (
                  <Help
                    key={i}
                    target={<a href={"#"}>{item.title}</a>}
                    title={`Help: ${item.title}`}
                    backdrop={false}
                    placement={item.placement}
                    style={item.style}
                  >
                    <Markdown rehypePlugins={[rehypeRaw]}>{item.body}</Markdown>
                  </Help>
                ))}
              </Stack>
            </Col>
          </Row>
          <Row className={rowSpacing}>
            <Col>Display</Col>
          </Row>
          <Row className={`${rowSpacing} justify-content-md-center`}>
            <Col {...displayColWidths} className="mb-sm-2 mb-lg-0">
              <VariableSelector
                vertical
                disabled={isDataLoading}
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
                disabled={isDataLoading}
                value={date.month()}
                onChange={handleChangeMonth}
              />
            </Col>
          </Row>
          <Row className="mt-0">
            <Col>
              <IncrementDecrement
                id="month-increment"
                disabled={isDataLoading}
                defaultBy={config.ui.monthIncrementDecrement.defaultBy}
                bys={config.ui.monthIncrementDecrement.by}
                onIncrement={handleIncrementMonth}
                styling={config.ui.monthIncrementDecrement.styling}
              />
            </Col>
          </Row>
          {!isBaselineDataset && (
            <React.Fragment>
              <Row className={`${rowSpacing} ps-2 pe-5`}>
                <Col>
                  <YearSelector
                    disabled={isDataLoading}
                    minValue={1970}
                    maxValue={latestPossibleDataDate.year()}
                    value={date.year()}
                    onChange={handleChangeYear}
                  />
                </Col>
              </Row>
              <Row className="mt-0">
                <Col>
                  <IncrementDecrement
                    id="year-increment"
                    disabled={isDataLoading}
                    defaultBy={config.ui.yearIncrementDecrement.defaultBy}
                    bys={config.ui.yearIncrementDecrement.by}
                    onIncrement={handleIncrementYear}
                    styling={config.ui.yearIncrementDecrement.styling}
                  />
                </Col>
              </Row>
            </React.Fragment>
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
            <DataMap
              dataset={dataset}
              variable={variable}
              baseline={baseline}
              monthly={monthly}
            />
          </Row>
        </Col>
      </Row>
    </>
  );
}
