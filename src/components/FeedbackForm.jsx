import Card from "./shared/Card"
import { useContext, useState, useEffect } from "react"
import FeedbackContext from "../context/FeedbackContext"
import Button from "./shared/Button"
import RatingSelect from "./RatingSelect"

const FeedbackForm = () => {
  const [text, setText] = useState('')
  const [rating, setRating] = useState('')
  const [btnDisabled, setbtnDisabled] = useState(true)
  const [message, setMessage] = useState('')

  const { addFeedback, feedbackEdit, updateFeedback } = useContext(FeedbackContext)

  useEffect(() => {
    if (feedbackEdit.edit === true) {
      setbtnDisabled(false)
      setText(feedbackEdit.item.text)
      setRating(feedbackEdit.item.rating)
    }
  }, [feedbackEdit])

  const handleTextChange = (e) => {
    if (text === '') {
      setbtnDisabled(true)
      setMessage(null)
    } else if (text !== '' && text.trim().length <= 10) {
      setMessage('Text must be at least 10 characters')
      setbtnDisabled(true)
    } else {
      setMessage(null)
      setbtnDisabled(false)
    }

    setText(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (text.trim().length > 10) {
      const newFeedback = {
        text: text,
        rating: rating,
      }

      if (feedbackEdit.edit === true) {
        updateFeedback(feedbackEdit.item.id, newFeedback)
      } else {
        addFeedback(newFeedback)
      }

      setText('')
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate your service with us?</h2>
        <RatingSelect select={(rating) => setRating(rating)} />
        <div className="input-group">
          <input 
            type="text" 
            placeholder="Write a review" 
            onChange={handleTextChange} 
            value={text} 
          />
          <Button type="submit" isDisabled={btnDisabled}><span>SEND</span></Button>
        </div>

        {message && <div className="message">{message}</div>}
      </form>
    </Card>
  )
}

export default FeedbackForm