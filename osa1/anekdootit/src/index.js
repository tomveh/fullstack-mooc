import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      votes: props.anecdotes.reduce((acc, _, i) => {
          acc[i] = 0
          return acc
      }, {})
    }
  }

  render() {
    const nextAnecdote = () => this.setState({
        selected : Math.floor(Math.random() * this.props.anecdotes.length)
    })

    const castVote = (idx) => () => {
        this.setState(prevState => {
            let votes = Object.assign({}, prevState.votes)
            votes[idx] += 1
            return {votes: votes}
        })
    }

    const voteArray = Object.keys(this.state.votes).map(x => this.state.votes[x])
    const most_votes_idx = voteArray
        .reduce((acc, x, i) => x > voteArray[acc] ? i : acc, 0)

    return (
      <div>
        {this.props.anecdotes[this.state.selected]}
        <p>has {this.state.votes[this.state.selected]} votes</p>
        <p>
            <button onClick={nextAnecdote}>next anecdote</button>
            <button onClick={castVote(this.state.selected)}>vote</button>
        </p>
        <h2>anecdote with most votes:</h2>
        <p>{this.props.anecdotes[most_votes_idx]}</p>
        <p>has {this.state.votes[most_votes_idx]} votes</p>
      </div>
    )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)