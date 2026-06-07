import { useEffect, useState } from 'react'
import { AnalyticsPage } from './components/pages/AnalyticsPage'
import { CustomersPage } from './components/pages/CustomersPage'
import { LoginPage } from './components/pages/LoginPage'
import { LoadingOverlay } from './components/pages/LoadingOverlay'
import { LoadingPage } from './components/pages/LoadingPage'
import { OrdersPage } from './components/pages/OrdersPage'
import { OverviewPage } from './components/pages/OverviewPage'
import { ProductsPage } from './components/pages/ProductsPage'
import { useAuth } from './hooks/useAuth'
import { useHashNavigation } from './hooks/useHashNavigation'
import { AppLayout } from './layouts/AppLayout'

export default function App() {
  const { currentRoute, navigate } = useHashNavigation()
  const { isAuthenticated, login } = useAuth()
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const [isOverlayLoading, setIsOverlayLoading] = useState(false)

  useEffect(() => {
    const loadingTimer = window.setTimeout(
      () => setIsInitialLoading(false),
      600,
    )
    return () => window.clearTimeout(loadingTimer)
  }, [])

  useEffect(() => {
    if (!isAuthenticated && currentRoute !== 'login') {
      navigate('login')
    }

    if (isAuthenticated && currentRoute === 'login') {
      navigate('overview')
    }
  }, [currentRoute, isAuthenticated, navigate])

  if (isInitialLoading) {
    return <LoadingPage />
  }

  if (!isAuthenticated || currentRoute === 'login') {
    return (
      <>
        <LoginPage
          onLogin={() => {
            login()
            navigate('overview')
          }}
          onLoadingChange={setIsOverlayLoading}
        />
        {isOverlayLoading && <LoadingOverlay />}
      </>
    )
  }

  return (
    <>
      <AppLayout currentPage={currentRoute} onNavigate={navigate}>
        {currentRoute === 'overview' && <OverviewPage />}
        {currentRoute === 'analytics' && <AnalyticsPage />}
        {currentRoute === 'orders' && <OrdersPage />}
        {currentRoute === 'products' && <ProductsPage />}
        {currentRoute === 'customers' && <CustomersPage />}
      </AppLayout>
      {isOverlayLoading && <LoadingOverlay />}
    </>
  )
}
