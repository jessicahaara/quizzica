import { createContext, ReactNode, useContext, useState } from "react"
import { globalContextType, Question } from "../types"
import React from "react"

const globalContextDefaultValues: globalContextType = {
  name: "",
  setUserName: () => {},
  id: "",
  setUserId: () => {},
  questions: [],
  setQuizQuestions: () => {},
}

const AppContext = createContext<globalContextType>(globalContextDefaultValues)

export function useAppContext() {
  return useContext(AppContext)
}

interface Props {
  children: ReactNode
}

export const GlobalContext = ({ children }: Props) => {
  const [name, setName] = useState<string>("")
  const [id, setId] = useState<string>("")
  const [questions, setQuestions] = useState<Question[]>([])

  const setUserName = (name: string) => {
    setName(name)
  }

  const setUserId = (id: string) => {
    setId(id)
  }

  const setQuizQuestions = () => {
    setQuestions(questions)
  }

  let value = {
    name,
    setUserName,
    id,
    setUserId,
    questions,
    setQuizQuestions,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
