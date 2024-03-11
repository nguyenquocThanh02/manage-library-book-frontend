import createApiClient from './api.service';

class OrderService {
    constructor(baseUrl = "/api/orders"){
        this.api = createApiClient(baseUrl);
    }

    async getAllOrders(){
        return (await this.api.get("/")).data;
    }

    async getBorrowById(id){
        const result = (await this.api.get(`/detail/${id}`)).data;
        return result;
    }


    async getOrderOfUser(email){
        return (await this.api.get(`/${email}`)).data;
    }

    async create(data){
        return (await this.api.post("/", data)).data;
    }

    async deleteAll(){
        return (await this.api.delete("/")).data;
    }
    
    

    async update(id, data){
        return (await this.api.put(`/${id}`, data)).data;
    }

    async delete(id){
        return (await this.api.delete(`/${id}`)).data;
    }

}

export default new OrderService();