import React, { useState, useEffect, useRef } from "react";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import * as d3 from "d3";
import { FormattedDate, FormattedNumber, FormattedMessage } from "react-intl";

function TVSeries(props) {
  const [series, setSeries] = useState([]);
  const [selected, setSelected] = useState();
  const canvas = useRef();

  const seriesSpanish =
    "https://gist.githubusercontent.com/josejbocanegra/c55d86de9e0dae79e3308d95e78f997f/raw/a467415350e87c13faf9c8e843ea2fd20df056f3/series-es.json";

  const seriesEnglish =
    "https://gist.githubusercontent.com/josejbocanegra/5dc69cb7feb7945ef58b9c3d84be2635/raw/e2d16f7440d51cae06a9daf37b0b66818dd1fe31/series-en.json";

  const selectItem = (index) => {
    setSelected(series[index]);
  };

  const language = window.navigator.language || navigator.browserLanguage;
  const lang = language.substring(0, 2);

  useEffect(() => {
    let urlUse = lang === "es" ? seriesSpanish : seriesEnglish;
    axios.get(urlUse).then((res) => {
      setSeries(res.data);
    });
  }, [lang]);

  useEffect(() => {
    const drawChart = () => {
      const width = 500;
      const height = 350;
      const margin = { top: 40, left: 30, bottom: 40, right: 40 };
      const iwidth = width - margin.left - margin.right;
      const iheight = height - margin.top - margin.bottom;

      const svg = d3
        .select(canvas.current)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .style("border-color", "black")
        .style("border-style", "solid")
        .style("border-width", "1px");

      let g = svg
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      let yMin = Math.min.apply(
        Math,
        series.map(function (o) {
          return o.seasons;
        })
      );
      let yMax = Math.max.apply(
        Math,
        series.map(function (o) {
          return o.seasons;
        })
      );
      let xMin = Math.min.apply(
        Math,
        series.map(function (o) {
          return o.episodes;
        })
      );
      let xMax = Math.max.apply(
        Math,
        series.map(function (o) {
          return o.episodes;
        })
      );

      const y = d3
        .scaleLinear()
        .domain([yMin - 2, yMax])
        .range([iheight, 0]);

      g.append("g").call(d3.axisLeft(y));

      const x = d3
        .scaleLinear()
        .domain([xMin - 5, xMax])
        .range([0, iwidth]);

      g.append("g")
        .attr("transform", "translate(0," + iheight + ")")
        .call(d3.axisBottom(x));

      let circles = g.append("g").selectAll("dot").data(series).enter();
      // Add dots
      circles
        .append("circle")
        .attr("cx", function (d) {
          return x(parseInt(d.episodes));
        })
        .attr("cy", function (d) {
          return y(parseInt(d.seasons));
        })
        .attr("r", 10)
        .style("fill", "#69b3a2")
        .style("opacity", "0.7")
        .attr("stroke", "black");

      circles
        .append("text")
        .attr("class", "label")
        .attr("y", function (d) {
          return y(d.seasons);
        })
        .attr("x", function (d) {
          return x(d.episodes);
        })
        .text(function (d) {
          return d.name;
        });
    };

    if (series.length > 0) {
      drawChart();
    }
  }, [series]);

  return (
    <Container fluid>
      <Row>
        <Col xl={selected ? 9 : 12}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>
                  <FormattedMessage id='Name' />
                </th>
                <th>
                  <FormattedMessage id='Channel' />{" "}
                </th>
                <th>
                  <FormattedMessage id='Seasons' />{" "}
                </th>
                <th>
                  <FormattedMessage id='Episodes' />{" "}
                </th>
                <th>
                  <FormattedMessage id='ReleaseDate' />{" "}
                </th>
              </tr>
            </thead>
            <tbody>
              {series.map((serie, index) => {
                return (
                  <tr
                    key={index}
                    onClick={(event) => {
                      selectItem(index);
                    }}>
                    <td>{serie.id}</td>
                    <td>{serie.name}</td>
                    <td>{serie.channel}</td>
                    <td>
                      <FormattedNumber value={serie.seasons} />
                    </td>
                    <td>
                      <FormattedNumber value={serie.episodes} />
                    </td>
                    <td>
                      <FormattedDate
                        value={
                          serie.release.split("/")[1] +
                          "/" +
                          serie.release.split("/")[0] +
                          "/" +
                          serie.release.split("/")[2]
                        }
                        year='numeric'
                        month='long'
                        day='numeric'
                        weekday='long'
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>
        {selected && (
          <Col className='d-flex justify-content-center'>
            <Card style={{ width: "18rem" }}>
              <Card.Img variant='top' src={selected.poster} alt='poster' />
              <Card.Body>
                <Card.Title>{selected.name}</Card.Title>
                <Card.Text>{selected.description}</Card.Text>
                <a href={selected.webpage} className='stretched-link'>
                  {selected.webpage}
                </a>
              </Card.Body>
            </Card>
          </Col>
        )}
        <Col className='d-flex justify-content-center'>
          <div ref={canvas}></div>
        </Col>
      </Row>
    </Container>
  );
}

export default TVSeries;
