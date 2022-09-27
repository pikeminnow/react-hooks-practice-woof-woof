import React, { useEffect, useState } from "react";

function DogSpan({ dog, onDogClick }) {
  return (<span
    onClick={onDogClick}>
    {dog}</span>);

}


function DisplayDogsInDogBar({ dogState, onDogClick }) {

  if (dogState === undefined) {
    return null;
  }
  else {
    return (
      dogState.map((dog) => {
        return <DogSpan
          key={dog.id}
          dog={dog.name}
          onDogClick={onDogClick} />
      })
    )
  }
}



function App() {
  const [text, setText] = useState("test title");
  const [dogState, setDogState] = useState();
  const [selectedDogState, setSelectedDogState] = useState();

  //
  // with thanks to https://stackoverflow.com/a/59637014
  useEffect(() => {
    (async () => {
      const dogData = await fetch(" http://localhost:3001/pups")
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setDogState(data);
        })
    })();
  }, []);




  function onDogClick(dogClickEvent) {
    console.log(dogClickEvent);
  }




  return (
    <div className="App">
      <div id="filter-div">
        <button id="good-dog-filter">Filter good dogs: OFF</button>
      </div>
      <div id="dog-bar">
        <DisplayDogsInDogBar
          dogState={dogState}
          onDogClick={onDogClick}
        />
      </div>
      <div id="dog-summary-container">
        <h1>DOGGO:</h1>
        <div id="dog-info"></div>
      </div>
    </div>
  );
}

export default App;
