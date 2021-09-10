import React, {useState, useEffect} from 'react';
import './App.css';

function App() {
  const[input, setInput] = useState('');
  const [data, setData] = useState([]);
  // const [cuisineType, setCuisineType] =useState()

  useEffect(() => {
    fetchData()
  }, [])
  const AP_id = ''
  const AP_key = ''
  const API_url = `https://api.edamam.com/search?q=${input}&app_id=${AP_id}&app_key=${AP_key}`

  async function fetchData(){
    const res = await fetch(API_url);
    const result = await res.json();
    setData(result.hits)
    // setCuisineType(result.hits.recipe.cuisineType[0])
    // console.log(cuisineType);
    console.log(data)
    console.log(result)
  }

  function handleChange(e){
    setInput(e.target.value)
  }
  return (
    <div className="App">
      <h1>Find your tasty recipe</h1>
      <div className="buttonContainer">
      <div className='button' onClick ={fetchData}>Search Recipe</div>
      <input onChange = {handleChange} />
      </div>
      
      <div className="recipes">
        {data.map(item => {
          return (
            <div className="recipe">
              <h2>{item.recipe.label}</h2>
              <img src ={item.recipe.image} alt='no image on the database' />
              <div className='time'> Time of preparation : {item.recipe.totalTime} minutes</div>
          <div className='calories'>Calories : {Number.parseFloat(item.recipe.calories).toFixed(0)}</div>
          <div className='ingredients'> Ingredients : <ul>{item.recipe.ingredients.map((arr) => <li>{arr.text}.</li>)}</ul></div>
            </div>
          )
        })}
      </div>
     
    </div>
  );
}

export default App;
