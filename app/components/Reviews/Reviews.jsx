import React from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import TransitionGroup from 'react-addons-transition-group'
import AddReviewForm from './AddReviewForm'

export default function({ reviews, selectedProduct, toggleAnimation, playReviewAdd }) {

  const rows = reviews && reviews.map(review => {
    return (
      <div key={review.id}>
        <Row className="show-grid">
          <Col sm={12} md={2} >
            <h4><strong>{review.user.name}</strong></h4>
          </Col>

          <Col sm={12} md={8} style={{paddingBottom: '10px'}}>
            <div className="rating-stars">
              { `★`.repeat(review.rating) }
              { `☆`.repeat(5-review.rating) }
            </div>
            {review.description}
          </Col>

          <Col sm={12} md={2}>
            {review.date}
          </Col>
        </Row>
        <hr />
      </div>
    )
  })

  return (
   <Grid className="review-main">
     <h3>Reviews</h3>
     <a style={playReviewAdd ? {cursor: "pointer", color: '#41b396'} : {cursor: "pointer"}} onClick={toggleAnimation}>ADD A REVIEW</a>

     <TransitionGroup>
        { playReviewAdd && <AddReviewForm />}
      </TransitionGroup>

     <div className="review-rows">
       <hr />
      { rows }
      </div>
    </Grid>
  )
}