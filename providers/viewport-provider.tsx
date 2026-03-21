"use client"
import { createContext, useContext, useEffect, useState } from "react"

export enum DeviceType {
  Mobile = "mobile",
  Tablet = "tablet",
  Desktop = "desktop",
}

interface ViewportContextValue {
  device: DeviceType
  isMobile: boolean
}

export const ViewportContext = createContext<ViewportContextValue>({
  device: DeviceType.Desktop,
  isMobile: false,
})

export const ViewportProvider: React.FC<
  React.PropsWithChildren<{ device: ViewportContextValue["device"] }>
> = ({ children, device }) => {
  const [viewportDevice, setViewportDevice] =
    useState<ViewportContextValue["device"]>(device)
  const [isMobile, setIsMobile] = useState<ViewportContextValue["isMobile"]>(
    device === DeviceType.Mobile
  )

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width
        if (width < 768) {
          setViewportDevice(DeviceType.Mobile)
          setIsMobile(true)
        } else if (width >= 768 && width < 1024) {
          setViewportDevice(DeviceType.Tablet)
          setIsMobile(false)
        } else {
          setViewportDevice(DeviceType.Desktop)
          setIsMobile(false)
        }
      }
    })

    resizeObserver.observe(document.body)
    return () => resizeObserver.disconnect()
  }, [])

  const contextValue: ViewportContextValue = {
    device: viewportDevice,
    isMobile,
  }
  return (
    <ViewportContext.Provider value={contextValue}>
      {children}
    </ViewportContext.Provider>
  )
}

export const useViewport = () => {
  const context = useContext(ViewportContext)
  if (!context) {
    throw new Error("useViewport must be used within a ViewportProvider")
  }
  return context
}
