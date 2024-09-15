import {
  Box,
  Heading,
  Image,
  Text,
  Wrap,
  WrapItem,
  Avatar,
  UnorderedList,
  ListItem,
  OrderedList,
  Button,
  useClipboard,
  createIcon,
  AspectRatio,
  Table,
  TableContainer,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
  Grid,
  GridItem,
  Link,
} from "@chakra-ui/react";

// import Link from "../atoms/Link"
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import hljs from "highlight.js/lib/core";
import { CopyIcon } from "../../public/img/icons/copyIcon";
import CheckIcon from "../../public/img/icons/checkIcon";

function DatePost({ date, slug }) {
  if (date.trim().length === 0) {
    console.error(`Invalid date \`${date}\` for post slug: ${slug}`);
    return null;
  }
  const localeDate = new Date(date).toLocaleString("pt-BR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <Text as="p" fontFamily={"Roboto"} fontSize={"sm"} color="gray">
      {localeDate}
    </Text>
  );
}

const LANGS_SUPPORTED = [
  "sql",
  "python",
  "r",
  "bash",
  "sh",
  "stata",
  "markdown",
  "md",
];

function CodeBlock({ children }) {
  const code = children.props.children;

  const language = children.props.className?.replace("language-", "").trim();

  const { hasCopied, onCopy } = useClipboard(code);

  const highlighted =
    language !== undefined && LANGS_SUPPORTED.includes(language)
      ? hljs.highlight(code, {
          language: language,
        })
      : hljs.highlightAuto(code);

  return (
    <Box
      padding="0.2rem"
      marginY={"1rem"}
      borderRadius={"8px"}
      backgroundColor={"#282b2e"}
    >
      <Box display={"flex"} alignItems={"center"} padding={"0 0.5rem"}>
        {language ? (
          <Text
            as="span"
            display={"block"}
            paddingLeft={"7px"}
            fontWeight={500}
            fontSize="12px"
            color="#878A8E"
            textTransform={"capitalize"}
            userSelect={"none"}
            fontFamily={"Roboto"}
          >
            {["sh", "sql"].includes(language)
              ? language.toUpperCase()
              : language}
          </Text>
        ) : null}
        <Button
          variant="unstyled"
          onClick={onCopy}
          _groupActive={{ background: "transparent" }}
          backgroundColor={"transparent"}
          padding={0}
          display={"flex"}
          marginLeft={"auto"}
          alignItems={"center"}
          fontFamily="Roboto"
          fontWeight="500"
          fontSize="12px"
          color="#878A8E"
          fill="#878A8E"
          _hover={{
            fill: "#9D9FA3",
            color: "#9D9FA3",
          }}
          rightIcon={
            hasCopied ? (
              <CheckIcon alt="copiado conteúdo" width="24px" height="24px" />
            ) : (
              <CopyIcon alt="copiar conteúdo" width="24px" height="24px" />
            )
          }
        >
          {hasCopied ? "Copiado" : "Copiar"}
        </Button>
      </Box>
      <Box
        as="pre"
        display="flex"
        justifyContent="space-between"
        width="100%"
        overflowX="auto"
        whiteSpace={"pre"}
      >
        <Text
          as="code"
          paddingTop={"0 !important"}
          width={"100%"}
          className={`hljs ${language}`}
          dangerouslySetInnerHTML={{ __html: highlighted.value }}
        />
      </Box>
    </Box>
  );
}

const ShareIcon = createIcon({
  displayName: "share",
  viewBox: "0 0 24 24",
  path: (
    <path
      fill="currentColor"
      fill-rule="evenodd"
      d="M15.218 4.931a.4.4 0 0 1-.118.132l.012.006a.45.45 0 0 1-.292.074.5.5 0 0 1-.3-.13l-2.02-2.02v7.07c0 .28-.23.5-.5.5s-.5-.22-.5-.5v-7.04l-2 2a.45.45 0 0 1-.57.04h-.02a.4.4 0 0 1-.16-.3.4.4 0 0 1 .1-.32l2.8-2.8a.5.5 0 0 1 .7 0l2.8 2.79a.42.42 0 0 1 .068.498m-.106.138.008.004v-.01zM16 7.063h1.5a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-11c-1.1 0-2-.9-2-2v-10a2 2 0 0 1 2-2H8a.5.5 0 0 1 .35.15.5.5 0 0 1 .15.35.5.5 0 0 1-.15.35.5.5 0 0 1-.35.15H6.4c-.5 0-.9.4-.9.9v10.2a.9.9 0 0 0 .9.9h11.2c.5 0 .9-.4.9-.9v-10.2c0-.5-.4-.9-.9-.9H16a.5.5 0 0 1 0-1"
      clip-rule="evenodd"
    ></path>
  ),
});

