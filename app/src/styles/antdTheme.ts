import { ThemeConfig } from 'antd'
import { colors } from '@/styles/colors'

export const antdTheme: ThemeConfig = {
  components: {
    Button: {
      defaultColor: colors.white,
      defaultBg: colors.primaryRed,
      contentFontSize: 20,
      defaultHoverColor: colors.white,
      defaultHoverBg: colors.primaryRed,
      defaultHoverBorderColor: colors.primaryRed,
    },
    Input: {
      hoverBorderColor: colors.primaryRed,
      activeBorderColor: colors.primaryRed,
    },
    Select: {
      hoverBorderColor: colors.primaryRed,
      activeBorderColor: colors.primaryRed,
    }
  },
}
