import path from 'path'
import fs from "fs"
import matter from 'gray-matter';

const postsdir = path.join(process.cwd(), '/posts/');
const filesnames = fs.readdirSync(postsdir);

export function getDateSortedpostsData() {
    let posts_num = filesnames.length,
        posts = {};
    filesnames.forEach(filename => {
        const id = filename.replace(/\.md$/, '');
        const file = fs.readFileSync(
            path.join(postsdir, filename),
            'utf8'
        );
        const front = matter(file).data;
        front.id = id;
        const year = front.date.substring(0, 4);
        if(posts[year]) {
            posts[year].push(front)
        } else {
            posts[year] = [front]
        }
    })
    // 排序
    for(let post in posts) {
        const list = posts[post];
        list.sort(({date: a}, {date: b}) => {
            if(a > b) {
                return -1;
            } else if(a < b) {
                return 1;
            } else {
                return 0;
            }
        })
    }
    let ans = [];
    for(let post in posts) {
        ans.push({
            year: post,
            data: posts[post]
        });
    }
    ans.sort(({year: a}, {year: b}) => b-a)
    return {
        nums: posts_num,
        posts: ans
    }
}




