import { PostType } from "types"
import axios from "axios"

const api = axios.create({
  baseURL: 'http://localhost:8080'
})

const PREFIX_POST = '/post'

export const postApi = {
  getAll: async () => {
    const res = await api.get(PREFIX_POST)
    return res?.data?.data
  },
  create: async (data: PostType.CreatePost) => {
    const res = await api.post(PREFIX_POST, data)
    return res?.data?.data
  },
  getByID: async (id: string) => {
    const res = await api.get(`${PREFIX_POST}/${id}`)
    return res?.data?.data
  },
  update: async (id: string, data: PostType.CreatePost) => {
    const res = await api.put(`${PREFIX_POST}/${id}`, data)
    return res?.data?.data
  },
  deleteByID: async (id: string) => {
    const res = await api.delete(`${PREFIX_POST}/${id}`)
    return res?.data?.data
  },
}