import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  SliderGroup,
} from "@/components/ui/carousel";
import carousel1 from "@/assets/images/auth/carousel1.jpeg";
import carousel2 from "@/assets/images/auth/carousel2.jpeg";
import carousel3 from "@/assets/images/auth/carousel3.jpeg";
import { useEffect, useRef, useState } from "react";
import type { EmblaCarouselType } from "embla-carousel";

const CarouselPlugin = () => {
  const plugin = useRef(Autoplay({ delay: 3500, stopOnInteraction: true }));
  const [activeIndex, setActiveIndex] = useState(0);
  const [api, setApi] = useState<EmblaCarouselType | undefined>(undefined);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setActiveIndex(api.selectedScrollSnap());
    };

    onSelect(); 
    api.on("select", onSelect); 

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <Card className="border-none w-full bg-[#222936]">
      <CardContent className="p-0 h-full">
        <Carousel
          plugins={[plugin.current]}
          className="w-full h-full"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
          setApi={setApi}
        >
          <CarouselContent className="h-full">
            {[carousel1, carousel2, carousel3].map((image, index) => (
              <CarouselItem className="h-full" key={index}>
                <div className="flex h-full items-center justify-center">
                  <img
                    src={image}
                    alt={`Slide ${index + 1}`}
                    className="w-[90%] max-h-[70%] object-contain"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <SliderGroup activeIndex={activeIndex} />
        </Carousel>
      </CardContent>
    </Card>
  );
};

export default CarouselPlugin;
