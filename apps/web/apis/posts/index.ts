import { PostType } from "types"
import { axios } from 'utils'

const PREFIX_POST = '/post'

export const postApi = {
  getAll: async () => {
    const res = await axios.get(PREFIX_POST)
    return res?.data?.data
  },
  create: async (data: PostType.CreatePost) => {
    const res = await axios.post(PREFIX_POST, data)
    return res?.data?.data
  },
  getByID: async (id: string) => {
    const res = await axios.get(`${PREFIX_POST}/${id}`)
    return res?.data?.data
  },
  update: async (id: string, data: PostType.CreatePost) => {
    const res = await axios.put(`${PREFIX_POST}/${id}`, data)
    return res?.data?.data
  },
  deleteByID: async (id: string) => {
    const res = await axios.delete(`${PREFIX_POST}/${id}`)
    return res?.data?.data
  },
}