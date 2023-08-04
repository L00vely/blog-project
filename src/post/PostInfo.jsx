import { GridItem, Heading, Flex, Text, Divider, Box } from '@chakra-ui/react';
import { CategoryItem } from '@/categories';
import { dateFormat } from '@/helpers';
import { AuthorTag } from '@/ui';
import { ShareMenu } from '.';
import Image from 'next/image';

export const PostInfo = (props) => {
    const { title, slug, author, readingTime, featuredImage, creationDate, category, thumbnail, locale } = props;


    return (
        <GridItem area={ "postInfo"} display={"flex"} alignItems={"center"} justifyContent="center" flexDirection={"row"} gap={"2rem"}  padding={"2rem"} >
            <Flex direction={"column"} gap={"2rem"} width={"50%"}>
                <Heading as='h1' fontSize={"4xl"}>
                    { title }
                </Heading>
                
                <Flex direction="row" gap="2rem" fontSize={"md"} align={"center"} color={"brand.gray"}>
                    <AuthorTag author={ ...author } locale={ locale} />

                    <Text>
                        { dateFormat(creationDate) }
                    </Text>

                    <Text >
                        {readingTime} min 
                    </Text>
                </Flex>

                <Box backgroundColor={"brand.secondary"} width={"fit-content"} padding={".5rem 1rem"} borderRadius={"1rem"} fontSize={"md"}>
                    <CategoryItem { ...category }/>
                </Box>
                

                <Divider orientation='horizontal' variant="thick"/>

                <ShareMenu 
                    postSlug={ slug }
                    thumbnail={ thumbnail }
                />
            </Flex>

          
            {/* Imagen del post */}
            <Box width="30rem" position={"relative"} height={"100%"}>
                <Image
                    src={ featuredImage.url }
                    alt={ featuredImage.title }
                    layout="fill"
                    objectFit="cover"
                    blurDataURL={ featuredImage.url }
                    placeholder = 'blur'  
                />
            </Box>
        </GridItem>
    )
}
