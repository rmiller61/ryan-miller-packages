import { MotionValue } from "framer-motion"
import { createContext, useContext } from "react"

export interface CarouselContextProps {
  dragging: boolean
  x: MotionValue<number>
}

export const CarouselContext = createContext<CarouselContextProps>({
  dragging: false,
  x: new MotionValue(),
})

export const useCarouselContext = () => useContext(CarouselContext)

export const useCarouselMotionValue = () => useCarouselContext().x

export const useCarouselIsDragging = () => useCarouselContext().dragging

export const CarouselContextProvider = ({
  dragging,
  x,
  children,
}: CarouselContextProps & { children: React.ReactNode }) => (
  <CarouselContext.Provider
    value={{
      dragging,
      x,
    }}
  >
    {children}
  </CarouselContext.Provider>
)
