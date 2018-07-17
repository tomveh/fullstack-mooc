import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      filter: ''
    }
  }

  componentDidMount() {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(response => this.setState({countries: response.data}))
  }

  render() {
    const handleFilterChange = (e) => {
      const filter = e.target.value
      this.setState({filter})
    }

    const handleCountryClick = (filter) => () => {
      this.setState({filter})
    }

    const filtered = this.state.countries
      .filter(x => x.name.toLowerCase().startsWith(this.state.filter.toLowerCase()))

    return (
      <div>
        <Filter handleFilterChange={handleFilterChange}/>
        <Countries filtered={filtered} handleCountryClick={handleCountryClick}/>
      </div>
    )
  }
}

const Filter = ({handleFilterChange}) => (
  <div>find countries: <input onChange={handleFilterChange}/></div>
)

const Countries = ({filtered, handleCountryClick}) => {
  if (filtered.length >= 10) {
    return <p>too many matches, specify another filter</p>
  } else if (filtered.length > 1) {
    return <div>{filtered.map(x => <p key={x.name} onClick={handleCountryClick(x.name)}> {x.name} </p>)}</div>
  } else if (filtered.length === 1) {
    return <Country country={filtered[0]}/>
  } else {
    return <p>no matches</p>
  }
}

const Country = ({country}) => {
  return (
  <div>
    <h2>{country.name}</h2>
    <p>capital: {country.capital}</p>
    <p>population: {country.population}</p>
    <img src={country.flag}/>
  </div>
  )
}

export default App