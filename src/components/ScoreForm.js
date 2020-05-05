import React, { useState } from 'react'
import { Button,Input } from '@material-ui/core'
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';

const backendURL = 'http://localhost:4000'
const styles = {
    buttonRoot: {
      background: '#a675cb',
      borderRadius: 1,
      color: '#faf0e6',
      height: 40,
      width: 80,
      margin: 10,
      '&:hover': {
          background: 'hsl(190,80%,50%)',
        }
    },
    inputRoot: {
        '&:after': {
            borderBottom: '2px solid hsl(190,80%,50%)'
        }
    }
  };

function ScoreForm({ seconds,difficulty,classes,children,className }){

    const [displayName, setDisplayName] = useState('')
    const handleChange = (event) => {
        setDisplayName(event.target.value)
    }

    const postScore = (data) => {
        fetch(`${backendURL}/scores`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        const formData = {display_name: displayName, time: seconds, difficulty: difficulty}

        postScore(formData)
    }

    return (
        <div className='submit-score'>
            <h3>SUBMIT YOUR SCORE</h3>
            <form onSubmit={handleSubmit}>
            <label htmlFor='display-name'>DISPLAY NAME</label>
            <Input id='display-name' className={clsx(classes.inputRoot, className)} onChange={handleChange} value={displayName} />
            <label>TIME</label>
            <p>{seconds}s</p>
            <label>DIFFICULTY</label>
            <p>{difficulty}</p>
            <Button type='submit' className={clsx(classes.buttonRoot, className)}>Submit</Button>
            </form>
    </div>
    )
}

ScoreForm.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
  };
  
  export default withStyles(styles)(ScoreForm);