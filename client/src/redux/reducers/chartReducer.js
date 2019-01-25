import { GET_DAILY, GET_WEEKLY, GET_MONTHLY, CHART_LOADING } from '../actions/types'

const initialState = {
  chartType: '',
  data: [],
  loading: false
}

export default (state = initialState, action) => {
  switch(action.type) {
    case CHART_LOADING:
      return {
        ...state,
        loading: true
      }
    case GET_DAILY:
      return {
        ...state,
        chartType: 'daily',
        data: action.payload,
        loading: false
      }
    case GET_WEEKLY:
      return {
        ...state,
        chartType: 'weekly',
        data: action.payload,
        loading: false
      }
    case GET_MONTHLY:
      return {
        ...state,
        chartType: 'monthly',
        data: action.payload,
        loading: false
      }
    default:
      return state
  }
}
