import mongoose, { Schema, model, models } from 'mongoose';

const CategorySEOSchema = new Schema({
    categoryId: String,
    categorySlug: String,
    title: String,
    keywords: String,
    description: String,
    authors: String,
}, { _id: false });

const SEOSchema = new Schema(
    {
        metaTitle: {
            type: String,
            default: '',
        },
        metaDescription: {
            type: String,
            default: '',
        },
        metaKeywords: {
            type: String,
            default: '',
        },
        ogTitle: {
            type: String,
            default: '',
        },
        ogDescription: {
            type: String,
            default: '',
        },
        ogImageUrl: {
            type: String,
            default: '',
        },
        twitterCardType: {
            type: String,
            default: 'summary_large_image',
        },
        twitterTitle: {
            type: String,
            default: '',
        },
        twitterDescription: {
            type: String,
            default: '',
        },
        twitterImageUrl: {
            type: String,
            default: '',
        },
        canonicalURL: {
            type: String,
            default: '',
        },
        robotsDirective: {
            type: String,
            default: 'index, follow',
        },
        footerContent: {
            type: String,
            default: '',
        },
        categories: [CategorySEOSchema],
    },
    {
        timestamps: true,
        collection: 'SEO',
    }
);

const SEO = models.SEO || model('SEO', SEOSchema);

export default SEO;
