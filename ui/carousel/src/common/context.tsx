import { MotionValue } from "framer-motion"
import { createContext, useContext } from "react"

export interface CarouselContextProps {
  dragging: boolean
  x: MotionValue<number>
  enabled: boolean
}

export const CarouselContext = createContext<CarouselContextProps>({
  dragging: false,
  x: new MotionValue(),
  enabled: true,
})

export const useCarouselContext = () => useContext(CarouselContext)

export const useCarouselMotionValue = () => useCarouselContext().x

export const useCarouselIsDragging = () => useCarouselContext().dragging

export const CarouselContextProvider = ({
  dragging,
  x,
  children,
  enabled,
}: CarouselContextProps & { children: React.ReactNode }) => (
  <CarouselContext.Provider
    value={{
      dragging,
      x,
      enabled,
    }}
  >
    {children}
  </CarouselContext.Provider>
)
