import React from 'react';
import personService from './services/persons';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [],
            newName: '',
            newNumber: '',
            filter: '',
            info: {
                text: null,
                type: null
            }
        }
    }

    componentDidMount() {
        personService.getAll().then(persons => {
            this.setState({
                persons
            });
        })
    }

    render() {
        const resetInfo = () => {
            setTimeout(() => {
                this.setState({
                    info: {
                        text: null,
                        type: null
                    }
                })
            }, 5000);
        }

        const handleNameChange = (e) => {
            const newName = e.target.value
            this.setState({
                newName
            })
        }

        const handleNumberChange = (e) => {
            const newNumber = e.target.value
            this.setState({
                newNumber
            })
        }

        const handleSubmit = (e) => {
            e.preventDefault()

            const newPerson = {
                name: this.state.newName,
                number: this.state.newNumber,
            }

            const oldEntry = this.state.persons.find(x => x.name === newPerson.name)

            if (!oldEntry) {
                personService.create(newPerson)
                    .then(created => {
                        const persons = this.state.persons.concat(created)
                        const info = {
                            text: `lisättiin ${created.name}`,
                            type: 'success'
                        }
                        this.setState({
                            persons,
                            info
                        })
                    })
                    .catch(error => console.log(error))
            } else if (newPerson.number !== oldEntry.number) {
                const confirmMessage = `${newPerson.name} on jo luettelossa, korvataanko vanha numero uudella?`
                if (window.confirm(confirmMessage)) {
                    personService.update(oldEntry.id, newPerson)
                        .then(updated => {
                            const persons = this.state.persons.map(p => p.id !== oldEntry.id ? p : updated)
                            const info = {
                                text: `päivitettiin ${updated.name}`,
                                type: 'info'
                            }
                            this.setState({
                                persons,
                                info
                            })
                        })
                        .catch(error => console.log('error:', error))
                }
            }
            resetInfo()
        }

        const handleFilterChange = (e) => {
            const filter = e.target.value
            this.setState({
                filter
            })
        }

        const handleRemove = (id) => () => {
            const person = this.state.persons.find(p => p.id === id)
            const confirmMessage = `poistetaanko ${person.name}`
            if (window.confirm(confirmMessage)) {
                return personService.remove(id)
                    .then(() => {
                        const persons = this.state.persons.filter(p => p.id !== id)
                        const info = {
                            text: `poistettiin ${person.name}`,
                            type: 'warning'
                        }
                        this.setState({
                            persons,
                            info
                        })
                        resetInfo()
                    })
                    .catch(error => console.log(error))
            }
        }

        return (
            <Puhelinluettelo persons={this.state.persons} filter={this.state.filter} info={this.state.info} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} handleSubmit={handleSubmit} handleFilterChange={handleFilterChange} handleRemove={handleRemove}/>
        )
    }
}

const InfoMessage = ({
    info
}) => {
    if (!info.text || !info.type) {
        return null
    }

    return (
        <div className={info.type}>
            {info.text}
        </div>
    )
}

const Puhelinluettelo = (props) => (
    <div>
        <h2>Puhelinluettelo</h2>
        <InfoMessage info={props.info}/>
        rajaa näytettäviä
        <input onChange={props.handleFilterChange}/>
        <h3> Lisää uusi </h3>
        <PuhelinluetteloForm handleNameChange={props.handleNameChange} handleNumberChange={props.handleNumberChange} handleSubmit={props.handleSubmit}/>
        <Numerot persons={props.persons} filter={props.filter} handleRemove={props.handleRemove}/>
    </div>
)

const PuhelinluetteloForm = ({
    handleNameChange,
    handleNumberChange,
    handleSubmit,
    person
}) => (
    <form onSubmit={handleSubmit}>
        <div>
            nimi: <input onChange={handleNameChange}/>
        </div>
        <div>
            numero: <input onChange={handleNumberChange}/>
        </div>
        <div>
            <button type="submit"> lisää </button>
        </div>
    </form>
)

const Numerot = ({
    persons,
    filter,
    handleRemove
}) => {
    const filtered = persons.filter(p => p.name.toLowerCase().startsWith(filter.toLowerCase()))
    return (
        <div>
            <h2> Numerot </h2>
            <table>
                <tbody> {filtered.map(p => <Person person={p} key={p.name} handleRemove={handleRemove(p.id)}/>)} </tbody>
            </table>
        </div>
    )
}

const Person = ({
    person,
    handleRemove
}) => (
    <tr>
        <td>{person.name} </td>
        <td>{person.number}</td>
        <td>
            <button onClick={handleRemove}> poista </button>
        </td>
    </tr>
)

export default App
