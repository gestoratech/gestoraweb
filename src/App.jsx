import { Router } from "./routes/index.routes"
import { AuthProvider } from "./contexts/AuthContext"

export function App() {
  return (
    <>
      <AuthProvider>
        <Router/>
      </AuthProvider>
    </>
  )
}
