import { createContext, useState } from "react";
import { v4 as uuidv4 } from 'uuid'

const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([
    {
      id: 1,
      text: 'This is feedback item 1',
      rating: 10,
    },
    {
      id: 1,
      text: 'This is feedback item 2',
      rating: 8,
    },
    {
      id: 1,
      text: 'This is feedback item 3',
      rating: 9,
    },
  ])

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  })

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

  return (
    <FeedbackContext.Provider 
      value={{
        feedback: feedback,
        deleteFeedback: deleteFeedback,
        addFeedback: addFeedback,
        editFeedback: editFeedback,
      }}
    >{
      children}
    </FeedbackContext.Provider>)
}

export default FeedbackContext