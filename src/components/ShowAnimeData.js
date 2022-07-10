import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
const ShowAnimeData = (props) => {
  const { data, filteredData, showDataBasedOnGeneres } = props;
  const [animeFilter, setAnimeFilter] = useState(data);

  const storeUniqueGeneres = [];
  console.log("Showdet", data);

  const handleChange = (e) => {
    const res = filteredData(e.target.value);
    setAnimeFilter(res);
  };
  const uniqueGeneres = data.map((ele, i) => {
    return ele.genres.map((gen) => {
      if (!storeUniqueGeneres.includes(gen.name)) {
        storeUniqueGeneres.push(gen.name);
      }
    });
  });
  const uniqueVal = storeUniqueGeneres.filter((unique, index) => {
    return storeUniqueGeneres.indexOf(unique) === index;
  });
  console.log(uniqueVal);
  const handleSelectChange = (e) => {
    const res = showDataBasedOnGeneres(e.target.value, uniqueVal);
    console.log("getting", res);
    setAnimeFilter(res);
  };

  return (
    <div className="container" style={{backgroundColor:"pink"}}>
      <div className="input-group row my-4 w-50">
        <div className="col-md-6 form-outline">
          <input
            type="search"
            id="form1"
            className="form-control"
            onChange={handleChange}
            style={{border:"1px solid black"}}
          ></input>
          <label className="form-label" htmlFor="form1">
            Search
          </label>
        </div>
        <div
          className="col-md-6 w3-right"
          style={{ justifyContent: "flex-end" }}
        >
          <select
            className="form-select "
            aria-label="Default select example"
            onChange={handleSelectChange}
            style={{border:"1px solid black"}}
          >
            <option>Open this select menu</option>
            {uniqueVal.map((ele, i) => {
              return (
                <option key={i} value={ele}>
                  {ele}
                </option>
              );
            })}
          </select>
        </div>
      </div>

     
        <div className="row">
        <DragDropContext>
          <div className="col-md-6">
            <table className="table table-striped" style={{border:"2px solid yellow"}}>
              <thead className="thead-dark">
                <tr>
                  <td>Title</td>
                  <td>Images</td>
                  <td>Rating</td>
                </tr>
              </thead>
              <tbody>
                {animeFilter.map((ele, i) => {
                  return (
                    <tr key={i}>
                      <td>{ele.title}</td>
                      <td>
                        <img src={ele.images.jpg.image_url}></img>
                      </td>
                      <td>{ele.score}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="col-md-6" style={{ border: "2px solid black" }}>
                    <h1 style={{ textAlign: "center" }}>Watch List</h1>
            </div>
          </DragDropContext>
        </div>
      
    </div>
  );
};

export default ShowAnimeData;
