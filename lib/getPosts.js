import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import markedNote from "marked-note-extension";
import hljs from "highlight.js";

const postsDirectory = path.join(process.cwd(), "posts");

// get all posts' id; sorted by date
function getAllPostInfo() {
  const fns = fs.readdirSync(postsDirectory);
  const allPostsIds = [];
  fns.forEach(fn => {
    const id = fn.replace(/\.md$/, "");
    const filefullpath = path.join(postsDirectory, fn);
    const file = fs.readFileSync(filefullpath, "utf8");
    const front = matter(file).data;
    allPostsIds.push({
      id, ...front
    })
  });
  allPostsIds.sort(({ date: a }, { date: b }) => {
    if (a < b) return 1;
    else if (a > b) return -1;
    else return 0;
  });
  return allPostsIds;
}

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
  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) return 1;
    else if (a > b) return -1;
    else return 0;
  });
}
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, "")
      },
    };
  });
}
export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(fileContents);

  // markdwon to html options
  marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: function (code, lang) {
      const language = hljs.getLanguage(lang) ? lang : "plaintext";
      return hljs.highlight(code, { language }).value;
    },
    langPrefix: "hljs language-", // highlight.js css expects a top-level 'hljs' class.
    pedantic: false,
    gfm: true,
    breaks: true,
    headerIds: true,
    headerPrefix: "",
    sanitize: false,
    smartypants: false,
    xhtml: false,
  });

  const renderer = {
    link: function (href, title, text) {
      if (title) {
        return `<a href="${href}" target="_blank" title="${title}">${text}</a>`;
      }
      return `<a href="${href}" target="_blank">${text}</a>`;
    },
  };
  marked.use({ renderer });
  marked.use(markedNote);

  const content = marked.parse(matterResult.content);
  let next = {}, pre = {};
  const allPostsIds = getAllPostInfo();
  for(let i = 0;i<allPostsIds.length;i++) {
    if(allPostsIds[i].id === id) {
      if(i < allPostsIds.length-1) {
        pre = allPostsIds[i+1];
      }
      if(i > 0) {
        next = allPostsIds[i-1];
      }
    }
  }

  return {
    id,
    contentHtml: content,
    ...matterResult.data,
    pre,
    next
  };
}

export function getTagData() {
  const filenames = fs.readdirSync(postsDirectory);
  const map = new Map();
  for (const filename of filenames) {
    const fullpath = path.join(postsDirectory, filename);
    const file = fs.readFileSync(fullpath, "utf8");

    const front = matter(file).data;
    if (typeof front.tags === "string") {
      map.set(front.tags, (map.get(front.tags) || 0) + 1);
    } else {
      for (const tag of front.tags) {
        map.set(tag, (map.get(tag) || 0) + 1);
      }
    }
  }
  const tags = [];
  for (const [key, val] of map) {
    tags.push([key, val]);
  }
  return {
    tags,
  };
}

export function getTagsIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  const tags = new Set();
  for (const filename of fileNames) {
    const fullpath = path.join(postsDirectory, filename);
    const file = fs.readFileSync(fullpath, "utf8");
    const front = matter(file).data;

    if (typeof front.tags === "string") {
      tags.add(front.tags);
    } else {
      for (const tag of front.tags) {
        tags.add(tag);
      }
    }
  }
  const ans = [...tags];
  return ans.map((tag) => {
    return {
      params: {
        tag: tag,
      },
    };
  });
}

export function getTagPost(id) {
  const posts = [],
    ids = new Set();
  const fileNames = fs.readdirSync(postsDirectory);
  for (const filename of fileNames) {
    const name = filename.replace(/\.md$/, "");
    const fullpath = path.join(postsDirectory, filename);
    const file = fs.readFileSync(fullpath, "utf8");
    const front = matter(file).data;

    if (typeof front.tags === "string") {
      if (id === front.tags) {
        posts.push(front);
        ids.add(name);
      }
    } else {
      for (const tag of front.tags) {
        if (id === tag) {
          posts.push(front);
          ids.add(name);
        }
      }
    }
  }
  return {
    id,
    posts,
    paths: [...ids],
  };
}
