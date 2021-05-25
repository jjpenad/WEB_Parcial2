import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";

function TVSeries(props) {
  const [series, setSeries] = useState([]);
  const seriesSpanish =
    "https://gist.githubusercontent.com/josejbocanegra/c55d86de9e0dae79e3308d95e78f997f/raw/a467415350e87c13faf9c8e843ea2fd20df056f3/series-es.json";
  const seriesEnglish =
    "https://gist.githubusercontent.com/josejbocanegra/5dc69cb7feb7945ef58b9c3d84be2635/raw/e2d16f7440d51cae06a9daf37b0b66818dd1fe31/series-en.json";

  useEffect(() => {
    axios.get(seriesSpanish).then((res) => {
      setSeries(res.data);
    });
  }, []);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Channel</th>
          <th>Seasons</th>
          <th>Episodes</th>
          <th>Release Date</th>
        </tr>
      </thead>
      <tbody>
        {series.map((serie, key) => {
          return (
            <tr key={key}>
              <td>{serie.id}</td>
              <td>{serie.name}</td>
              <td>{serie.channel}</td>
              <td>{serie.seasons}</td>
              <td>{serie.episodes}</td>
              <td>{serie.release}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default TVSeries;
