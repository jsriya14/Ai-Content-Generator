export default [
    {
        name: "Blog Title",
        desc: "an AI tool to generate blog titile depends on your blog information",
        category: 'Blog',
        icon: 'https://cdn-icons-png.flaticon.com/128/4654/4654493.png',
        aiPrompt: 'Give me 5 blog topic ideas in bullet wise only based on given topic niche and outline ',
        slug: 'generate-blog-title',
        form: [
            {
                label: 'Enter yout blog niche',
                field: 'input',
                name: 'niche',
                required: true
            },
            {
                label: 'Enter blog outline',
                field: 'textarea',
                name: 'outline',
            }
        ]
    },
    {
        name: "Blog Content",
        desc: "an AI tool that serves as your personal blog content generator",
        category: 'Blog',
        icon: 'https://cdn-icons-png.flaticon.com/128/2593/2593549.png',
        aiPrompt: 'Give blog content based on given topic niche and outline',
        slug: 'blog-content-generation',
        form: [
            {
                label: 'Enter yout blog topic',
                field: 'input',
                name: 'topic',
                required: true
            },
            {
                label: 'Enter blog outline here',
                field: 'textarea',
                name: 'outline',
            }
        ]
    },

    {
        name: "Blog Topic Ideas",
        desc: "an AI tool that serves as your personal blog post title generator",
        category: 'Blog',
        icon: 'https://cdn-icons-png.flaticon.com/128/9079/9079294.png',
        aiPrompt: 'Generate top 5 blog topic ideas in bullet points wise only based on given topic niche and outline ',
        slug: 'blog-topic-idea',
        form: [
            {
                label: 'Enter your Niche',
                field: 'input',
                name: 'niche',
                required: true
            },
            // {
            //     label:'Enter blog outline here',
            //     field:'textarea',
            //     name:'outline',
            // }
        ]
    },

    {
        name: "Youtube SEO Title",
        desc: "an AI tool that serves as your personal youtube SEO title generator",
        category: 'Youtube Tools',
        icon: 'https://cdn-icons-png.flaticon.com/128/400/400426.png',
        aiPrompt: 'Give me Best SEO optimized high ranked 5 title ideas in bullet wise only based on given topic niche and outline ',
        slug: 'youtube-seo-title',
        form: [
            {
                label: 'Enter your youtube video topic keywords',
                field: 'input',
                name: 'keywords',
                required: true
            },
            {
                label: 'Enter youtube description outline here',
                field: 'textarea',
                name: 'outline',
            }
        ]
    },
    {
        name: "Youtube Description",
        desc: "an AI tool that serves as your youtube description provider",
        category: 'Youtube Tool',
        icon: 'https://cdn-icons-png.flaticon.com/128/2274/2274336.png',
        aiPrompt: 'generate youtube description with emoji, breif on given topic niche and outline',
        slug: 'Youtube-description',
        form: [
            {
                label: 'Enter yout blog topic/title',
                field: 'input',
                name: 'topic',
                required: true
            },
            {
                label: 'Enter youtube outline here',
                field: 'textarea',
                name: 'outline',
            }
        ]
    },
    {
        name: "Youtube Tags",
        desc: "An AI tool that serves as your personal blog post title related tags generator",
        category: 'Youtube Tool',
        icon: 'https://cdn-icons-png.flaticon.com/128/16183/16183555.png',
        aiPrompt: 'generate 10 youtube tags in bullet points based on given topic niche and outline ',
        slug: 'youtube-tag',
        form: [
            {
                label: 'Enter your youtube title',
                field: 'input',
                name: 'title',
                required: true
            },
            {
                label: 'Enter youtube video outline here (optional)',
                field: 'textarea',
                name: 'outline',
            }
        ]
    }
    , {
        name: "Rewrite Article ",
        desc: "use this tool to rewrite existing article or blog post",
        category: 'Rewriting Tool',
        icon: 'https://cdn-icons-png.flaticon.com/128/2704/2704034.png',
        aiPrompt: 'generate 100% plagiarism free article based on given article text',
        slug: 'rewrite-article',
        form: [
            {
                label: 'provide your Article /Blog post or any other information',
                field: 'textarea',
                name: 'article',
                required: true
            },

        ]
    },
    {
        name: "Add Emojis to Text",
        desc: "an AI that serves as your personal blog post tile emoji generator depends on your blog information",
        category: 'blog',
        icon: 'https://cdn-icons-png.flaticon.com/128/7505/7505512.png',
        aiPrompt: 'add emoji to outline text depends on outline give me result ',
        slug: 'add-emoji-to-text',
        form: [
            {
                label: 'Enter your text to add emojis',
                field: 'textarea',
                name: 'outline',
                required: true
            },

        ]
    },
    {
        name: "instagram post generator",
        desc: "an AI that serves as your personal post generator depends on your blog information",
        category: 'blog',
        icon: 'https://cdn-icons-png.flaticon.com/128/4923/4923005.png',
        aiPrompt: 'please make an image of a given keywords.',
        slug: 'instagram-post-generator',
        form: [
            {
                label: 'Enter keywords for your post',
                field: 'input',
                name: 'keywords',
                required: true
            },

        ]
    },
    {
        name: "Code Generator",
        desc: "an AI that serves as your personal code generator depends on your problem",
        category: 'code',
        icon: 'https://cdn-icons-png.flaticon.com/128/10817/10817310.png',
        aiPrompt: 'under the consideration of keywords generate the code for the problem and give the desired output examples',
        slug: 'Code-generator',
        form: [
            {
                label: 'Enter keywords for problem',
                field: 'input',
                name: 'keywords',
                required: true
            },

        ]
    }

]