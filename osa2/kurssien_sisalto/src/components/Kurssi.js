import React from 'react'

const Kurssi = ({kurssi, osat}) => (
    <div>
      <Otsikko kurssi={kurssi['nimi']} />
      <Sisalto osat={kurssi['osat']} />
      <Yhteensa osat={kurssi['osat']} />
    </div>
)

const Otsikko = ({kurssi}) => {
    return <h1>{kurssi}</h1>
}

const Sisalto = ({osat}) => {
    return (
        <div>
          {osat.map(x => <Osa nimi={x.nimi} tehtavia={x.tehtavia} key={x.id}/>)}
        </div>
      )
}

const Osa = ({nimi, tehtavia}) => {
    return <p>{nimi} {tehtavia}</p>
}

const Yhteensa = ({osat}) => {
    return <p>yhteensä {osat.reduce((acc, x) => acc + x.tehtavia, 0)} tehtävää</p>
}

export default Kurssi