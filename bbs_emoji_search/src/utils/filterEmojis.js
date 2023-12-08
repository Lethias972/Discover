import emojis from "@/data/emojis.json"

export default function filterEmojis(textSearch, maxResults) {
    return emojis.filter((emoji) => {
        if(emoji.description.toLowerCase().includes(textSearch.toLowerCase())) {
            return true
        }
        if(emoji.aliases.includes(textSearch.toLowerCase().replace(" ", "_"))) {
            return true
        }
        return false
    }).slice(0, maxResults)
}