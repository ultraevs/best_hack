import { useUser } from '@/helpers/user/UserProvider'
import { Flex } from 'antd'
import logo from '@/assets/logo.svg'
import { NavLink } from 'react-router'
import { routes } from '@/router/routes'
import styled from 'styled-components'
import { colors } from '@/styles/colors'

const Wrapper = styled.header`
  max-width: 1440px;
  width: 100%;
  height: 72px;
  padding: 20px 120px;
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16;
`

const StyledNavLink = styled(NavLink)`
  font-size: 16px;
  color: ${colors.primaryBlack};
`

export function Header() {
  const { user } = useUser()

  return (
    <Wrapper>
      <StyledNavLink to={routes.main.url}>
        <img src={logo} alt='logo' />
      </StyledNavLink>

      {user && (
        <Flex align='center' gap={32}>
          <StyledNavLink to={routes.main.url}>
            {routes.main.title}
          </StyledNavLink>
          <StyledNavLink to={routes.profile.url}>
            {routes.profile.title}
          </StyledNavLink>
        </Flex>
      )}
    </Wrapper>
  )
}
