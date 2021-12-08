import {UserDao, U_TDao} from './userDao'

function UserService() {

}

UserService.prototype = {
  constructor: UserService,
  getAllUsersByTid(tid) {
    const uidList = new U_TDao().getUidListByTid(tid)
    return new UserDao().queryUsersByUidList(uidList)
  },
  join(uid, tid) {
    const user = new UserDao().queryUserByUid(uid)
    if (user) {
      new U_TDao().join(uid, tid)
    }
  }
}
