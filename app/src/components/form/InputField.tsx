import { Flex, Input } from 'antd'
import { ChangeEventHandler } from 'react'
import { FieldError } from 'react-hook-form'
import styled from 'styled-components'

const StyledInput = styled(Input)`
  height: 65px;
  padding: 20px;
  font-size: 16px;
  text-align: center;
`

interface IInputField {
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
  placeholder?: string
  error?: FieldError
}

export function InputField({
  value,
  onChange,
  placeholder = '',
  error,
}: IInputField) {
  return (
    <Flex vertical gap={4}>
      <StyledInput
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {error && <span style={{ color: 'red' }}>{error.message}</span>}
    </Flex>
  )
}
