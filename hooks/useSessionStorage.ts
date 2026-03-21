interface UseSessionStorageReturn<T> {
  setValue: (value: T) => void
  getValue: () => T | null
}

export const useSessionStorage = <T>(
  key: string
): UseSessionStorageReturn<T> => {
  const setValue = (value: T) => {
    if (typeof window === "undefined") return
    try {
      window.sessionStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error("Error setting session storage:", error)
    }
  }

  const getValue = (): T | null => {
    if (typeof window === "undefined") return null
    try {
      const item = window.sessionStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch (error) {
      console.error("Error reading sessionStorage key:", key, error)
      return null as unknown as T
    }
  }

  return { setValue, getValue }
}
