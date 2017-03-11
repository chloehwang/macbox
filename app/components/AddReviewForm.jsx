import React from 'react'
import { Button } from 'react-bootstrap'
import { TextInput, Rating } from 'belle'

export default class Box extends React.Component {
  componentWillEnter (callback) {
    const el = this.container;
    TweenMax.from(el, 0.65, {height: 0, ease:Back.easeOut, onComplete: callback});
  }

  componentWillLeave (callback) {
    const el = this.container;
    TweenMax.to(el, 0.65, {height: 0, ease:Back.easeIn, onComplete: callback});
  }

  render () {
    const checkoutStyle = {
      width: '50%',
      border: '1px solid rgb(204, 204, 204)',
      padding: '16px',
      marginTop: '7px',
      fontSize: '1em'
    }

    return (

      <div id="addReviewForm" ref={c => this.container = c} style={{marginTop: '20px'}}>
        <Rating
          defaultValue={3}
          characterStyle={{color: '#D4838F'}}
          hoverCharacterStyle={{color: '#D4838F'}}
          activeCharacterStyle={{color: '#D4838F'}}
        ></Rating>
        <TextInput placeholder="REVIEW SUMMARY" style={checkoutStyle}/>
        <Button className="emphasis-btn review-btn">SUBMIT REVIEW</Button>
      </div>


    );
  }
}

