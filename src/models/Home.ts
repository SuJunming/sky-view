import { request, Api, message } from '@api'
export const Home = {
  state: {
    data: [],
    templates: [],
  },
  reducers: {
    setData(state: any, payload: any) {
      return { ...state, data: payload.data }
    },
    setTemplates(state: any, payload: any) {
      return { ...state, templates: payload.data }
    },
  },
  effects: (dispatch: any) => ({
    getFiles: async function (params: any) {
      const data = await request.post(Api.getFiles, params)
      dispatch.Home.setData(data)
    },
    getTemplates: async function (params: any) {
      const data = await request.post(Api.getTemplates, params)
      dispatch.Home.setTemplates(data)
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
