import React, { useState } from 'react'
import axios from 'axios'

const Filter = ({ newFilterName, handleFilterNameChange }) => {
  return (
    <div>
      find countries <input value={newFilterName} onChange={handleFilterNameChange} />
    </div>
  )
}

const Country = ({ country }) => {
  // TODO 
  // useState也可以用于根组件App之外，之前还一直以为只能用于App组件之中
  const [showAll, setShowAll] = useState(false)

  return (
    <div>
      <h2>{country.name}<button onClick={() => {
        if (showAll === false) { setShowAll(true) } else {
          setShowAll(false)
        }
      }}>show</button></h2>
      {showAll === true ? <Detail country={country} /> : <div></div>}
    </div >
  )
}

const Detail = ({ country }) => {
  return (
    <div>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h3>languages</h3>
      <div>
        <Languages languages={country.languages} />
      </div>
      <div>
        <img src={country.flag} alt="flag" width="90" height="120"></img>
      </div>
    </div>
  )
}

const Languages = ({ languages }) => {
  return languages.map((lang) =>
    <li key={lang.name}>{lang.name}</li>
  )
}

const Countries = ({ countries }) => {
  if (countries.length > 10) {
    return <div>
      too many matches, specify another filter
    </div>
  }

  return countries.map((country) =>
    <Country key={country.name} country={country} />
  )

}

const App = () => {
  const [newCountries, setNewCountries] = useState([])
  const [newFilterName, setNewFilterName] = useState('')

  const handleFilterNameChange = (event) => {
    if (event.target.value.length > 0) {
      // TODO 此时数据并未更新到newFilterName， why?
      setNewFilterName(event.target.value)
      axios
        .get(`https://restcountries.eu/rest/v2/name/` + event.target.value)
        .then(response => {
          console.log('promise fulfilled')

          response.data.forEach(element => {
            element.isShow = false
          });
          setNewCountries(response.data)
        })
    }
  }

  return (
    <div>
      <Filter newFilterName={newFilterName} handleFilterNameChange={handleFilterNameChange} />
      <Countries countries={newCountries} />
    </div>
  )
}

export default App