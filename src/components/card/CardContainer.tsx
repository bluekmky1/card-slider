import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Card from "./Card";

const cards = [
  { id: 1, backgroundColor: "#FF5733", name: "Card 1" },
  { id: 2, backgroundColor: "#00ff00", name: "Card 2" },
  { id: 3, backgroundColor: "#0000ff", name: "Card 3" },
  { id: 4, backgroundColor: "#ffff00", name: "Card 4" },
  { id: 5, backgroundColor: "#ff00ff", name: "Card 5" },
  { id: 6, backgroundColor: "#00ffff", name: "Card 6" },
  { id: 7, backgroundColor: "#ffffff", name: "Card 7" },
  { id: 8, backgroundColor: "#000000", name: "Card 8" },
  { id: 9, backgroundColor: "#ff0000", name: "Card 9" },
  { id: 10, backgroundColor: "#00ff00", name: "Card 10" },
  { id: 11, backgroundColor: "#0000ff", name: "Card 11" },
  { id: 12, backgroundColor: "#ffff00", name: "Card 12" },
  { id: 13, backgroundColor: "#ff00ff", name: "Card 13" },
  { id: 14, backgroundColor: "#00ffff", name: "Card 14" },
  { id: 15, backgroundColor: "#ffffff", name: "Card 15" },
  { id: 16, backgroundColor: "#000000", name: "Card 16" },
  { id: 17, backgroundColor: "#ff0000", name: "Card 17" },
  { id: 18, backgroundColor: "#00ff00", name: "Card 18" },
  { id: 19, backgroundColor: "#0000ff", name: "Card 19" },
  { id: 20, backgroundColor: "#ffff00", name: "Card 20" },
];

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  perspective: 1000px;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default function CardContainer() {
  const [cardList, setCardList] = useState([...cards]);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 0) {
        setCardList((prev) => {
          const newCards = [...prev];
          const firstCard = newCards.shift();
          if (firstCard) {
            newCards.push(firstCard);
          }
          return newCards;
        });
      } else {
        setCardList((prev) => {
          const newCards = [...prev];
          const lastCard = newCards.pop();
          if (lastCard) {
            newCards.unshift(lastCard);
          }
          return newCards;
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel);
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  return (
    <Container ref={containerRef}>
      {cardList.map((card, index) => (
        <Card
          backgroundColor={card.backgroundColor}
          index={index}
          name={`Card ${card.id}`}
          totalCards={cardList.length}
        />
      ))}
    </Container>
  );
}
