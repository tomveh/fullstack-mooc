import React from 'react';
import ReactDOM from 'react-dom';


const feedback_names = ['hyvä', 'neutraali', 'huono']
const feedback_scores = [1, 0, -1]
    .reduce((obj, x, i) => {
        obj[feedback_names[i]] = x
        return obj
    }, {})

class App extends React.Component {
    constructor(props) {
        super(props)
        let feedback_counts = {}
        feedback_names.forEach(x => feedback_counts[x] = 0)
        this.state = {feedback_counts: feedback_counts}
    }

    render() {
        const handleFeedback = (type) => (event) => {
            this.setState(prevState => {
                const prev_counts = prevState.feedback_counts
                let new_counts = Object.assign({}, prev_counts)
                new_counts[type] += 1
                return {feedback_counts: new_counts}
            })
        }

        return (
            <div>
                <Title text={'anna palautetta'}/>
                <Buttons names={feedback_names} handleFeedback={handleFeedback}/>
                <Title text={'statistiikka'}/>
                <Statistics feedback_counts={this.state.feedback_counts}/>
            </div>
        )
    }
}

const Title = ({text}) => (
    <h2>{text}</h2>
)

const Buttons = ({names, handleFeedback}) => (
    names.map((x, i) => <Button name={x} handleClick={handleFeedback(x)} key={i}/>)
)

const Button = ({name, handleClick}) => (
    <button onClick={handleClick}>{name}</button>
)

const Statistics = ({feedback_counts}) => {
    const n_feedback = feedback_names.map(x => feedback_counts[x]).reduce((a, b) => a + b)

    const positive = ((feedback_counts[feedback_names[0]] / n_feedback) * 100).toPrecision(3) + '%'
    const avg = feedback_names.map(x => feedback_counts[x] * feedback_scores[x]).reduce((a, b) => a + b) / n_feedback

    return n_feedback ? (
        <table>
            <tbody>
            {feedback_names.map((x, i) => <Statistic text={x} value={feedback_counts[x]} key={i}/>)}
            <Statistic text={'keskiarvo'} value={avg.toFixed(2)}/>
            <Statistic text={'positiivisia'} value={positive}/>
            </tbody>
        </table>
    ) : <p>ei yhtään palautetta annettu</p>
}

const Statistic = ({text, value}) => (
    <tr><td>{text}</td><td>{value}</td></tr>
)


ReactDOM.render(<App />, document.getElementById('root'));

