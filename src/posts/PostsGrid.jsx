import { useEffect, useState } from "react";
import { Flex, Divider, useBreakpointValue, Grid } from "@chakra-ui/react";
import { Pagination, PostCard } from "./";
import PropTypes from 'prop-types';
import { useGetPosts } from "@/hooks";

export const PostsGrid = ( props ) => {
    const { slug, locale, altLocale, queryFunction, parameter } = props;

    const gridColumnCount = useBreakpointValue({ base: 1, md: 1, lg: 2, xl: 3 });
    const responsiveLimit = useBreakpointValue ({ base: 1, md: 3, lg: 9, xl: 9 });
    const cardWidth = useBreakpointValue ({ base: "60%", md: "60%", lg: "50%", xl: "30%" });
    
    // Controlamos el offset para las peticiones (parametro Skip)
    const [ offset, setOffset ] = useState(0);

    // TODO: MEJORAR QUE AL CARGAR EL SITIO WEB EN DISTINTAS PANTALLAS UTILICÉ EL LIMIT CORRECTO
    const [ limit, setLimit ] = useState(9);

    // Utilizamos el hook personalizado
    const { memorizedPosts, totalPages } = useGetPosts(slug, locale, altLocale, queryFunction, limit, parameter, offset);

    useEffect(() => {
        setOffset(0);
    }, [ totalPages ])

    useEffect(() => {
        setLimit(responsiveLimit);
    }, [ responsiveLimit ])

    // Decrementamos el offset
    const decrementOffset = () => {
        if (offset > 0) {
            setOffset((current) => current - 1);
        }else if(offset === 0){
            setOffset(totalPages - 1);
        }
    };
    
    // Incrementamos el offset
    const incrementOffset = () => {
        if (offset < totalPages - 1) {
            setOffset((current) => current + 1);
        } else if(offset === totalPages - 1){
            setOffset(0);
        }
    };

    
    useEffect(() => {
        const handleResize = () => {
        const screenWidth = window.innerWidth;

        if (screenWidth >= 1024) {
            setLimit(9);
        } else if (screenWidth >= 768) {
            setLimit(3);
        } else {
            setLimit(1);
        }
        };

        handleResize(); // Llamada inicial
        window.addEventListener('resize', handleResize);

        return () => {
        window.removeEventListener('resize', handleResize);
        };
    }, []);
    
    // Se muestran los posts en forma de catalogo
    return (
        <Flex direction="column" justifyContent="flex-start">
            {/* Postcards */}
            <Grid 
                templateColumns={`repeat(${ gridColumnCount }, ${ cardWidth } )`} 
                padding="0"
                gap="5rem 1rem"
                alignItems="center"
                justifyContent="center"
            >
                {
                    memorizedPosts?.map(post => {
                        return(
                            <PostCard 
                                key={ post.slug }
                                { ...post }
                            />
                        )
                    })
                }
            </Grid>  
            
            {
                totalPages > 1 ? (
                    // Paginación
                    <Flex direction="row" gap="2rem" align="center" justify="center" height="10rem">
                        <Divider orientation='horizontal' variant="thick"/> 
                        <Pagination 
                            currentPage={ offset + 1 } 
                            totalPages={ totalPages }
                            incrementOffset = { incrementOffset }
                            decrementOffset = { decrementOffset }
                        />
                        <Divider orientation='horizontal' variant="thick"/> 
                    </Flex>
                ) : <></>
            } 
        </Flex>
    )
}

PostsGrid.propTypes = {
    slug: PropTypes.string,
    locale: PropTypes.string.isRequired, 
    altLocale: PropTypes.string.isRequired,
    queryFunction: PropTypes.func.isRequired
}