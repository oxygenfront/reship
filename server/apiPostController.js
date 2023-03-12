import tools from "./tools.js"
import database from './database.js'

class ApiPostController {
    async getProducts(request, response) {
        if (!tools.checkJsonKey(request.body, 'category')) {
            return response.status(400).json({'error': 'Некорректные данные.', 'bcode': 1})
        }

        let category = tools.delInjection(request.body.category)

        database.query('SELECT * FROM `products` WHERE category="' + category + '"', (error, rows, fields) => {
            if (error) {
                return response.status(500).json({'error': 'Ошибка на сервере', 'bcode': 2})
            }
    
            let response_json_new = [];

            for (let i = 0; i < rows.length; i++) {
                console.log(rows[i])
                let response_json = rows[i];

                response_json.colors = JSON.parse(response_json.colors)
                response_json.colors_avail = JSON.parse(response_json.colors_avail)
                response_json.parameters = JSON.parse(response_json.parameters)
                response_json.parameters_avail = JSON.parse(response_json.parameters_avail)

                response_json_new.push(response_json);
            }

            

            response.json(response_json_new)
        })
    }
}

export default new ApiPostController;