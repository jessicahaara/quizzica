import StoryblokClient from "storyblok-js-client"

const StoryBlok = new StoryblokClient({
    accessToken: "rBtbIAsJqb7i2uoCWwNLegtt",
    cache: {
        clear: "auto",
        type: "memory"
    }
})

export default StoryBlok