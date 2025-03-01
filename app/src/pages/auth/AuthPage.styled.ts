import styled from 'styled-components'
import { Button } from 'antd'
import { colors } from '@/styles/colors'

export const Wrapper = styled.div`
  padding: 30px 30px 54px;
  width: 533px;
  border-radius: 20px;
  background: ${colors.white};
  box-shadow: 0px 10px 15px 0px rgba(0, 0, 0, 0.08),
    0px 3px 11px 0px rgba(0, 0, 0, 0.15);
`

export const StyledButton = styled(Button)`
  height: 59px;
  padding: 16px;
`

export const TextWrapper = styled.p`
  margin-top: 6px;
  text-align: center;

  a {
    color: ${colors.primaryRed};
  }
`
