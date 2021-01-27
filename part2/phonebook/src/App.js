import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const addStyle = {
  color: 'green',
  fontStyle: 'italic',
  fontSize: 16,
  borderStyle: 'solid',
  borderradius: 5,
  padding: 10,
  marginBottom: 10,
}

const deleteStyle = {
  color: 'red',
  fontStyle: 'italic',
  fontSize: 16,
  borderStyle: 'solid',
  borderradius: 5,
  padding: 10,
  marginBottom: 10,
}

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


const Notification = (props) => {
  if (props.message === null) {
    return null
  }

  return (
    <div className="error" style={props.errorKind === "add" ? addStyle : deleteStyle}>
      {props.message}
    </div>
  )
}

const Persons = (props) => {
  const handleDelete = (event) => {
    props.setErrorKind("delete")
    const personID = event.target.getAttribute("id")
    console.log('personID is', personID)
    const name = event.target.getAttribute("name")
    if (window.confirm("Delete " + name + " ?")) {
      personService.deleteByID(personID)
        .then(response => {
          console.log("delete succeed")
          props.setPersons(props.persons.filter(x => x.name !== name).concat())

          props.setErrorMessage(
            `Information of '${name}' has already been removed from server`
          )
          setTimeout(() => {
            props.setErrorMessage(null)
          }, 5000)

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
  const [errorMessage, setErrorMessage] = useState(null)
  const [errorKind, setErrorKind] = useState(null)

  const addPerson = (event) => {
    event.preventDefault()
    console.log(persons)
    const newPerson = {
      name: newName,
      number: newNumber
    }
    if (persons.every(currentValue => currentValue.name !== newName)) {
      setErrorKind("add")
      personService.create(newPerson)
        .then(response => {
          console.log("create succeed")

          setErrorMessage(
            `Added '${newName}'`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)

          return
        }
        )
    } else {
      const old = persons.filter(x => x.name === newName)

      personService.update(old[0].id, newPerson)
        .then(response => {
          console.log("delete succeed")
          return
        }
        ).catch(err => {
          if (err.response.status === 404) {
            setErrorKind("delete")
            setErrorMessage(
              `Information of '${newName}' has already been removed from server`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          }
        })

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
      <Notification message={errorMessage} errorKind={errorKind} />
      <Filter newFilterName={newFilterName} handleFilterNameChange={handleFilterNameChange} />
      <h3>add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber}
        handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons setErrorKind={setErrorKind} setErrorMessage={setErrorMessage} setPersons={setPersons} persons={persons} newFilterName={newFilterName} />
    </div>
  )
}

export default App