const FacebookIcon = createIcon({
  displayName: "facebook",
  viewBox: "0 0 24 24",
  path: (
    <path
      fill="currentColor"
      d="M22 12.061C22 6.505 17.523 2 12 2S2 6.505 2 12.061c0 5.022 3.657 9.184 8.438 9.939v-7.03h-2.54V12.06h2.54V9.845c0-2.522 1.492-3.915 3.777-3.915 1.094 0 2.238.197 2.238.197v2.476h-1.26c-1.243 0-1.63.775-1.63 1.57v1.888h2.773l-.443 2.908h-2.33V22c4.78-.755 8.437-4.917 8.437-9.939"
    ></path>
  ),
});

const LinkedInIcon = createIcon({
  displayName: "linkedin",
  viewBox: "0 0 24 24",
  path: (
    <path
      fill="currentColor"
      d="M21 4.324v15.352A1.324 1.324 0 0 1 19.676 21H4.324A1.324 1.324 0 0 1 3 19.676V4.324A1.324 1.324 0 0 1 4.324 3h15.352A1.324 1.324 0 0 1 21 4.324M8.295 9.886H5.648v8.478h2.636V9.886zm.221-2.914a1.52 1.52 0 0 0-1.51-1.533H6.96a1.533 1.533 0 0 0 0 3.066 1.52 1.52 0 0 0 1.556-1.487zm9.825 6.236c0-2.555-1.626-3.542-3.229-3.542a3.02 3.02 0 0 0-2.67 1.37h-.082V9.875H9.875v8.477h2.648v-4.494a1.754 1.754 0 0 1 1.579-1.893h.104c.837 0 1.464.523 1.464 1.858v4.54h2.647l.024-5.144z"
    ></path>
  ),
});

function NativeShare({ url, title, description }) {
  const { hasCopied, onCopy } = useClipboard(url);

  if (typeof window === "undefined") {
    return null;
  }

  // client-side only
  if (navigator.share) {
    return (
      <Button
        variant="unstyled"
        onClick={() =>
          navigator
            .share({
              title: `${title} – Blog – Base dos Dados`,
              text: `${title}\n ${description}`,
              url: url,
            })
            .then(() => {})
            .catch((error) => {
              console.error(`Something went wrong to share: ${url}`, error);
            })
        }
      >
        <ShareIcon width={"1.4rem"} height={"1.4rem"} />
      </Button>
    );
  }

  return (
    <Button
      variant="unstyled"
      title="Copiar link"
      onClick={onCopy}
      minWidth={"auto"}
      minHeight={"auto"}
    >
      {hasCopied ? (
        <CheckIcon width={"1.4rem"} height={"1.4rem"} alt="copiado conteúdo" />
      ) : (
        <CopyIcon width={"1.4rem"} height={"1.4rem"} alt="copiar conteúdo" />
      )}
    </Button>
  );
}

export function ShareButtons({ frontmatter }) {
  const { title, description } = frontmatter;

  const [origin, setOrigin] = useState("https://basedosdados.org");
  const router = useRouter();

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const url = origin + router.asPath;
  const encodedUrl = encodeURIComponent(url);

  return (
    <Box marginTop={"1rem"}>
      <Text as="span" fontFamily={"Roboto"} fontSize={"0.9rem"} color="gray">
        Compartilhar
      </Text>
      <Box display={"flex"} alignItems={"center"} gap="1rem">
        <NextLink
          href={`https://www.facebook.com/sharer/sharer.php?t=${encodeURIComponent(title)}&u=${encodedUrl}`}
        >
          <a target="_blank">
            <FacebookIcon width={"1.4rem"} height={"1.4rem"} />
          </a>
        </NextLink>
        <NextLink
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        >
          <a target="_blank">
            <LinkedInIcon width={"1.4rem"} height={"1.4rem"} />
          </a>
        </NextLink>
        <NativeShare url={url} title={title} description={description} />
      </Box>
    </Box>
  );
}

