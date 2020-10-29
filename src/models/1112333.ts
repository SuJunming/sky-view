import { request, Api, message } from '@api'
export const 1112333 = {
  state: {
    data: [],
  },
  reducers: {
    setData(state: any, payload: any) {
      return { ...state, data: payload.data }
    },
  },
  effects: (dispatch: any) => ({
    test: async function (params: any) {
      const data = await request.post(Api.test, params)
      message.success('test')
      dispatch.1112333.setData(data)
    },
  }),
}
