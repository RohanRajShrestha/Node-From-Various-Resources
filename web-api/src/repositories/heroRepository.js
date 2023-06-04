
import fsPromises from "node:fs/promises";
export default class HeroRepository {
    constructor ( {file} ) {
        this.file = file
    }
    // creating private function
    async #currentFileContent() {
        return JSON.parse(await fsPromises.readFile(this.file, 'utf-8'));
    }

    find() {
        return this.#currentFileContent();
    }

    async create(data) {
        const currentFile = await this.#currentFileContent();
        currentFile.push(data);

        await fsPromises.writeFile(
            this.file,
            JSON.stringify(currentFile)
        )
        console.log('--------repso');
        console.log(data.id);
        return data.id;
    }
    async update(data) {
        await fsPromises.writeFile(
            this.file,
            JSON.stringify(data)
        )
        console.log('--------repso');
        console.log(data);
        return data;
    }
}

// const heroRepository = new HeroRepository({
//     file : 'src/database/data.json'
// });

// console.log(
//     await heroRepository.create({
//         id: 2,
//         name: 'Chapolin'
//     })
// )
// console.log( await heroRepository.find());