function HeadingWithAnchor(props) {
  return (
    <Heading
      {...props}
      scrollMarginTop={"6rem"}
      fontFamily="Roboto"
      marginY={"1.5rem"}
      role="group"
    >
      {props.children}
      <Link
        href={`#${props.id}`}
        variant="unstyled"
        opacity="0"
        color="gray"
        fontSize={"inherit"}
        marginLeft="5px"
        transition="none"
        _groupHover={{ opacity: "1" }}
      >
        {"#"}
      </Link>
    </Heading>
  );
}

function FigCaption(props) {
  return props.children ? (
    <Text
      as="figcaption"
      fontFamily={"Roboto"}
      fontSize={"sm"}
      color={"gray"}
      textAlign={"center"}
      marginY="0.5rem"
    >
      {props.children}
    </Text>
  ) : null;
}

export const mdxComponents = {
  h1: (props) => <HeadingWithAnchor as="h2" size="1.8rem" {...props} />,
  h2: (props) => <HeadingWithAnchor as="h2" fontSize="1.8rem" {...props} />,
  h3: (props) => <HeadingWithAnchor as="h3" fontSize="1.5rem" {...props} />,
  h4: (props) => <HeadingWithAnchor as="h4" fontSize="1.2rem" {...props} />,
  h5: (props) => <HeadingWithAnchor as="h5" fontSize={"1.1rem"} {...props} />,
  h6: (props) => <HeadingWithAnchor as="h6" fontSize={"1.05rem"} {...props} />,
  blockquote: (props) => (
    <Box
      as="blockquote"
      paddingY={"0.1rem"}
      paddingLeft={"1.5rem"}
      borderLeft={"3px solid #7ec876"}
      {...props}
    />
  ),
  a: (props) => <Text as="a" color="#0068C5" {...props} />,
  p: (props) => (
    <Text
      as={"p"}
      lineHeight={"7"}
      marginY={"1.5rem"}
      // TODO(aspeddro): check color
      color="#252A32"
      fontFamily={"Roboto"}
      {...props}
    />
  ),
  // Inline code
  code: (props) => (
    <Text
      as="code"
      fontFamily={"ui-monospace, monospace"}
      backgroundColor={"#e7e7e7"}
      color="#3b3b3b"
      fontSize={"90%"}
      padding="2px 4px"
      borderRadius={"3px"}
      {...props}
    />
  ),
  pre: (props) => <CodeBlock {...props} />,
  ol: (props) => <OrderedList {...props} />,
  ul: (props) => <UnorderedList {...props} />,
  li: (props) => <ListItem marginY={"2"} fontFamily={"Roboto"} {...props} />,
  table: (props) => (
    <TableContainer>
      <Table variant="simple" {...props} />
    </TableContainer>
  ),
  thead: (props) => <Thead {...props} />,
  tbody: (props) => <Tbody {...props} />,
  tr: (props) => <Tr {...props} />,
  td: (props) => <Td {...props} />,
  th: (props) => <Th {...props} />,
  // custom components
  Image: (props) => (
    <Box as="figure" marginY={"2rem"}>
      <Image margin={"0 auto"} src={props.src} />
      <FigCaption {...props} />
    </Box>
  ),
  Video: (props) => (
    <Box as="figure" marginY="2rem">
      <video width="100%" controls preload="metadata" src={props.src} />
      <FigCaption {...props} />
    </Box>
  ),
  Embed: ({ children }) => (
    <Box marginY="2rem">
      <AspectRatio ratio={16 / 9}>{children}</AspectRatio>
      <FigCaption {...children.props} />
    </Box>
  ),
  Blockquote: (props) => (
    <Box
      as="blockquote"
      padding={"2rem 2.5rem"}
      borderLeft={"4px solid #7ec876"}
      marginY={"3rem"}
      position={"relative"}
    >
      <Text
        as="span"
        fontSize={"4rem"}
        pointerEvents={"none"}
        userSelect={"none"}
        position={"absolute"}
        lineHeight={"1"}
        top="1rem"
      >
        “
      </Text>
      <Text
        as="p"
        marginTop={"1.5rem"}
        fontFamily={"Roboto"}
        fontSize={"lg"}
        {...props}
      />
      <Text as="p" fontFamily={"Roboto"} color="gray">
        {props.author}
      </Text>
    </Box>
  ),
};

