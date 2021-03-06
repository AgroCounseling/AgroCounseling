import axios from "axios";


const http = axios.create({
    baseURL: `https://agronomy-online.kg/`
});
const http_g = axios.create({
    baseURL: `https://agronomy-online.kg/`
})

const getToken = () => {
    let data = JSON.parse(localStorage.getItem('userData') as string)
    return data.access_token
}
const getRefreshToken = () => {
    let data = JSON.parse(localStorage.getItem('userData') as string)
    return data.refresh_token
}
const getTokenType = () => {
    let data = JSON.parse(localStorage.getItem('userData') as string)
    return data.google;
}

const getLng = () => {
    let lng = localStorage.getItem('i18nextLng')
    return lng === 'ru-RU' ? 'ru' : lng
}


export default {
    signIn: (data: any) => http.post(`${getLng()}/api/token/`, data),
    googleAuth: (data: any) => http_g.post(`ru/auth/convert-token`, data),
    googleRefresh: (data: any) => http_g.post(`${getLng()}/auth/token`, data),
    signInWithRefresh: () => http.post(`${getLng()}/api/token/refresh/`, {
        "refresh": getRefreshToken()
    }),
    signUpClient: (data: any) => http.post(`${getLng()}/api/signup/client`, data),
    signUpConsultant: (data: any) => http.post(`${getLng()}/api/signup/consultant`, data, {
        headers: {
            "Content-Type": "application/json"
        }
    }),
    getProfile: () => http.get(`${getLng()}/api/profile/`, {
        headers: {
            "Authorization": getTokenType() ? "Bearer " + getToken() : "JWT " + getToken()
        }
    }),
    getRooms: (id?:number) => http.get(`${getLng()}/api/rooms/${id ? id : ''}`, {
        headers: {
            "Authorization": getTokenType() ? "Bearer " + getToken() : "JWT " + getToken()
        }
    }),
    sendMessage: (email:string, data:any) => http.post(`${getLng()}/api/messages/${email}`, data, {
        headers: {
            "Authorization": getTokenType() ? "Bearer " + getToken() : "JWT " + getToken()
        }
    }),
    setProfile: (name: string, data: any) => http.put(`${getLng()}/api/profile/edit/${name}/`, data, {
        headers: {
            "Authorization": getTokenType() ? "Bearer " + getToken() : "JWT " + getToken()
        }
    }),
    setSpeciality: (name: string, data: any) => http.put(`${getLng()}/api/specialty/edit/${name}/`, data, {
        headers: {
            "Authorization": getTokenType() ? "Bearer " + getToken() : "JWT " + getToken()
        }
    }),
    getSpeciality: (name: string) => http.get(`${getLng()}/api/specialty/edit/${name}`, {
        headers: {
            "Authorization": getTokenType() ? "Bearer " + getToken() : "JWT " + getToken()
        }
    }),
    getConsultants: (id: string | number, page: number | string = 1) => http.get(`${getLng()}/api/specialty/${id}/consultants/?page=${page}`),
    getCategory: () => http.get(`${getLng()}/api/categories/`),
    getSubCategory: () => http.get(`${getLng()}/api/subcategories/`),
    getSpecialty: () => http.get(`${getLng()}/api/specialty/`),
    getConsultantId: (id:number) => http.get(`api/consultant/user/${id}/`),
    getConsultantsList: (page: number = 1) => http.get(`${getLng()}/api/consultants/?page=${page}`),
    getForums: (page: number | string, text?: string, filter?: any) => http.get(`${getLng()}/api/forums/?category=${filter ? filter.value : ''}&page=${page}&search=${text ? text : ''}`),
    getQuestion: (id: number | string) => http.get(`${getLng()}/api/forums/${id}`),
    createQuestion: (data: any) => http.post(`${getLng()}/api/forums/create`, data, {
        headers: {
            "Authorization": getTokenType() ? "Bearer " + getToken() : "JWT " + getToken()
        }
    }),
    getUser: (id: number | string | undefined) => http.get(`${getLng()}/api/consultants/${id}`),
    getSlider: () => http.get(`${getLng()}/api/slider/`),
    getTypes: () => http.get(`${getLng()}/api/types/`),
    getSubTypes: () => http.get(`${getLng()}/api/subtypes/`),
    getVotesUser: (id: number) => http.get(`api/votes/self/${id}`, {
        headers: {
            "Authorization": getTokenType() ? "Bearer " + getToken() : "JWT " + getToken()
        }
    }),
    editStatus: (id: number, data:any) => http.put(`${getLng()}/api/rooms/edit/${id}`, data, {
        headers: {
            "Authorization": getTokenType() ? "Bearer " + getToken() : "JWT " + getToken()
        }
    }),
    getArticles: (search: string, page: number, category?: number, subcategory?: number, types?: string, subType?: string) => http.get(`api/articles/?search=${search}&category=${category ? category : ''}&subcategory=${subcategory ? subcategory : ''}&page=${page}&types=${types ? types : ''}&subTypes=${subType ? subType : ''}`),
    getPopularArticles: (search: string, page: number, category?: number, subcategory?: number, types?: string, subType?: string) => http.get(`api/popular-articles/?search=${search}&category=${category ? category : ''}&subcategory=${subcategory ? subcategory : ''}&page=${page}&types=${types ? types : ''}&subTypes=${subType ? subType : ''}`),
    getNewArticles: (search: string, page: number, category?: number, subcategory?: number, types?: string, subType?: string) => http.get(`api/new-articles/?search=${search}&category=${category ? category : ''}&subcategory=${subcategory ? subcategory : ''}&page=${page}&types=${types ? types : ''}&subTypes=${subType ? subType : ''}`),
    getArticle: (id: number | string) => http.get(`api/articles/${id ? id : ''}`),
    putLike: (id: number, data: any) => http.post(`api/votes/create/${id}`, data, {
        headers: {
            "Authorization": getTokenType() ? "Bearer " + getToken() : "JWT " + getToken()
        }
    }),
    createArticle: (data: any) => http.post(`api/articles/create`, data, {
        headers: {
            "Authorization": getTokenType() ? "Bearer " + getToken() : "JWT " + getToken()
        }
    }),
    createReviews: (data: any, id: number) => http.post(`${getLng()}/api/reviews/create/${id}/`, data, {
        headers: {
            "Authorization": getTokenType() ? "Bearer " + getToken() : "JWT " + getToken()
        }
    }),
    setAnswer: (data: any) => http.post(`${getLng()}/api/comments/create`, data, {
        headers: {
            "Authorization": getTokenType() ? "Bearer " + getToken() : "JWT " + getToken()
        }
    }),
    getContact: () => http.get(`${getLng()}/api/contact-info/`),
    getContent: (str: string) => http.get(`${getLng()}/api/text?search=${str}`),
}