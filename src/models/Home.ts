import { request, Api, message } from '@api'
export const Home = {
  state: {
    data: [],
  },
  reducers: {
    setData(state: any, payload: any) {
      return { ...state, data: payload.data }
    },
  },
  effects: (dispatch: any) => ({
    getFiles: async function (params: any) {
      const data = await request.post(Api.getFiles, params)
      dispatch.Home.setData(data)
    },
    addComponent: async function (params: any) {
      await request.post(Api.addComponent, params)
      message.success('add success')
      dispatch.Home.getFiles()
    },
    delete: async function (params: any) {
      await request.post(Api.delete, params)
      message.success('delete success')
      dispatch.Home.getFiles()
    },
  }),
}
