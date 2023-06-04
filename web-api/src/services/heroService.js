
import fsPromises from "node:fs/promises";
export default class HeroService {
    constructor ({ heroRepository }) {
        this.heroRepository = heroRepository
    }
    // this is where your business logic or changes in data should be done
    find() {
        return this.heroRepository.find();
    }

    create(data) {
        return this.heroRepository.create(data);
    }

    async update(data) {
        console.log((data.id));
        const allData = await this.heroRepository.find();
        const updateData = allData.findIndex((all) => all.id === data.id);
        allData[updateData] = data;
        console.log(allData);
        return this.heroRepository.update(allData);
    }

    async delete(id) {
        console.log((id));
        const allData = await this.heroRepository.find();
        const dataIndex = allData.findIndex((all) => all.id === id);
        const itemToBeDelete = allData[dataIndex];
        allData.splice(dataIndex, 1);
        console.log(allData);
        console.log('allData', allData);
        this.heroRepository.update(allData)
        return itemToBeDelete;
    }
} 