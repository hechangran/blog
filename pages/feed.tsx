import { GetServerSideProps } from 'next'
import { FC } from 'react'
import * as config from 'lib/config'
import { Feed } from 'feed'
import axios from 'axios'

const domain = `https://${config.domain}`
 
 
const generateRss = (posts: Post[]) => {
    const year = new Date().getFullYear()
    const feed = new Feed({
        id: domain,
        link: domain,
        title: "Log",
        description: "Log's RSS",
        copyright: `All rights reserved ${year}, OPT1MUM`,
        image: `${domain}/favicon.png`,
        favicon: `${domain}/favicon.ico`,
        author: {
            name: 'OPT1MUM',
            link: 'https://crhe.vercel.app'
        }
    })

    posts.forEach(post => {
        if (post.Published) {
            feed.addItem({
                title: post.Name,
                link: `${domain}/${post.id}`,
                description: post.Description,
                date: new Date(post.Published)
            })
        }
    })

    return feed.rss2()
}

interface Post {
    id: string
    Name: string
    Tags: string
    Published: string
    Description: string
}

const getAllPosts = async (): Promise<Post[]> => {
    return await axios.get(`https://notion-api.splitbee.io/v1/table/${config.rootNotionPageId}`).then(res => res.data)
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
    if (res) {
        const posts = await getAllPosts()
        const xmlFeed = generateRss(posts)

        res.setHeader('Content-Type', 'text/xml')
        res.write(xmlFeed)
        res.end()
    }

    return {
        props: {}
    }
}

const FeedView: FC = () => null

export default FeedView