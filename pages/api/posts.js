import fs from "fs";
import path from "path";
import matter from "gray-matter";

function getPosts() {
    const dirpath = path.join(process.cwd(), "posts");
    const filenames = fs.readdirSync(dirpath);
    return filenames.map((filename) => {
        const id = filename.replace(/\.md$/, "");
        const file = fs.readFileSync(
            path.join(dirpath, filename),
            "utf8"
        )
        const front = matter(file).data;
        return {
            id,
            ...front
        };
    });
}

export default function handler(req, res) {
  if (req.method == "GET") {
    res.status(200).json(getPosts());
  }
}
