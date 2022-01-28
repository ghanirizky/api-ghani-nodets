import Parser from "rss-parser"
const parser = new Parser();

export const parseRssToJson: any = async(url: string) => {
    const feed = await parser.parseURL(url);
    console.log(feed)
    return feed
}