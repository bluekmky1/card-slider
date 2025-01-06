import styled from "styled-components";

interface CardProps {
  backgroundColor: string;
  index: number;
  name: string;
  totalCards: number;
}

const StyledCard = styled.div<{
  backgroundColor: string;
  index: number;
  totalCards: number;
}>`
  aspect-ratio: 85/54;
  position: absolute;
  z-index: ${(props) => props.index};
  transform: rotateX(${(props) => props.index * (360 / props.totalCards)}deg);

  background-color: ${(props) => props.backgroundColor || "#ffffff"};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  width: 500px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Card({
  backgroundColor,
  index,
  name,
  totalCards,
}: CardProps) {
  return (
    <StyledCard
      backgroundColor={backgroundColor}
      index={index}
      totalCards={totalCards}
    >
      {name}
    </StyledCard>
  );
}
