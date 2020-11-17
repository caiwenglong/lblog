import {
  Loading
} from 'element-ui'

let cusLoading: any
export function eleLoading() {
  cusLoading = Loading.service({
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}
export function closeEleLoading() {
  cusLoading.close()
}