export function Toc({ headings }) {
  if (headings.length === 0) {
    return null;
  }
  return (
    <>
      <Box marginBottom={"1rem"}>
        <Text
          as="p"
          fontFamily={"Roboto"}
          fontWeight={"500"}
          paddingBottom={"0.6rem"}
        >
          Tabela de conteúdo
        </Text>
        <Box as="hr" />
        <UnorderedList marginTop={"1rem"}>
          {headings.map(({ id, title, level }) => (
            <ListItem key={id} margin={"0.5rem 0"} marginLeft={`${level * 5}%`}>
              <Link
                href={`#${id}`}
                fontFamily="Roboto"
                fontWeight="normal"
                display="block"
              >
                {title}
              </Link>
            </ListItem>
          ))}
        </UnorderedList>
      </Box>
      <Box as="hr" marginBottom={"1rem"} />
    </>
  );
}

const ForkIcon = createIcon({
  displayName: "fork",
  viewBox: "0 0 16 16",
  path: (
    <path
      fill="current-color"
      d="M1.5 3.25a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 1.5 3.25Zm5.677-.177L9.573.677A.25.25 0 0 1 10 .854V2.5h1A2.5 2.5 0 0 1 13.5 5v5.628a2.251 2.251 0 1 1-1.5 0V5a1 1 0 0 0-1-1h-1v1.646a.25.25 0 0 1-.427.177L7.177 3.427a.25.25 0 0 1 0-.354ZM3.75 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm0 9.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm8.25.75a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Z"
    />
  ),
});

const AuthorIconFallback = createIcon({
  displayName: "user",
  viewBox: "0 0 22 22",
  path: (
    <path
      fill="current-color"
      d="M11.4998 1.87695C14.5058 1.87695 16.9425 4.31372 16.9425 7.31966C16.9425 10.3256 14.5058 12.7624 11.4998 12.7624C8.4939 12.7624 6.05713 10.3256 6.05713 7.31966C6.05713 4.31372 8.4939 1.87695 11.4998 1.87695ZM17.7346 13.2325L15.3087 12.6261C12.7601 14.4592 9.67081 14.0501 7.69096 12.6261L5.26511 13.2325C3.81137 13.596 2.7915 14.9021 2.7915 16.4006V17.6608C2.7915 18.5626 3.52253 19.2936 4.42432 19.2936H18.5754C19.4771 19.2936 20.2082 18.5626 20.2082 17.6608V16.4006C20.2082 14.9021 19.1883 13.596 17.7346 13.2325Z"
    />
  ),
});

export function Contribute({ slug }) {
  return (
    <Box>
      <Text
        as="p"
        color="gray"
        fontSize={"0.9rem"}
        fontFamily={"Roboto"}
        marginBottom={"1rem"}
      >
        Todos os documentos são abertos. Viu algo errado ou pouco claro? Envie
        um pull request e contribua na Base dos Dados {"💚"}
      </Text>
      <Link
        href={`https://github.com/basedosdados/website/edit/main/next/blog/${slug}.mdx`}
        display={"flex"}
        alignItems={"center"}
        borderRadius="8px"
        // backgroundColor="#2B8C4D"
        // padding="8px 16px"
        // width="fit-content"
        // fill="#fff"
        // color="#fff"
        fontFamily={"Roboto"}
        // fontSize={"0.9rem"}
        fontWeight={"500"}
        letterSpacing={"0"}
        // marginLeft="auto"
        // _hover={{
        //   backgroundColor: "#22703E",
        // }}
        isExternal
      >
        <>
          <ForkIcon width={"16px"} height={"16px"} marginRight={"0.5rem"} />
          Editar essa página no GitHub
        </>
      </Link>
    </Box>
  );
}

