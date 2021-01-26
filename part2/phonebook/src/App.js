import React, { useState, useEffect } from 'react'
import personService from './services/persons'

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

const Persons = (props) => {
  const handleDelete = (event) => {
    const personID = event.target.getAttribute("id")
    console.log('personID is', personID)
    const name = event.target.getAttribute("name")
    if (window.confirm("Delete " + name + " ?")) {
      personService.deleteByID(personID)
        .then(response => {
          console.log("delete succeed")
          props.setPersons(props.persons.filter(x => x.name !== name).concat())
          return
        }
        )
    }
  }

  return props.persons.filter(x => x.name.includes(props.newFilterName.toUpperCase()) || x.name.includes(props.newFilterName.toLowerCase())).map((person) =>
    <div key={person.name}>{person.name} {person.number}<button id={person.id} name={person.name} onClick={handleDelete}>delete</button></div >
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
    const newPerson = {
      name: newName,
      number: newNumber
    }
    if (persons.every(currentValue => currentValue.name !== newName)) {
      personService.create(newPerson)
        .then(response => {
          console.log("create succeed")
          return
        }
        )
    } else {
      const old = persons.filter(x => x.name === newName)
      personService.update(old[0].id, newPerson)
        .then(response => {
          console.log("create succeed")
          return
        }
        )
    }

    personService.getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
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
    personService.getAll()
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
      <Persons setPersons={setPersons} persons={persons} newFilterName={newFilterName} />
    </div>
  )
}

export default App