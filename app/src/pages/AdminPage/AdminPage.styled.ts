import { Button, Flex } from 'antd'
import styled from 'styled-components'
import { colors } from '@/styles/colors'

export const UploadContainer = styled(Flex)`
  width: 590px;
  height: 512px;
  border-radius: 12px;
  border: 1px solid var(--Line-Generic, rgba(0, 0, 0, 0.1));
  background: ${colors.white};
`

export const UploadTitle = styled.p`
  color: rgba(0, 0, 0, 0.7);
  font-size: 16px;
  font-weight: 400;
`

export const StyledButton = styled(Button)`
  padding: 6px 16px;
  background: ${colors.primaryRed};
  border-radius: 6px;
  color: ${colors.white};
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
`

export const FileItem = styled.div`
  width: 60%;
  padding: 0 8px;
  font-size: 14px;
  text-align: left;
`
