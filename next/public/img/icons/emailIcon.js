import { Icon, Box } from '@chakra-ui/react'

const EmailIcon = ({
  widthIcon,
  heightIcon,
  fill,
  ...style
}) => (
  <Box 
    display="flex"
    alignItems="center"
    justifyItems="center"
    position="relative"
    {...style}
  >
    <Icon
      viewBox="0 0 14 14"
      width={widthIcon}
      height={heightIcon}
      fill={fill}
    >
      <path d="M13.7348 5.46719C13.8414 5.38242 14 5.46172 14 5.5957V11.1875C14 11.9121 13.4121 12.5 12.6875 12.5H1.3125C0.587891 12.5 0 11.9121 0 11.1875V5.59844C0 5.46172 0.155859 5.38516 0.265234 5.46992C0.877734 5.9457 1.68984 6.55 4.47891 8.57617C5.05586 8.99727 6.0293 9.8832 7 9.87774C7.97617 9.88594 8.96875 8.98086 9.52383 8.57617C12.3129 6.55 13.1223 5.94297 13.7348 5.46719ZM7 9C7.63438 9.01094 8.54766 8.20156 9.00703 7.86797C12.6355 5.23477 12.9117 5.00508 13.7484 4.34883C13.907 4.22578 14 4.03438 14 3.83203V3.3125C14 2.58789 13.4121 2 12.6875 2H1.3125C0.587891 2 0 2.58789 0 3.3125V3.83203C0 4.03438 0.0929687 4.22305 0.251563 4.34883C1.08828 5.00234 1.36445 5.23477 4.99297 7.86797C5.45234 8.20156 6.36562 9.01094 7 9Z" fill={fill}/>
    </Icon>
  </Box>
)

export default EmailIcon