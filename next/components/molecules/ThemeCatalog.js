import {
  VStack,
  Center,
  Image,
  Tooltip,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import { slidesToShowPlugin, slidesToScrollPlugin } from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import { useCheckMobile } from "../../hooks/useCheckMobile.hook";
import { getRecentDatalakeDatasetsByTheme } from "../../pages/api/datasets";
import DatabaseCard from "../organisms/DatabaseCard";

const Carousel = dynamic(
  () => import('@brainhubeu/react-carousel'),
  { ssr: false },
)

function Themes ({ isMobileMod, newRecentDataLakeDataSets, listThemes=[] }) {
  const [selectedTheme, setSelectedTheme] = useState()

  const searchTheme = (elm) => {
    window.open("#theme", "_self")
    setSelectedTheme(elm.name)
    newRecentDataLakeDataSets({
      name: elm.name,
    })
  }

  const plug = [ "arrows",
    {
      resolve: slidesToShowPlugin,
      options: {
        numberOfSlides: listThemes && listThemes.length
      }
    },
    {
      resolve: slidesToScrollPlugin,
      options: {
        numberOfSlides: listThemes && listThemes.length/4,
      }
    }
  ]

  const plugMobile = [...plug]
  plugMobile.splice(0, 1)

  if(listThemes.length === 0)
    return null

  return (
    <Center
      width="95vw"
      maxWidth="1364px"
    >
      <Carousel
        offset={isMobileMod ? 50 : 70}
        animationSpeed={1000}
        plugins={isMobileMod ? plugMobile : plug}
      >
        {listThemes && listThemes.map((elm) => (
          <Center
            onClick={() => searchTheme(elm)}
            key={elm.id}
            cursor="pointer"
            width={ isMobileMod ? "45px" : "100px" }
            minWidth={ isMobileMod ? "45px" : "100px" }
            height={ isMobileMod ? "45px" : "100px" }
            minHeight={ isMobileMod ? "45px" : "100px" }
            borderRadius={ isMobileMod ? "8px" : "16px" }
            backgroundColor={ selectedTheme === elm.name ? "#2B8C4D" : "FFF"}
            boxShadow="0px 1px 8px 1px rgba(64, 60, 67, 0.16)"
            _hover={{ transform:"scale(1.1)", backgroundColor:"#2B8C4D" }}
            transition="all 0.5s"
            margin="10px 0"
          >
            <Tooltip
              hasArrow
              bg="#2A2F38"
              label={elm.display_name}
              fontSize="16px"
              fontWeight="500"
              padding="5px 16px 6px"
              marginTop="10px"
              color="#FFF"
              borderRadius="6px"
            >
              <Image
                width="100%"
                padding={ isMobileMod ? "5px" : "10px"}
                height="100%"
                transition="all 0.5s"
                filter={selectedTheme === elm.name ? "invert(1)" :"invert(0.8)"}
                _hover={{ filter:"invert(1)"}}
                alt={`${elm.name}`}
                src={`https://basedosdados-static.s3.us-east-2.amazonaws.com/category_icons/2022/icone_${elm.name}.svg`}
              />
            </Tooltip>
          </Center>
        ))}
      </Carousel>
    </Center>
  )
}


function CardThemes ({ isMobileMod, recentThemes }) {

  return (
    <VStack
      width="90vw"
      minWidth="370px"
      maxWidth="1284px"
      alignItems="flex-start"
      padding="24px 0"
      margin="48px 0 !important"
      position="relative"
    >
      <Carousel
        offset={ isMobileMod ? 0 : 20}
        itemWidth={ isMobileMod ? "" : "290px"}
        animationSpeed={1000}
        plugins={ isMobileMod ?
          [
            "arrows", "centered"
          ] : [
            "arrows",
            {
              resolve: slidesToShowPlugin,
              options: {
                numberOfSlides: recentThemes && recentThemes.length
              }
            }
          ]
        }
      >
        {recentThemes && recentThemes.map((elm) => (
          <DatabaseCard
            link={`/dataset/${elm.name}`}
            name={elm.title}
            organization={elm.organization.title}
            organizationSlug={elm.organization.name}
            tags={elm.tags.map((g) => g.name)}
            size={
              elm.resources.filter((r) => r.bdm_file_size && r.bdm_file_size > 0)
                .length > 0
                ? elm.resources.filter((r) => r.bdm_file_size)[0].bdm_file_size
                : null
            }
            tableNum={
              elm.resources.filter((r) => r.resource_type === "bdm_table").length
            }
            externalLinkNum={
              elm.resources.filter((r) => r.resource_type === "external_link").length
            }
            informationRequestNum={
              elm.resources.filter((r) => r.resource_type === "information_request").length
            }
            updatedSince={elm.metadata_modified}
            categories={elm.groups.map((g) => [g.name, g.display_name])}
          />
        ))}
      </Carousel>
    </VStack>
  )
}

export default function ThemeCatalog ({ recentDatalakeDatasets, themes }) {
  const [recentThemes, setRecentThemes] = useState([])
  const [listThemes, setListThemes] = useState([])
  const isMobile = useCheckMobile()

  useEffect(() => {
    setListThemes(themes)
    recentDatalakeDatasets ? setRecentThemes(recentDatalakeDatasets) : setRecentThemes()
  },[recentDatalakeDatasets, themes])

  const newRecentDataLake = (elm) => {
    return getRecentDatalakeDatasetsByTheme(elm.name)
      .then(res => {
        setRecentThemes(res)
      })
  }
  return (
    <VStack
      width="100%"
      alignItems="center"
      gap="50px"
    >
       <Themes
         listThemes={listThemes}
         newRecentDataLakeDataSets={newRecentDataLake}
         isMobileMod={isMobile}
       />

      <CardThemes
        isMobileMod={isMobile}
        recentThemes={recentThemes}
      />
    </VStack>
  )
}