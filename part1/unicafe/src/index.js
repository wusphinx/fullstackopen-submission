import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Display = ({ name, value }) => <div>{name} {value}</div>

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const getAverage = () => {
    let total = bad + good + neutral
    return total === 0 ? 0 : (good - bad) / total
  }

  const getPositive = () => {
    let total = bad + good + neutral
    let pos = (total === 0 ? 0 : good / total) * 100
    return pos.toString() + " %"
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <h1>statistics</h1>
      <Display name="good" value={good} />
      <Display name="neutral" value={neutral} />
      <Display name="bad" value={bad} />
      <Display name="average" value={getAverage()} />
      <Display name="positive" value={getPositive()} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)