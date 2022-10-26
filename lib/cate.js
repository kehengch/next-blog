import path from "path";
import fs from "fs";
import matter from "gray-matter";

const filesDirectory = path.join(process.cwd(), "posts");
const filenames = fs.readdirSync(filesDirectory);

export function getCategory() {
  const map = {};
  filenames.forEach((filename) => {
    const file = fs.readFileSync(path.join(filesDirectory, filename), "utf8");

    const data = matter(file).data;
    const id = filename.replace(/\.md$/, "");

    if (typeof data.categories === "string") {
      if (map[data.categories]) {
        map[data.categories].id.push(id);
      } else {
        map[data.categories] = {};
        map[data.categories].id = [id];
      }
    } else {
      let t = map,
        pre;
      for (const cate of data.categories) {
        if (!t[cate]) {
          t[cate] = {};
          t[cate].id = [];
        }
        if (!t[cate].children) {
          t[cate].children = {};
        }
        pre = t[cate];
        t = t[cate].children;
      }
      pre.id.push(id);
    }
  });
  return {
    categories: map,
  };
}

export function getCateIds() {
  const set = new Set();
  filenames.forEach((filename) => {
    const file = fs.readFileSync(path.join(filesDirectory, filename), "utf8");
    const data = matter(file).data;
    if (typeof data.categories === "string") {
      set.add(data.categories);
    } else {
      for (const cate of data.categories) {
        set.add(cate);
      }
    }
  });

  const ans = [...set];
  return ans.map((categories) => {
    return {
      params: {
        categories,
      },
    };
  });
}

export function getCatePost(id) {
  const posts = [];
  filenames.forEach((filename) => {
    const file = fs.readFileSync(path.join(filesDirectory, filename), "utf8");
    const name = filename.replace(/\.md$/, "");
    const data = matter(file).data;
    if (typeof data.categories === "string") {
      if (data.categories === id) {
        data.id = name;
        posts.push(data);
      }
    } else {
      for (const cate of data.categories) {
        if (cate === id) {
          data.id = name;
          posts.push(data);
        }
      }
    }
  });
  return {
    categories: id,
    posts,
  };
}
