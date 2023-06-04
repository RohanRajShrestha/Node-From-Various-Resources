import { once } from "node:events"; // this helps us to fetch the data 
import Hero from "../entities/hero.js";
import { DEFAULT_HEADER, getPostData } from "../util/util.js";

const routes = ({
    heroService // why call heroService, handler communicates with routes and routes communicate with the services
}) => ({
    '/heroes : get' : async (req, res) => {
        const heros = await heroService.find();
        console.log(heros);
        res.write(JSON.stringify(heros));
        res.end();
    },
    '/heroes : post' : async (req, res) => {
        const data = await once(req, 'data');
        console.log(data);
        const item = JSON.parse(data);
        const hero = new Hero(item); 
        // const id_data  = hero.id;

        const id = await heroService.create(hero);
        res.writeHead(201, DEFAULT_HEADER);
        res.write(JSON.stringify({
            id,
            success : "User Created Successfully"
        }));
        res.end();
    }, 
    '/heroes : put' : async (req, res) => {
        const data = await getPostData(req, 'data');
        const hero = new Hero(data);
        if (!data.id) {
            res.writeHead(404, 'Date Not Found. ID missing');
            res.write(JSON.stringify({
                data : updatedData,
                success : "User Update Failed"
            }));
            res.end();
        } else {
            hero.id = data.id
            const updatedData =  await heroService.update(hero);
            res.writeHead(201, DEFAULT_HEADER);
            res.write(JSON.stringify({
                data : updatedData,
                success : "User Updated Successfully"
            }));
            res.end();
        }
        
    }, 
    '/heroes : delete' : async (req, res) => {
        console.log('delete');
        const id = await getPostData(req, 'data');

        if (!id) {
            res.writeHead(404, 'Date Not Found. ID missing');
            res.write(JSON.stringify({
                data : updatedData,
                success : "User Update Failed"
            }));
            res.end();
        } else {
            const deletedData =  await heroService.delete(id);
            res.writeHead(201, DEFAULT_HEADER);
            res.write(JSON.stringify({
                data : deletedData,
                success : "User Deleted Successfully"
            }));
            res.end();
        }
        
    }
})

export {
    routes
}