import { Icon, Box } from '@chakra-ui/react'

const CopyIcon = ({widthIcon, heightIcon ,fill ,...style}) => (
  <Box 
    display="flex"
    alignItems="center"
    justifyItems="center"
    position="relative"
    {...style}
  >
    <Icon
      viewBox="0 0 24 22"
      width={widthIcon}
      height={heightIcon}
      fill={fill}
    >
      <path fill-rule="evenodd" clip-rule="evenodd" d="M7 2C7 1.44772 7.44772 1 8 1C8.55228 1 9 1.44772 9 2V20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20V2ZM18 5.5C17.4477 5.5 17 5.94771 17 6.5V20.059C17 20.6113 17.4477 21.059 18 21.059C18.5523 21.059 19 20.6113 19 20.059V6.5C19 5.94772 18.5523 5.5 18 5.5ZM13 11C12.4477 11 12 11.4477 12 12V20C12 20.5523 12.4477 21 13 21C13.5523 21 14 20.5523 14 20V12C14 11.4477 13.5523 11 13 11ZM3 7C2.44772 7 2 7.44772 2 8V20C2 20.5523 2.44772 21 3 21C3.55228 21 4 20.5523 4 20V8C4 7.44772 3.55228 7 3 7Z" fill={fill}/>
    </Icon>
  </Box>
)

export default CopyIcon