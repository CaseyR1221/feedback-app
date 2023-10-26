import { createContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid'

const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([])
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  })

  useEffect(() => {
    fetchFeedback()
  }, [])

  // fetch feedback
  const fetchFeedback = async () => {
    const response = await fetch('http://localhost:5000/feedback?_sort=id&_order=desc')

    const data = await response.json()

    setFeedback(data)
  }

  // deletes a feedback item from the list
  const deleteFeedback = (id) => {
    if (window.confirm('Are you sure you would like to delete?')) {
      setFeedback(feedback.filter((item) => item.id !== id));
    }
  }

  // adds a feedback item to the list
  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4()
    setFeedback([newFeedback, ...feedback])
  }
  
  // sets item to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({
      item: item,
      edit: true,
    })
  }

  const updateFeedback = (id, updatedItem) => {
    setFeedback(feedback.map((item) => item.id === id ? {...item, ...updatedItem} : item ))
  }

  return (
    <FeedbackContext.Provider 
      value={
        {
          feedback: feedback,
          feedbackEdit: feedbackEdit,
          deleteFeedback: deleteFeedback,
          addFeedback: addFeedback,
          editFeedback: editFeedback,
          updateFeedback: updateFeedback,
        }
      }
    >{
      children}
    </FeedbackContext.Provider>)
}

export default FeedbackContext