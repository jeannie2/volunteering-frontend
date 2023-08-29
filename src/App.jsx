import { BrowserRouter, Routes, Route } from "react-router-dom"
import R3fPage from '../src/pages/R3fPage'

export default function App() {
  return (
  <>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<R3fPage />} />
    </Routes>
  </BrowserRouter>
  </>
  )
}
