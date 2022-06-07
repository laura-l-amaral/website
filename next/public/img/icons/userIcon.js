import { Icon, Box } from '@chakra-ui/react'

const UserIcon = ({
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
      viewBox="0 0 22 22"
      width={widthIcon}
      height={heightIcon}
      fill={fill}
    >
      <path d="M11.4998 1.87695C14.5058 1.87695 16.9425 4.31372 16.9425 7.31966C16.9425 10.3256 14.5058 12.7624 11.4998 12.7624C8.4939 12.7624 6.05713 10.3256 6.05713 7.31966C6.05713 4.31372 8.4939 1.87695 11.4998 1.87695ZM17.7346 13.2325L15.3087 12.6261C12.7601 14.4592 9.67081 14.0501 7.69096 12.6261L5.26511 13.2325C3.81137 13.596 2.7915 14.9021 2.7915 16.4006V17.6608C2.7915 18.5626 3.52253 19.2936 4.42432 19.2936H18.5754C19.4771 19.2936 20.2082 18.5626 20.2082 17.6608V16.4006C20.2082 14.9021 19.1883 13.596 17.7346 13.2325Z" fill={fill}/>
    </Icon>
  </Box>
)

export default UserIcon