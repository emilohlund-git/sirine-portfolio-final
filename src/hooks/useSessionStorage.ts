import { useEffect, useState } from "react";

const useSessionStorage = () => {
  const [value, setValue] = useState<any | null>(null)

  useEffect(() => {
    const sessionkey = sessionStorage.key(0);
    if (sessionkey) {
      const sessionData = sessionStorage.getItem(sessionkey);
      if (sessionData) {
        setValue(JSON.parse(sessionData));
      }
    }
  }, [])

  return value
}

export default useSessionStorage