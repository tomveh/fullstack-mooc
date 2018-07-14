import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Martti Tienari', number: '040-123456' },
        { name: 'Arto Järvinen', number: '040-123456' },
        { name: 'Lea Kutvonen', number: '040-123456' }
      ],
      newName: '',
      newNumber: '',
      filter: ''
    }
  }

  render() {
    const handleNameChange = (e) => {
      const newName = e.target.value
      this.setState({newName})
    }

    const handleNumberChange = (e) => {
      const newNumber = e.target.value
      this.setState({newNumber})
    }

    const handleSubmit = (e) => {
      e.preventDefault()
      const newPerson = {name : this.state.newName, number: this.state.newNumber}

      if (!this.state.persons.find(x => x.name === newPerson.name)) {
        const persons = this.state.persons.concat(newPerson)
        this.setState({persons: persons})
      }
    }

    const handleFilterChange = (e) => {
      const filter = e.target.value
      this.setState({filter})
    }

    return (
      <Puhelinluettelo 
        persons={this.state.persons}
        filter={this.state.filter}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleSubmit={handleSubmit}
        handleFilterChange={handleFilterChange}/>
    )
  }
}

const Puhelinluettelo = (props) => (
  <div>
    <h2>Puhelinluettelo</h2>
    rajaa näytettäviä <input onChange={props.handleFilterChange}/>
    <h3>Lisää uusi</h3>
    <PuhelinluetteloForm 
      handleNameChange={props.handleNameChange}
      handleNumberChange={props.handleNumberChange}
      handleSubmit={props.handleSubmit}/>
    <Numerot persons={props.persons} filter={props.filter}/>
  </div>
)

const PuhelinluetteloForm = ({handleNameChange, handleNumberChange, handleSubmit, person}) => (
  <form onSubmit={handleSubmit}>
  <div>
    nimi: <input onChange={handleNameChange}/>
  </div>
  <div>
    numero: <input onChange={handleNumberChange}/>
  </div>
  <div>
    <button type="submit">lisää</button>
  </div>
</form>
)

const Numerot = ({persons, filter}) => {
  const filtered = persons
    .filter(p => p.name.toLowerCase().startsWith(filter.toLowerCase()))
  return (
  <div>
  <h2>Numerot</h2>
  <table>
    <tbody>
    {filtered.map(p => <Person person={p} key={p.name}/>)}
  </tbody>
  </table>
  </div>
  )
}

const Person = ({person}) => (
  <tr><td>{person.name}</td><td>{person.number}</td></tr>
)

export default App