export function Header({ frontmatter, slug }) {
  return (
    <Box as="header">
      <Text
        as="span"
        display={"block"}
        marginBottom={"10"}
        color={"gray"}
        fontFamily={"Roboto"}
      >
        <DatePost date={frontmatter.date} slug={slug} />
      </Text>
      <Heading as="h1" fontFamily={"Roboto"} size="2xl">
        {frontmatter.title}
      </Heading>
      <Heading
        as="h2"
        fontFamily={"Roboto"}
        fontWeight={"normal"}
        fontSize={"xl"}
        color={"gray"}
        marginY={"10"}
      >
        {frontmatter.description}
      </Heading>
      {frontmatter.authors ? (
        <Box marginBottom={"4rem"}>
          <Wrap display={"flex"} alignItems={"center"}>
            {frontmatter.authors.map((author, index) => {
              const authorComponent = (
                <WrapItem alignItems={"center"}>
                  <Box
                    // href={author.social}
                    fontFamily={"Roboto"}
                    fontSize={"0.9rem"}
                    fontWeight={500}
                    display="flex"
                    alignItems={"center"}
                  >
                    <Avatar
                      size="sm"
                      name={author.name}
                      src={author.avatar}
                      icon={<AuthorIconFallback />}
                    />
                    <Box
                      display={"flex"}
                      flexDirection={"column"}
                      alignItems={"start"}
                      marginLeft={"2"}
                      marginRight={"4"}
                    >
                      {author.name}
                      {author?.role ? (
                        <Text
                          as="span"
                          marginTop={"-0.2rem"}
                          fontSize={"0.7rem"}
                          fontFamily={"Roboto"}
                          color="gray"
                        >
                          {author.role}
                        </Text>
                      ) : null}
                    </Box>
                  </Box>
                </WrapItem>
              );

              return (
                <Box key={index}>
                  {author?.social ? (
                    <Link href={author.social}>{authorComponent}</Link>
                  ) : (
                    <>{authorComponent}</>
                  )}
                </Box>
              );
            })}
          </Wrap>
        </Box>
      ) : null}
    </Box>
  );
}

function Authors({ authors }) {
  const MAX_ICONS = 3;

  return authors.slice(0, MAX_ICONS).map((author, index) => {
    return (
      <WrapItem key={index} alignItems={"center"}>
        {authors.length > MAX_ICONS && index == 2 ? (
          <Avatar
            size="sm"
            backgroundColor={"#efefef"}
            marginLeft={"-15px"}
            title={`${authors
              .slice(MAX_ICONS - 1)
              .map((author) => author.name)
              .join(", ")}`}
            icon={<span>{`+${authors.length - MAX_ICONS + 1}`}</span>}
          />
        ) : (
          <Avatar
            size="sm"
            marginLeft={index !== 0 ? "-15px" : "0"}
            title={author.name}
            name={author.name}
            src={author?.avatar}
            icon={<AuthorIconFallback />}
          />
        )}
      </WrapItem>
    );
  });
}

const CATEGORIES = {
  analise: "Análise",
  tutorial: "Tutorial",
};

export const prettyCategory = (tag) => CATEGORIES[tag] ?? tag;

function Categories({ categories }) {
  if (categories !== undefined) {
    return (
      <Box marginTop={"2"}>
        {categories.map((category) => (
          <NextLink key={category} href={`/blog/category/${category}`} passHref>
            <a>
              <Text
                as="span"
                color="#2b8c4d"
                cursor={"pointer"}
                fontFamily="Roboto"
                fontWeight={"500"}
              >
                {prettyCategory(category)}
              </Text>
            </a>
          </NextLink>
        ))}
      </Box>
    );
  }
  return null;
}

