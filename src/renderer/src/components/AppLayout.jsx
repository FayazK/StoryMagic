import Sidebar from './common/Sidebar'

const AppLayout = ({ children }) => {

  return (
    <div className="min-h-screen flex overflow-hidden">
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto content-bg">
        <div className="container mx-auto px-6 py-8">
          {children}
        </div>
      </main>
    </div>
  )
}

export default AppLayout