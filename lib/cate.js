import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';

const filesDirectory = path.join(process.cwd(), 'posts');
const filenames = fs.readdirSync(filesDirectory);

export function getDateCategory() {
    // const map = new Map();
    const allPostCategories = filenames.map(filename => {
        const file = fs.readFileSync(
            path.join(filesDirectory, filename),
            'utf8'
        );
        const data = matter(file).data;

        // if(typeof data.categories === 'string') {
        //     map.set()
        // }

        return {
            ...data
        }
    })
    return allPostCategories;
}

