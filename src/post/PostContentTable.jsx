import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import { Divider, Flex, Icon, Text } from "@chakra-ui/react";
import { AiFillCaretRight } from 'react-icons/ai'

export const PostContentTable = ( props ) => {
    const { body: { json: { content }}, locale } = props;
    const headers = content.filter(content => content.nodeType === 'heading-2');

    // Traducir el label de la tabla de contenidos
    const { t } = useTranslation('common')
    const contentLabel = t('content');

    // En vez de modificar la URL se hace un scroll al header
    const scrollToHeader = (headerId) => {
        const targetElement = document.getElementById(headerId);

        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    };
    
    return (
        <Flex  gridArea="postContentTable" direction="column" gap="2rem" padding="2rem">
            
            <Flex direction="row" align="center" fontSize="lg" gap=".5rem">
                <Icon as={ AiFillCaretRight } boxSize={"1.5rem"} color="brand.secondary"/>
                { contentLabel }
            </Flex>

            {/* Mostramos todo el contenido HTML con etiqueta H2 */}
            { 
                headers.map((header) => {
                    // Realizamos la búsqueda por el ID establecido en <PostBody />
                    const headerId = header.content[0].value.replace(/\s+/g, '-').toLowerCase();
                    
                    return (
                        <Flex direction="column" gap="1rem" key={ headerId } width="70%">
                            <Text onClick={() => scrollToHeader(headerId)} cursor="pointer">
                                { header.content[0].value }
                            </Text>
                            <Divider orientation='horizontal' variant="thick"/>
                        </Flex>
                    )
                }
            )}

        </Flex>
        
    )
}
