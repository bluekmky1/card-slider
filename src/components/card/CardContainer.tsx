import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Card from "./Card";

const cards = [
  { id: 1, backgroundColor: "#FF6B6B", name: "Card 1" },
  { id: 2, backgroundColor: "#4ECDC4", name: "Card 2" },
  { id: 3, backgroundColor: "#45B7D1", name: "Card 3" },
  { id: 4, backgroundColor: "#96CEB4", name: "Card 4" },
  { id: 5, backgroundColor: "#D4A5A5", name: "Card 5" },
  { id: 6, backgroundColor: "#9B59B6", name: "Card 6" },
  { id: 7, backgroundColor: "#3498DB", name: "Card 7" },
  { id: 8, backgroundColor: "#E67E22", name: "Card 8" },
  { id: 9, backgroundColor: "#2ECC71", name: "Card 9" },
  { id: 10, backgroundColor: "#F1C40F", name: "Card 10" },
  { id: 11, backgroundColor: "#E74C3C", name: "Card 11" },
  { id: 12, backgroundColor: "#1ABC9C", name: "Card 12" },
  { id: 13, backgroundColor: "#8E44AD", name: "Card 13" },
  { id: 14, backgroundColor: "#34495E", name: "Card 14" },
  { id: 15, backgroundColor: "#16A085", name: "Card 15" },
  { id: 16, backgroundColor: "#27AE60", name: "Card 16" },
  { id: 17, backgroundColor: "#2980B9", name: "Card 17" },
  { id: 18, backgroundColor: "#C0392B", name: "Card 18" },
  { id: 19, backgroundColor: "#D35400", name: "Card 19" },
  { id: 20, backgroundColor: "#7F8C8D", name: "Card 20" }, 
];

const Container = styled.div`
  // 컨테이너 크기 설정
  height: 100vh;
  width: 100%;

  // 카드 위치 중앙 정렬
  display: flex;
  justify-content: center;
  align-items: center;

  // 스크롤바 숨기기
  &::-webkit-scrollbar {
    display: none;
  }
`;

// 스로틀 함수 추가
const throttle = (func: Function, limit: number) => {
  let inThrottle: boolean;
  return function(this: any, ...args: any[]) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

export default function CardContainer() {
  const totalCards = cards.length;  
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleWheel = throttle((e: WheelEvent) => {
      // 스크롤 강도에 따라 넘어갈 카드 수 계산

      // 스크롤 강도 계산
      const scrollIntensity = Math.abs(e.deltaY);

      // 스크롤 강도에 따라 넘어갈 카드 수 계산
      const cardToMove = Math.max(
        1, // 최소 1장
        Math.min(
          Math.floor(scrollIntensity / 300), // 300px 당 1장씩 추가로 넘김
          totalCards / 4 // 1번의 스크롤로 최대 카드 개수의 1/4까지만 넘기도록 제한
        )
      );

      // 스크롤 방향에 따라 카드 인덱스 업데이트
      if (e.deltaY > 0) {
        setCurrentIndex((prev) => (prev + cardToMove) % cards.length);
      } else {
        setCurrentIndex((prev) => (prev - cardToMove + cards.length) % cards.length);
      }
    }, 65); // 쓰로틀 시간 간격 설정 0.065초 (휠 1틱 간격 느낌으로 설정)


    // 컨테이너 요소 가져오기
    const container = containerRef.current;

    // 컨테이너에 스크롤 이벤트 리스너 추가
    if (container) {
      container.addEventListener("wheel", handleWheel);
    }

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
    };
  }, [totalCards]);

  return (
    <Container ref={containerRef}>
      {cards.map((card, index) => {
        const adjustedIndex = (index - currentIndex + cards.length) % cards.length;
        return (
          <Card
            key={card.id}
            backgroundColor={card.backgroundColor}
            index={adjustedIndex}
            name={`Card ${card.id}`}
            totalCards={cards.length}
          />
        );
      })}
    </Container>
  );
}


// 쓰로틀(Throttle)과 디바운스(Debounce)는 모두 이벤트 호출을 제어하는 기술이지만, 동작 방식이 다릅니다:
// 쓰로틀 (Throttle)
// 일정 시간 간격으로 함수를 실행하도록 보장합니다
// 예를 들어 300ms 쓰로틀을 설정하면:

// 시간: 0ms - 이벤트 발생 & 함수 실행
// 시간: 100ms - 이벤트 발생 (무시)
// 시간: 200ms - 이벤트 발생 (무시)
// 시간: 300ms - 이벤트 발생 & 함수 실행
// 시간: 400ms - 이벤트 발생 (무시)

// - 연속적인 실행이 필요한 경우에 적합 (예: 스크롤, 게임 입력)
// 정해진 시간 간격으로 최소한의 실행을 보장합니다
// ------------------------------------------------------------------------------------------------
// 디바운스 (Debounce)
// 마지막 이벤트 발생 후 일정 시간이 지나면 함수를 실행합니다
// 예를 들어 300ms 디바운스를 설정하면:

// 시간: 0ms - 이벤트 발생 (대기 시작)
// 시간: 100ms - 이벤트 발생 (타이머 리셋)
// 시간: 200ms - 이벤트 발생 (타이머 리셋)
// 시간: 500ms - 마지막 이벤트로부터 300ms가 지나서 함수 실행

// 연속된 이벤트의 마지막 한 번만 실행하고 싶을 때 적합 (예: 검색어 입력, 창 크기 조절)
// 연속된 이벤트가 끝날 때까지 실행을 지연시킵니다

// 적절한 사용 상황
// 쓰로틀 사용:
// 스크롤 이벤트 처리
// 게임의 키보드/마우스 입력
// 실시간 드래그 이벤트
// 차트나 그래프 업데이트

// 디바운스 사용:
// 검색창 자동완성
// 폼 유효성 검사
// 윈도우 리사이즈 이벤트
// API 요청이 필요한 입력 처리