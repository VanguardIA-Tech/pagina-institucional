import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'

const Home = lazy(() => import('./pages/Home'))
const IciaGov = lazy(() => import('./pages/IciaGov'))

function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-va-black">
      <div className="w-8 h-8 border-2 border-va-blue-electric border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/icia-gov" element={<IciaGov />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
