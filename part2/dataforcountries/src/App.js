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
  return (
    <div>
      <h2>{country.name}</h2>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h3>languages</h3>
      <div>
        <Languages languages={country.languages} />
      </div>
      <div>
        <img src={country.flag} alt="flag" width="90" height="120"></img>
      </div>
    </div >
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

  if (countries.length === 1) {
    return <div>
      <Country country={countries[0]} />
    </div>
  }

  return countries.map((country) =>
    <div key={country.name}>{country.name}</div>
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
          setNewCountries(response.data)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilterName={newFilterName} handleFilterNameChange={handleFilterNameChange} />
      <Countries countries={newCountries} />
    </div>
  )
}

export default App