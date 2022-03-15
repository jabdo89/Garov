import styled from 'styled-components';
import { purple } from '@ant-design/colors';

const AuthWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${purple[9]};
  min-height: 100vh;
`;

export { AuthWrapper };
