import {
    createClient
} from 'next-sanity'
import createImageUrlBuilder from '@sanity/image-url'
import { suspend } from 'suspend-react';
import { _checkAuth } from '@sanity/preview-kit';

export const config = {
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    apiVersion: "2021-03-25",
    useCdn: process.env.NODE_ENV === "production"
}

// Creating a sanity client to make query to the sanity server
export const sanityClient = createClient(config);

// for getting the images from the sanity client
const builder = createImageUrlBuilder(sanityClient)
export const urlFor = (source) => builder.image(source)

// getting the current logged in user
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
export const useCheckAuth = () => suspend(() => _checkAuth(projectId, null), ['@sanity/preview-kit', 'checkAuth', projectId])
