import { useEffect } from "react"
import { Flex, Icon, Text } from "@chakra-ui/react"
import { Link } from '@chakra-ui/react'
import { LiaLinkedin, LiaTwitterSquare, LiaFacebookSquare } from "react-icons/lia"
import { BiLink } from "react-icons/bi"

export const ShareMenu = (props) => {
    const { postSlug, thumbnail } = props;


    return (
        <Flex direction={"row"} alignItems={"center"} gap={"1.5rem"} color={"brand.gray"} > 
            <Text>
                ¡Comparte!
            </Text>

            <Link href={`https://www.linkedin.com/sharing/share-offsite/?url=https://blog-project-rho-ten.vercel.app/blog/${ postSlug }`}  isExternal>
                <Icon as={ LiaLinkedin } boxSize={"2rem"}/> 
            </Link>
            
            <Link href={`https://www.linkedin.com/sharing/share-offsite/?url=https://blog-project-rho-ten.vercel.app/blog/${ postSlug }`}  isExternal>
                <Icon as={ LiaTwitterSquare } boxSize={"2rem"}/> 
            </Link>

            <Link href={`https://www.linkedin.com/sharing/share-offsite/?url=https://blog-project-rho-ten.vercel.app/blog/${ postSlug }`}  isExternal>
                <Icon as={ LiaFacebookSquare } boxSize={"2rem"}/> 
            </Link>

            <Link href={`https://www.linkedin.com/sharing/share-offsite/?url=https://blog-project-rho-ten.vercel.app/blog/${ postSlug }`}  isExternal>
                <Icon as={ BiLink } boxSize={"2rem"}/> 
            </Link>
            
        </Flex>
    )
}