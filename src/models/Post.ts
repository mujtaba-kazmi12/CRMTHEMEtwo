import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    postId: {
        type: String,
        required: true,
        unique: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    blogContent: {
        detectedLanguage: String,
        title: String,
        metaDescription: String,
        metaTags: {
            title: String,
            description: String,
            keywords: String,
            author: String,
            viewport: String,
        },
        ogTags: {
            title: String,
            description: String,
            image: String,
            type: String,
            url: String,
        },
        content: String,
        images: [
            {
                description: String,
                altText: String,
                caption: String,
            },
        ],
        keyPoints: [String],
        faqs: [
            {
                question: String,
                answer: String,
            },
        ],
        wordCount: Number,
        targetKeyword: String,
        relatedKeywords: [String],
        summary: String, // Added from response2.md
        originalUrl: String, // Added from response2.md
        source: {
            name: String,
            url: String,
        }, // Added from response2.md
        publishedAt: Date, // Added from response2.md
        originalTitle: String, // Added from response2.md
        originalDescription: String, // Added from response2.md
        originalContent: String, // Added from response2.md
        gptProcessed: Boolean, // Added from response2.md
        processedAt: Date, // Added from response2.md
    },
    firebaseImages: [
        {
            url: String,
            title: String,
            alt: String,
            originalUrl: String,
        },
    ],
    videos: [
        {
            videoId: String,
            url: String,
            embedUrl: String,
            title: String,
            thumbnail: String,
            channelTitle: String,
        },
    ],
    socialMediaUrls: {
        instagram: [String],
        linkedin: [String],
        facebook: [String],
        twitter: [String],
        threads: [String],
    },
    categoryId: {
        type: String,
        required: true,
    },
    categorySlug: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    postType: String,
    newsMetadata: {
        originalUrl: String,
        scrapedAt: Date,
        fullContentAvailable: Boolean,
        scrapeError: String,
        gptError: String,
    },
}, { collection: 'Posts' });

export default mongoose.models.Post || mongoose.model("Post", PostSchema);
