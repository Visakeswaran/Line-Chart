/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";
import moment from "moment";
import { _numberToHumanReadableFormatConverter } from "../utils/helpers";
import flatten from "lodash/flatten";
import uniq from "lodash/uniq";

/**
 * Bar Chart Component
 *
 * @param {Number} height
 * @param {Number} width
 * @param {Object} margin
 * @param {Array} data
 */

const BidirectionalBar = ({
  width,
  height,
  margin = {},
  keys = [],
  data = []
}) => {
  const colorScale = d3.scaleOrdinal(d3.schemeCategory10);
  let x_offset = 0;

  const svgRef = useRef();
  const legendRef = useRef();
  const lineGroupRef = useRef();
  const graphGroupRef = useRef();
  const xAxisGroupRef = useRef();
  const yAxisGroupRef = useRef();

  // <==========================(width x height) according to margiin convention==============================>

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // <==========================Axis Definations==============================>
  // Focus Graph
  const xAxis = d3.scaleTime().range([0, innerWidth]);
  const yAxis = d3.scaleLinear().rangeRound([innerHeight, 0]);

  // <==========================Line Generator==============================>
  const lineGen = field =>
    d3
      .line()
      .x(d => xAxis(moment(d.date)._d))
      .y(d => yAxis(d[field]))
      .curve(d3.curveLinear);

  // <==========================Transition constants==============================>
  const trans = d3.transition().duration(500);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const lineGroup = d3.select(lineGroupRef.current);
    const xAxisGroup = d3.select(xAxisGroupRef.current);
    const yAxisGroup = d3.select(yAxisGroupRef.current);
    const legend = d3.select(legendRef.current);

    svg
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMinYMin");

    // <=======================Axis Domains===================>
    const values = uniq(
      flatten(
        data.map(d => {
          const tempArr = [];
          keys.map(x => tempArr.push(d[x]));
          return tempArr;
        })
      )
    );
    // 1) Focus Graph
    xAxis.domain(d3.extent(data, d => moment(d.date)._d));
    yAxis.domain([d3.min(values), d3.max(values)]);

    // <=======================Axis Calls===================>
    // Focus Graph
    xAxisGroup.transition(trans).call(d3.axisBottom(xAxis));
    yAxisGroup.transition(trans).call(
      d3
        .axisLeft(yAxis)
        .tickSize(-Math.abs(width - 70), 0, 0)
        .tickFormat(d => _numberToHumanReadableFormatConverter(d, false))
    );

    // <=======================Line Generation===================>

    const lines = lineGroup.selectAll(`.line`).data(keys);
    lines.exit().remove();
    lines
      .enter()
      .append("path")
      .attr("class", (d, i) => `line line_${i}`)
      .attr("d", d => lineGen(d)(data))
      .attr("fill", "none")
      .attr("stroke", (d, i) => colorScale(i))
      .attr("stroke-width", 1.5)
      .attr("transform", `translate(50, ${margin.top})`);

    yAxisGroup.selectAll(".tick").each(function(d) {
      if (d === 0) d3.select(this.childNodes[0]).style("stroke-opacity", 0.3);
    });

    const legendItemGroup = legend.selectAll(".legendItem").data(keys);

    legendItemGroup.exit().remove();

    const legendItem = legendItemGroup
      .enter()
      .append("g")
      .attr("class", "legendItem");

    legendItem
      .append("circle")
      .attr("r", 4)
      .attr("fill", (d, i) => colorScale(i));

    legendItem
      .append("text")
      .attr("class", "legendText")
      .text(d => d)
      .attr("dx", d => {
        return 10;
      })
      .attr("dy", d => {
        return 4;
      })
      .attr("font-size", 12)
      .attr("fill", (d, i) => colorScale(i));

    legendItem.attr(
      "transform",

      function(d, i) {
        let x_pos =
          d3
            .select(this)
            .select("text")
            .node()
            .getComputedTextLength() + 25;
        x_offset = x_offset + x_pos;
        return `translate(${x_offset - x_pos + margin.left} , 20)`;
      }
    );
  }, [data]);

  return (
    <svg ref={svgRef}>
      <defs>
        <clipPath id="clip">
          <rect
            width={innerWidth}
            height={innerHeight + 50}
            x={0}
            y={0}
            transform="translate(50,0)"
          />
        </clipPath>
      </defs>
      <g
        clipPath="url(#clip)"
        ref={lineGroupRef}
        transform={`translate(50,0)`}
      />

      <g ref={legendRef}></g>
      {/* Focus Graph */}
      <g
        ref={graphGroupRef}
        width={innerWidth}
        height={innerHeight}
        transform={`translate(${margin.left}, ${margin.top})`}
      >
        <g
          ref={xAxisGroupRef}
          className="sentiment-x-axis"
          transform={`translate(50, ${innerHeight})`}
        />
        <g ref={yAxisGroupRef} className="sentiment-y-axis" />
      </g>
    </svg>
  );
};

BidirectionalBar.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  margin: PropTypes.object,
  data: PropTypes.array,
  keys: PropTypes.array
};

export default BidirectionalBar;
