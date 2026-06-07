import { useEffect, useState } from 'react'
import { isRouteId } from '../data/navigation'
import type { RouteId } from '../types/navigation'

function getRouteFromHash(): RouteId {
  const hash = window.location.hash.replace(/^#\/?/, '')
  return isRouteId(hash) ? hash : 'overview'
}

export function useHashNavigation() {
  const [currentRoute, setCurrentRoute] = useState<RouteId>(getRouteFromHash)

  useEffect(() => {
    const handleHashChange = () => setCurrentRoute(getRouteFromHash())

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const navigate = (route: RouteId) => {
    const nextHash = `#/${route}`

    if (window.location.hash === nextHash) {
      setCurrentRoute(route)
      return
    }

    window.location.hash = nextHash
  }

  return { currentRoute, navigate }
}
