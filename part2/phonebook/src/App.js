import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ newFilterName, handleFilterNameChange }) => {
  return (
    <div>
      filter shown with<input value={newFilterName} onChange={handleFilterNameChange} />
    </div>
  )
}

const PersonForm = ({ addPerson, newName, newNumber, handleNameChange, handleNumberChange }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({ persons, newFilterName }) => {
  return persons.filter(x => x.name.includes(newFilterName.toUpperCase()) || x.name.includes(newFilterName.toLowerCase())).map((person) =>
    <div key={person.name}>{person.name} {person.number}</div>
  )

}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilterName, setNewFilterName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    console.log(persons)
    if (persons.every(currentValue => currentValue.name !== newName)) {
      setPersons(persons.concat({
        name: newName,
        number: newNumber
      }))
      return
    }

    alert(`${newName} is already added to phonebook`)
    return
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterNameChange = (event) => {
    setNewFilterName(event.target.value)
  }


  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilterName={newFilterName} handleFilterNameChange={handleFilterNameChange} />
      <h3>add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber}
        handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons persons={persons} newFilterName={newFilterName} />
    </div>
  )
}

export default App