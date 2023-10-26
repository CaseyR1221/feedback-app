import { createContext, useState, useEffect } from "react";

const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
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
    const response = await fetch('/feedback?_sort=id&_order=desc')

    const data = await response.json()

    setFeedback(data)
    setIsLoading(false)
  }

  // deletes a feedback item from the list
  const deleteFeedback = async (id) => {
    if (window.confirm('Are you sure you would like to delete?')) {
      await fetch(`/feedback/${id}`, {method: 'DELETE'})

      setFeedback(feedback.filter((item) => item.id !== id));
    }
  }

  // adds a feedback item to the list
  const addFeedback = async (newFeedback) => {
    const response = await fetch('/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newFeedback),
    })

    const data = await response.json()

    setFeedback([data, ...feedback])
  }
  
  // sets item to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({
      item: item,
      edit: true,
    })
  }

  // Updates an item
  const updateFeedback = async (id, updatedItem) => {
    const response = await fetch(`/feedback/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedItem),
    })

    const data = await response.json()

    setFeedback(feedback.map((item) => item.id === id ? {...item, ...data} : item ))
  }

  return (
    <FeedbackContext.Provider 
      value={
        {
          feedback: feedback,
          feedbackEdit: feedbackEdit,
          isLoading: isLoading,
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