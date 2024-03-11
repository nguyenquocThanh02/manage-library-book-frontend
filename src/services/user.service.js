import createApiClient from './api.service';

class UserService {
    constructor(baseUrl = "/api/users"){
        this.api = createApiClient(baseUrl);
    }

    async signIn(data){
        return (await this.api.post("/", data)).data;
    }
    async logIn(data){
        return (await this.api.post("/login", data)).data;
    }

    // async deleteAll(){
    //     return (await this.api.delete("/")).data;
    // }
    
    async getUser(email){
        return (await this.api.get(`/${email}`)).data;
    }

    async update(id, data){
        return (await this.api.put(`/${id}`, data)).data;
    }

    async delete(id){
        return (await this.api.delete(`/${id}`)).data;
    }

}

export default new UserService();