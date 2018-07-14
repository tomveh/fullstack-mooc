import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
    const kurssi = {
        nimi: 'Half Stack -sovelluskehitys',
        osat: [
          {
            nimi: 'Reactin perusteet',
            tehtavia: 10
          },
          {
            nimi: 'Tiedonvälitys propseilla',
            tehtavia: 7
          },
          {
            nimi: 'Komponenttien tila',
            tehtavia: 14
          }
        ]
      }

  return (
    <div>
      <Otsikko kurssi={kurssi['nimi']} />
      <Sisalto osat={kurssi['osat']} />
      <Yhteensa osat={kurssi['osat']} />
    </div>
  )
}

const Otsikko = ({kurssi}) => {
    return <h1>{kurssi}</h1>
}

const Sisalto = ({osat}) => {
    return (
        <div>
            <Osa nimi={osat[0].nimi} tehtavia={osat[0].tehtavia}/>
            <Osa nimi={osat[1].nimi} tehtavia={osat[1].tehtavia}/>
            <Osa nimi={osat[2].nimi} tehtavia={osat[2].tehtavia}/>
        </div>
      )
}

const Osa = ({nimi, tehtavia}) => {
    return <p>{nimi} {tehtavia}</p>
}

const Yhteensa = ({osat}) => {
    return <p>yhteensä {osat.map(x => x['tehtavia']).reduce((a, b) => a + b)}</p>
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)