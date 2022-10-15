import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from 'marked'
import hljs from 'highlight.js';

const postsDirectory = path.join(process.cwd(), "posts");

export function getSortedPosts() {
  const filesnames = fs.readdirSync(postsDirectory);
  const allPostsData = filesnames.map((filename) => {
    const id = filename.replace(/\.md$/, "");

    const filefullpath = path.join(postsDirectory, filename);
    const file = fs.readFileSync(filefullpath, "utf8");
    const front = matter(file);
    return {
      id,
      ...front.data,
    };
  });
  return allPostsData;
}
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(fileContents);

    // markdwon to html options
    marked.options({
        renderer: new marked.Renderer(),
        highlight: function(code, lang) {
            const language = hljs.getLanguage(lang) ? lang : 'plaintext';
            return hljs.highlight(code, { language }).value;
        },
        langPrefix: 'hljs language-', // highlight.js css expects a top-level 'hljs' class.
        pedantic: false,
        gfm: true,
        breaks: true,
        headerIds: true,
        headerPrefix: "posts-",
        sanitize: false,
        smartypants: false,
        xhtml: false,
    });

    const renderer = {
        link: function(href, title, text) {
            if(title) {
                return `<a href="${href}" target="_blank" title="${title}">${text}</a>`
            }
            return `<a href="${href}" target="_blank">${text}</a>`
        }
    }
    marked.setOptions = marked.options;
    marked.use({renderer})

    const content = marked(matterResult.content)

  return {
    id,
    "contentHtml": content,
    ...matterResult.data,
  };
}
