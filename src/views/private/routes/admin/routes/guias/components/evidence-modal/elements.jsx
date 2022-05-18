import styled from "styled-components";

const CarouselImageContainer = styled.div`
  width: 100%;
  background-color: #f1f1f1;
  padding: 10px;
  margin-bottom: ${(props) => props.theme.margin};
  display: flex;
  justify-content: center;
`;

export { CarouselImageContainer };
