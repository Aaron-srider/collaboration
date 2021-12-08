import {Pro, U_T, User} from "@/model/entity";
import {Table} from "@/model/entity";
import * as daoUtils from "@/model/utils";
import {getTable} from "@/model/utils";
import {parseDate, use} from "element-ui";
import user from "@/store/modules/user";
import {parseTimeComplex} from "@/utils";

function UserDao() {
}

UserDao.prototype = {
  constructor: UserDao,
  persist() {
    const user1 = new User(1, '文超', '1598374234', '2019012617', '111111')
    const user2 = new User(2, '吴明', '1598374234', '2019012618', '111111')
    const user3 = new User(3, '张三', '1598374234', '2019012619', '111111')
    const user4 = new User(4, '李四', '1598374234', '2019012620', '111111')
    const user5 = new User(5, '王五', '1598374234', '2019012621', '111111')
    daoUtils.persist('user', [user1, user2, user3, user4, user5])
  },
  queryUserByJobIdAndPassword(jobId, password) {

    const userTable = getTable('user')

    const user = userTable.find((item) => {
      return item.jobId == jobId && item.password == password
    })

    return user
  },
  queryUsersByUidList(uidList) {
    const userTable = getTable('user')
    const list = []
    for (const uid of uidList) {
      const row = userTable.getRowById(uid)
      if (row) {
        list.push()
      }
    }
    return list
  },
  queryUserByUid(uid) {
    const userTable = getTable('user')
    return userTable.getRowById(uid)
  }
}

function U_TDao() {

}

U_TDao.prototype = {
  constructor: U_TDao,
  persist() {
    const u_t1 = new U_T(1, 1, 1, '2021-02-01')
    const u_t2 = new U_T(2, 2, 1, '2021-02-01')
    const u_t3 = new U_T(3, 3, 1, '2021-02-01')
    const u_t4 = new U_T(4, 4, 1, '2021-02-01')
    const u_t5 = new U_T(5, 5, 1, '2021-02-01')
    daoUtils.persist('u_t', [u_t1, u_t2, u_t3, u_t4, u_t5])
  },
  deleteByTid(tid) {
    const u_tTable = new Table().getTable('u_t', U_T)
    u_tTable.deleteById(tid)
  },
  countMemberByTid(tid) {
    let count = 0
    const u_tTable = new Table().getTable('u_t', U_T)
    for (const item of u_tTable.getAllTableRows()) {
      if (item.tid == tid) {
        count++
      }
    }
    return count
  },
  countMembersByTidList(tidList) {
    let count = 0
    for (const tid of tidList) {
      count += this.countMemberByTid(tid)
    }
    return count
  },
  getUidListByTid(tid) {
    const u_tTable = new Table().getTable('u_t', U_T)
    const uidList = []
    for (const item of u_tTable.getAllTableRows()) {
      if (item.tid == tid) {
        uidList.push(item.uid)
      }
    }
    return uidList
  },
  join(tid, uid) {
    const u_tTable = new Table().getTable('u_t', U_T)
    const u_t = new U_T(undefined, uid, tid, parseTimeComplex(new Date()))
    u_tTable.insertOne(u_t)
  },
  deleteByTidAndUidList(tid, uidList) {
    const u_tTable = new Table().getTable('u_t', U_T)
    const idList = []
    for (const item of u_tTable.getAllTableRows()) {
      let flag = false
      for (const uid of uidList) {
        if (item.uid == uid) {
          flag = true
        }
      }
      if (item.tid == tid && flag) {
        idList.push(item.id)
      }
    }
    for (const id of idList) {
      u_tTable.deleteById(id)
    }
  }
}

function ProDao() {

}

ProDao.prototype = {
  constructor: ProDao,
  persist() {
    const pro1 = new Pro(1, '项目1', '2021-02-01', '2021-02-01', '项目1', 1)
    const pro2 = new Pro(2, '项目2', '2021-02-01', '2021-02-01', '项目2', 1)
    const pro3 = new Pro(3, '项目3', '2021-02-01', '2021-02-01', '项目3', 1)
    const pro4 = new Pro(4, '项目4', '2021-02-01', '2021-02-01', '项目4', 1)
    const pro5 = new Pro(5, '项目5', '2021-02-01', '2021-02-01', '项目5', 1)

    daoUtils.persist('pro', [pro1, pro2, pro3, pro4, pro5])
  },
  create(pro) {
    const proTable = new Table().getTable('pro', Pro)
    proTable.insertOne(pro)
  },
  deleteByPid(pid) {
    const proTable = new Table().getTable('pro', Pro)
    proTable.deleteById(pid)
  },
  getCreatedProsByUid(uid) {
    const proTable = new Table().getTable('pro', Pro)
    const pros = []
    for (const row in proTable.getAllTableRows()) {
      if (row.uid == uid) {
        pros.push(row)
      }
    }
    return pros
  },
  getOneProByPid(pid) {
    const proTable = new Table().getTable('pro', Pro)
    return proTable.getRowById(pid)
  }
}

export {
  UserDao,
  U_TDao
}
