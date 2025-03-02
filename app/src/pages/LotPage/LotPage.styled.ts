import { colors } from "@/styles/colors"
import { Button, Flex, Input } from "antd"
import styled from "styled-components"

export const Dot = styled.div`
  margin-top: 4.5px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${colors.white};
  border-radius: 999px;

  span {
    color: ${colors.primaryGray};
    font-weight: 600;
    font-size: 14px;
    line-height: 19.12px;
  }
`

export const Vertical = styled.div`
  width: 1px;
  height: 100%;
  background: #d3d3d3;
`

export const ContentWrapper = styled(Flex)`
  width: 301px;
  background: ${colors.white};
  border-radius: 6px;
  padding: 16px 32px 32px;
`

export const DeliveryWrapper = styled(Flex)`
  width: 400px;
  background: ${colors.white};
  border-radius: 6px;
  padding: 16px 32px;
`

export const SectionTitle = styled.p`
  color: ${colors.primaryBlack};
  font-weight: 500;
  font-size: 24px;
  line-height: 32.78px;
`

export const TitleText = styled.p`
  color: ${colors.primaryBlack};
  font-weight: 500;
  font-size: 20px;
  line-height: 32.78px;
  line-height: 27.32px;
`

export const Text = styled.p`
  font-weight: 400;
  font-size: 16px;
  line-height: 21.86px;
`

export const VolumeInput = styled(Input)`
  width: 164px;
  height: 44px;
`

export const AddressInput = styled(Input)`
  height: 44px;
`

interface DeliveryTabProps {
  isSelected: boolean
}

export const DeliveryTab = styled.div<DeliveryTabProps>`
  width: fit-content;
  background: ${colors.white};
  border-radius: 6px;
  padding: 6px 16px;
  cursor: pointer;
  background-color: ${props => (props.isSelected ? colors.white : '#F1F1F1')};
`

export const DeliveryTabText = styled.p`
  color: #000000b2;
  font-weight: 500;
  font-size: 16px;
  line-height: 21.86px;
`

export const SubmitButton = styled(Button)`
  width: fit-content;
  height: 31px;
`