function LatestBlogCard({ slug, frontmatter }) {
  const { title, description, date, authors } = frontmatter;
  return (
    <Box
      display={"flex"}
      flexDirection={{ base: "column", md: "column", lg: "row" }}
    >
      <Box role="group" flexGrow={"1"}>
        <Box
          overflow={"hidden"}
          border="1px solid #DEDFE0"
          borderRadius="16px"
          marginRight={{ base: "0", md: "0", lg: "2rem" }}
        >
          <NextLink href={`/blog/${slug}`} passHref>
            <Link>
              <Image
                cursor="pointer"
                width={"100%"}
                height={"370px"}
                src={
                  frontmatter.thumbnail ||
                  "https://storage.googleapis.com/basedosdados-website/blog/um-site-feito-a-varias-maos/image_9.png"
                }
                objectFit={"none"}
                transition={
                  "transform .6s cubic-bezier(0.01, 0.97, 0.42, 1.09)"
                }
                _groupHover={{ transform: "scale(1.03)" }}
              />
            </Link>
          </NextLink>
        </Box>
      </Box>
      <Box
        width={{ base: "100%", md: "100%", lg: "40%" }}
        marginTop={{ base: "1rem", md: "1rem", lg: "0" }}
      >
        <Heading as="h1" fontSize="4xl" fontWeight={500} fontFamily={"Roboto"}>
          <NextLink href={`/blog/${slug}`} passHref>
            <Link>{title}</Link>
          </NextLink>
        </Heading>
        <Categories categories={frontmatter.categories} />
        <Text
          as="p"
          fontFamily={"Roboto"}
          fontWeight={400}
          fontSize={"1rem"}
          marginY={"2"}
          color={"gray"}
        >
          {description}
        </Text>
        <Box display={"flex"} alignItems={"center"}>
          {authors ? (
            <Wrap display={"flex"} alignItems={"center"} marginRight={"0.5rem"}>
              <Authors authors={authors} />
            </Wrap>
          ) : null}
          <DatePost date={date} slug={slug} />
        </Box>
      </Box>
    </Box>
  );
}

function MiniBlogCard({ slug, frontmatter }) {
  const { title, description, date, authors } = frontmatter;
  return (
    <Box display={"flex"} flexDirection={"column"}>
      <Box role="group">
        <Box overflow={"hidden"} border="1px solid #DEDFE0" borderRadius="16px">
          <NextLink href={`/blog/${slug}`} passHref>
            <Link>
              <Image
                width={"100%"}
                style={{ aspectRatio: "16/8" }}
                src={
                  frontmatter.thumbnail ||
                  "https://storage.googleapis.com/basedosdados-website/blog/um-site-feito-a-varias-maos/image_9.png"
                }
                objectFit={"cover"}
                transition={
                  "transform .6s cubic-bezier(0.01, 0.97, 0.42, 1.09)"
                }
                _groupHover={{ transform: "scale(1.03)" }}
              />
            </Link>
          </NextLink>
        </Box>
        <Heading as="h3" fontSize={"xl"} fontWeight={500} fontFamily={"Roboto"}>
          <NextLink href={`/blog/${slug}`} passHref>
            <Link
              display="block"
              paddingTop={"1rem"}
              _groupHover={{ textDecoration: "underline" }}
            >
              {title}
            </Link>
          </NextLink>
        </Heading>
      </Box>
      <Categories categories={frontmatter.categories} />
      <Text
        as="p"
        fontFamily={"Roboto"}
        fontWeight={400}
        fontSize={"1rem"}
        marginY={".5rem"}
        color={"gray"}
      >
        {description}
      </Text>
      <Box display={"flex"} alignItems={"center"}>
        {authors ? (
          <Wrap display={"flex"} alignItems={"center"} marginRight={".5rem"}>
            <Authors authors={authors} />
          </Wrap>
        ) : null}
        <DatePost date={date} slug={slug} />
      </Box>
    </Box>
  );
}

export function BlogGrid({ posts }) {
  return (
    <Grid
      marginTop={"4rem"}
      gap={"3rem"}
      templateColumns={{ md: "1fr 1fr", xl: "1fr 1fr 1fr" }}
    >
      {posts.map((post, index) => {
        if (index === 0) {
          return (
            <GridItem
              as="article"
              key={index}
              gridColumn={{ md: "span 2", xl: "span 3" }}
            >
              <LatestBlogCard key={post.slug} {...post} />
            </GridItem>
          );
        } else {
          return (
            <GridItem
              as="article"
              key={index}
              borderTop={"1px solid #DEDFE0"}
              paddingTop={"3rem"}
            >
              <MiniBlogCard key={post.slug} {...post} />
            </GridItem>
          );
        }
      })}
    </Grid>
  );
}