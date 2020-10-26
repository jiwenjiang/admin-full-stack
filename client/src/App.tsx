import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import 'moment/locale/zh-cn'
import RenderRouter from './routes'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <RenderRouter />
    </BrowserRouter>
  )
}

export default App
