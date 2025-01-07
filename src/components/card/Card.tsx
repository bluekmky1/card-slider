import styled from "styled-components";

interface CardProps {
  backgroundColor: string;
  index: number;
  name: string;
  totalCards: number;
}

// 수직 위치 계산
const getVerticalOffset = (index: number, totalCards: number) => {
  const middleIndex = Math.floor(totalCards / 2);
  const offset = (index - middleIndex) * 50;
  return `${offset}px`;
};

// 크기 계산
const getScale = (index: number, totalCards: number) => {
  const middleIndex = Math.floor(totalCards / 2);
  const distance = Math.abs(index - middleIndex);
  return Math.max(1 - (distance * 0.04), 0.8);
};

// 기울기 계산
const getRotation = (index: number, totalCards: number) => {
  const middleIndex = Math.floor(totalCards / 2);
  // 위쪽 카드는 시계방향으로, 아래쪽 카드는 반시계방향으로 기울어짐
  const rotation = (index - middleIndex) * -0.3;
  return index < middleIndex ? rotation : -rotation;
};

// 투명도 계산
const getOpacity = (index: number, totalCards: number) => {
  const middleIndex = Math.floor(totalCards / 2);
  const distance = Math.abs(index - middleIndex);
  return distance <= 5 ? 1 : 0;
};

//z-index 계산
const getZIndex = (index: number, totalCards: number) => {
  const middleIndex = Math.floor(totalCards / 2);
  const distance = Math.abs(index - middleIndex);
  return totalCards - distance;
};

const StyledCard = styled.div.attrs<{
  backgroundColor: string;
  index: number;
  totalCards: number;
}>((props) => ({
  backgroundColor: props.backgroundColor,
  index: props.index,
  totalCards: props.totalCards,
}))`
  // 카드 너비 설정
  width: 500px;

  // 카드 비율 설정
  aspect-ratio: 85/54;

  // 카드 위치 설정
  position: fixed;
    
  // 카드 z-index 설정
  z-index: ${(props) => getZIndex(props.index, props.totalCards)};

  // 카드 변형 설정
  transform: 
    rotate(${(props) => getRotation(props.index, props.totalCards)}deg) // 카드 회전
    translateY(${(props) => getVerticalOffset(props.index, props.totalCards)}) // 카드 수직 이동
    scale(${(props) => getScale(props.index, props.totalCards)});

  // 카드 애니메이션 설정
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  // 카드 배경색 설정
  background-color: ${(props) => props.backgroundColor || "#ffffff"};

  // 카드 투명도 설정
  opacity: ${(props) => getOpacity(props.index, props.totalCards)};

  // 카드 그림자 설정
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  // 카드 모서리 둥글기 설정
  border-radius: 8px; 

  // 카드 내부 요소 정렬 설정
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
