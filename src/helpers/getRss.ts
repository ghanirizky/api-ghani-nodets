import Parser from "rss-parser"
const parser = new Parser();

export const parseRssToJson = async(url: string)=> {
    const feed = await parser.parseURL(url);
    return feed
}