import Link from "next/link";
import PropTypes from 'prop-types';
import { Avatar, Tag, TagLabel } from "@chakra-ui/react";

export const AuthorTag = ( props ) => {
    const { author, locale } = props;
    return (
        <Link href={`/blog/author/${ author.slug }`} locale={ locale } >
            <Tag size='lg' color="brand.primary" backgroundColor="brand.gray" fontWeight="bold" borderRadius='full' width="10rem" >
                <Avatar
                    src={ author.photo.url }
                    size='xs'
                    name= { author.fullName }
                    ml={-1}
                    mr={2}
                    alt= {`${ author.fullName } avatar`}
                />
                <TagLabel>{ author.fullName } </TagLabel>
            </Tag>
        </Link>
    )
}

AuthorTag.propTypes = {
    author: PropTypes.object.isRequired,
    locale: PropTypes.string 
}