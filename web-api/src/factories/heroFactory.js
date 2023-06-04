import HeroRepository from "../repositories/heroRepository.js"
import HeroService from "../services/heroService.js";

const generateInstance = ({ filePath }) => {
    // here db connection should be places
    console.log('--------inside generate Instance');
    const heroRepository = new HeroRepository({file : filePath});
    console.log(heroRepository);

    // required to have heroRepository inside {}
    const heroService = new HeroService({heroRepository});
    console.log(heroService);
    return heroService
}

export {
    generateInstance
}
